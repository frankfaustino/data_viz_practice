const querystring = require('querystring')
const request = require('request-promise-native')

const { generateRandomString } = require('../lib/utils')
const {
  client,
  client_id,
  client_secret,
  redirect_uri
} = require('../lib/config')

const stateKey = 'spotify_auth_state'

const login = (_, res) => {
  const state = generateRandomString(16)
  const options = {
    secure: false,
    httpOnly: false,
    domain: 'localhost',
    path: '/'
  }

  // web app requests authorization
  const scope = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public'
  ]

  res.cookie(stateKey, state, options).redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        scope: scope.join(' '),
        redirect_uri,
        state
      })
  )
}

const callback = ({ headers, query: { code, state } }, res) => {
  // web app requests refresh and access tokens
  // after checking the state parameter
  const regex = /([^&;=]+)=?([^&;]*)/
  const storedState = headers['cookie']
    ? regex.exec(headers['cookie'])[2]
    : null

  if (state && state === storedState) {
    // res.clearCookie(stateKey)
    const authOptions = {
      form: {
        code,
        grant_type: 'authorization_code',
        redirect_uri
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${client_id}:${client_secret}`).toString('base64')
      },
      json: true,
      url: 'https://accounts.spotify.com/api/token'
    }

    request
      .post(authOptions)
      .then(({ access_token, refresh_token }) => {
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true
        }

        // use the access token to access the Spotify Web API
        // request.get(options, (error, response, body) => console.log(body))

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${client}/#${querystring.stringify({
            access_token,
            refresh_token
          })}`
        )
      })
      .catch(_ =>
        res.redirect(
          `${client}/#${querystring.stringify({ error: 'invalid_token' })}`
        )
      )
  } else {
    res.redirect(
      `${client}/#${querystring.stringify({ error: 'state_mismatch' })}`
    )
  }
}

const refreshToken = ({ query: { refresh_token } }, res) => {
  // requesting access token from refresh token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request
    .post(authOptions)
    .then(({ access_token }) => res.send({ access_token }))
    .catch(({ message }) => console.error(message))
}

module.exports = {
  login,
  callback,
  refreshToken
}
