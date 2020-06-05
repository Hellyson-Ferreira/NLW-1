const express = require("express")
const server = express()
//configure pasta publica
server.use(express.static("public"))

//Utilizando template engines
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', { express: server, noCache:true })



///rotas
server.get('/', (req, res) => {
    return res.render("index.html")
})
server.get('/create-point', (req, res) => {
    return res.render("create-point.html")
})
server.get('/search-results', (req, res) => {
    return res.render("search-results.html")
})


//ligar server
server.listen('3000')