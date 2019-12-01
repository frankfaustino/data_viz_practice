// import axios from 'axios'
import React, { useEffect } from 'react'
import './App.css'

import Charts from './Charts'

const { REACT_APP_SERVER } = process.env

function App() {
  function getHashParams() {
    const searchParams = new URLSearchParams(document.location.hash.substring(1))
    return {
      access_token: searchParams.get('access_token'),
      refresh_token: searchParams.get('refresh_token')
    }
  }

  useEffect(() => {
    console.log(getHashParams())
  }, [])

  return (
    <div className="App">
      <div className="App-header" />
      <div>
        <a href={`${REACT_APP_SERVER}/login`} className="button">
          Login
        </a>
      </div>
      <Charts />
    </div>
  )
}

export default App
