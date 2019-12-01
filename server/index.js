require('dotenv').config()
const cors = require('cors')
const express = require('express')

const { port } = require('./lib/config')

const app = express()

app
  .use(cors())
  .use(express.json())
  .use('/', require('./api/routes'))

app.listen(port, () => console.log(`Server is listening on port ${port}`))
