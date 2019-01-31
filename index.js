let PORT = process.env.PORT || 5000
let express = require('express')
let app = express()

let http = require('http')
let server = http.Server(app)

app.use(express.static('public'))

server.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})