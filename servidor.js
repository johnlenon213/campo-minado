var express = require('express');
var mustache = require('mustache-express');
var app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/campo');

app.get('/', function(req, res) {
    res.render( __dirname + '/html/index.html');
});

app.get('/JOGAR', function(req, res) {
    res.render( __dirname + '/html/JOGAR.html');
});

app.get('/ajuda', function(req, res) {
    res.render( __dirname + '/html/AJUDA.html');
});

app.get('/sobre', function(req, res) {
    res.render( __dirname + '/html/SOBRE.html');
});

app.get('/COMOJOGAR', function(req, res) {
    res.render( __dirname + '/html/COMO JOGAR.html');
});

app.use('/css',express.static(__dirname + '/css'));









var port = 3000;
app.listen(port, function() {
    console.log(`Escutando na porta ${port}...`);
})