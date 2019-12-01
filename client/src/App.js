// import axios from 'axios'
import React, { useEffect } from 'react'
import superagent from 'superagent'
import './App.css'

// const { REACT_APP_ID, REACT_APP_REDIRECT } = process.env
// const SCOPES = [
//   'playlist-read-private',
//   'playlist-modify-private',
//   'playlist-modify-public'
// ]
// const URL = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_ID}&response_type=token&scope=${SCOPES}&redirect_uri=${REACT_APP_REDIRECT}`

const App = () => {
  function getHashParams() {
    const searchParams = new URLSearchParams(document.location.hash.substring(1))
    return { access_token: searchParams.get('access_token'), refresh_token: searchParams.get('refresh_token') }
  }

  useEffect(() => {
    console.log(getHashParams())
    // let mounted = true

    // Get access_token from location
    // if (document.location.hash) {
    //   const searchParams = new URLSearchParams(document.location.hash.slice(1))

    //   if (searchParams.has('access_token')) {
    //     const instance = axios.create({
    //       baseURL: 'https://api.spotify.com/v1',
    //       headers: {
    //         Authorization: `Bearer ${searchParams.get('access_token')}`,
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     const getSavedTracks = async () => {
    //       try {
    //         const { data } = await instance.get('/me/tracks?limit=50&offset=0')
    //         if (mounted) {
    //           console.log('me', data)
    //         }
    //       } catch ({ message }) { console.log(message) }
    //     }
    //     const getMe = async () => {
    //       try {
    //         const { data } = await instance.get('/me/')
    //         if (mounted) {
    //           console.log('me', data)
    //         }
    //       } catch ({ message }) { console.log(message) }
    //     }
    //     const getPlaylists = async () => {
    //       try {
    //         const { data } = await instance.get('/me/playlists?limit=50&offset=0')
    //         if (mounted) {
    //           console.log('playlists', data)
    //           // data.items.forEach(({ name }) => console.log(name))
    //         }
    //       } catch ({ message }) { console.log(message) }
    //     }
    //     const getTracks = async () => {
    //       try {
    //         const { data } = await instance.get('https://api.spotify.com/v1/playlists/5FAHH8sJOuv7LvqoYlDUiS/tracks')
    //         if (mounted) {
    //           console.log('tracks', data)
    //         }
    //       } catch ({ message }) { console.log(message) }
    //     }
    //     getSavedTracks()
    //     // getMe()
    //     getPlaylists()
    //     getTracks()
    //   }
    // }
    // return () => (mounted = false)
  }, [])

  return (
    <div className="App">
      <div className="App-header" />
      <div>
        <a href="http://localhost:8888/login" className="button">
          Login
        </a>
        <a onClick={() => superagent.get('http://localhost:8888/cookie').then(r => console.log(r))} className="button">
          Set Cookie
        </a>
      </div>
    </div>
  )
}

export default App
