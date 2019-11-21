var express = require('express');
var mustache = require('mustache-express');
var app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/campo');

app.get('/', function(req, res) {
    res.render( __dirname + '/html/index.html');
});


//variaveis globais
var table = [
   [0, 0, 1, '*', 1, 0, 0, 0, 0],
   [1, 1, 1, 1, 1, 0, 0, 0, 0],
   ['*', 2, 0, 0, 0, 0, 0, 0, 0],
   ['*', 2, 0, 0, 0, 1, 1, 1, 0],
   [1, 1, 0, 0, 0, 1, '*', 1, 0],
   [1, 1, 1, 0, 1, 2, 2, 1, 0],
   [2, '*', 3, 1, 0, 1, '*', 1, 0],
   [1, '*', 3, '*', 2, 2, 3, 2, 1],
   [1, 1, 2, 1, 1, 1, '*', '*', 1]
 ];


var table2 = [
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0],
   [0, 0, 0, 0, 0, 0, 0, 0, 0]
 ];


var array= [];

var primeira = true;

var estaVivo = true;


//jogo
app.get('/JOGAR', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

//começo da pagina
    res.write('<html>');
    res.write('<head>');
    res.write('<body style= "background-color: black" >');
    res.write('<table>');
 
//funçao para ficar aleatorio ao clicar no botão reset
  function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
    if (primeira) {
      table = shuffle(table);
      primeira = false;
    } 


//reset table
var i = req.query.i;
    
var j = req.query.j;

var reset= req.query.reset;

  limpa(1); 

    function limpa(valor){
      if (reset == 1){
        primeira= true;
        shuffle[table, array];

        for (var i = 0; i < table2.length; i++) {
        for (var j = 0; j <table2[i].length; j++) {
          table2[i][j] = 0;
      }
    }
  }
    // randomizar as bombas
}
    if (i >= 0 && j >= 0 && i < table2.length && j < table2[0].length){
    console.log(`vc clicou na celula ${i},${j}`)
        table2[i][j]= 1;

        if(table[i][j] == '*'){
        console.log(`voce perdeu`);
        estaVivo = false;

    //se !estaVivo escreva uma div "game over" (div 'GAME OVER')       
    res.write('<div>')
    res.write('<h1 style="text-align:center; color:white; font-family:Monospace; font-size: 100px; ">GAME OVER!</h1>')
    res.write('</div>')
    }
}

    //tabela do campo
    res.write('<div>')
    res.write('<table style="margin:auto;">');
   

    // impressao da tabela
var cor = true;

    for (var i = 0; i < table.length; i++) {
      res.write('<tr>');
        
        for (var j = 0; j <table[i].length; j++) {
        if (table2[i][j] == 0 && cor == true) {
          // celula vazia com link 
         res.write(`<td style="width:  70px; height: 70px; border: 1px solid black; background-color:gray;   text-decoration: none; color:gray;"><a style="text-decoration:none; font-size:30px; color:gray;" href="/JOGAR?i=${i}&j=${j}">click</a></td>`);
        }
         // celula com valor
        else  {
        res.write(`<td style="width:  70px; height: 70px; border: 1px solid black; background-color:#D6DBDF; font-family:Monospace; font-size: 25px; text-align:center; text-decoration: none; ">${table[i][j]} </td>`);
        }
      }
        res.write('</tr>');
      }


    res.write('</table>');
    res.write('</div>')


    //botoes para voltar a pag inicial e reset
    res.write('<div>')
    res.write('<br>')
    res.write('<br>')
    res.write('<a style="margin-left:49%;" href="JOGAR?reset=1"><button classe="RESET">RESET</button></a>')
    res.write('<br>')
    res.write('<br>')
    res.write('<br>')
    res.write('<a style="margin-left:49%;" href="/"><button classe="VOLTAR">VOLTAR</button></a>')
    res.write('</div>')
    res.write('</body>');
    res.write('</head>');
    res.write('</html>');
    res.end();
});

app.get('/ajuda', function(req, res) {
    res.render( __dirname + '/html/AJUDA.html');
});

app.get('/sobre', function(req, res) {
    res.render( __dirname + '/html/SOBRE.html');
});

app.get('/COMOJOGAR', function(req, res) {
    res.render( __dirname + '/html/COMOJOGAR.html');
});

app.use('/css',express.static(__dirname + '/css'));




var port = 3001;
app.listen(port, function() {
    console.log(`Escutando na porta ${port}...`);
})
