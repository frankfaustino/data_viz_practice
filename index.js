require('dotenv').config()
const axios = require ('axios')
const app = require('express')()

const { AUTH_TOKEN, PORT } = process.env

axios.defaults.baseURL = 'https://api.spotify.com'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

app.get('/top_tracks', async (_, res) => {
  const { data, status } = await axios.get('/v1/me/top/tracks?limit=50&offset=0&time_range=short_term')
  const topTracks = {}

  if (status && status === 200) {
    if (data && Array.isArray(data.items)) {
      data.items.forEach(({ artists, name }) => {
        const artist = artists.reduce((acc, { name }) => acc += name, '')
        topTracks[artist]
          ? topTracks[artist].add(name)
          : topTracks[artist] = new Set([name])
      })
    }
    res.send(topTracks)
    console.log(topTracks)
  }
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
