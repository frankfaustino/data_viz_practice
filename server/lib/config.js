// const mysql = require('mysql')

const {
  client,
  client_id,
  client_secret,
  db_host,
  db_user,
  db_database,
  db_pw,
  redirect_uri,
  port
} = process.env

// database connection for prod

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
// }

// let connection = mysql.createConnection(config)

// db connection for dev
// const connection = mysql.createConnection({
//   host: db_host || 'localhost',
//   user: db_user || 'me',
//   database: db_database || 'data',
//   password: db_pw || 'shhhhhhhhhhhh!'
// })

// connection.connect(err =>
//   err
//     ? console.error('Error connecting: ' + err.stack)
//     : console.log('Connected as thread id: ' + connection.threadId)
// )

module.exports = {
  client,
  client_id,
  client_secret,
  // connection,
  port: port || 8888,
  redirect_uri
}