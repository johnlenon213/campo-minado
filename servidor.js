var express = require('express');
var mustache = require('mustache-express');
var app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/campo');

app.get('/', function(req, res) {
    res.render( __dirname + '/html/index.html');
});


var bom = "*";

//variaveis globais

var table = [
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
 colocarBombas();


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
    res.write('<link rel="stylesheet" type="text/css" href="css/bomb.css">')
    res.write('<body>');
    res.write('<table>');
 

 

//reset table
var i = req.query.i;
 
var j = req.query.j;

var reset= req.query.reset;

  limpa(1);

    function limpa(valor){
      if (reset == 1){
        primeira= true;
        estaVivo = true;
        // shuffle[table, array];

        for (var i = 0; i < table2.length; i++) {
        for (var j = 0; j <table2[i].length; j++) {
          table2[i][j] = 0;
      }
      colocarBombas();
    }
  }
}
//para abrir os zero

function abrir(i, j) {
	i = parseInt(i)
	j = parseInt(j)
	console.log(`abrindo celula ${i}, ${j}`)
	if (i < 0 || j < 0 || i >= table.length || j >= table[0].length) {
		return;
	}
	if (table2[i][j] == 1) {
		return;
	}
	table2[i][j] = 1
	if (table[i][j] == 0) {
		abrir(i - 1, j)
		abrir(i + 1, j)
		abrir(i, j + 1)
		abrir(i, j - 1)
		
		abrir(i - 1, j + 1)
		abrir(i + 1, j + 1)
		abrir(i - 1, j - 1)
		abrir(i + 1, j - 1)
	}
}

function soma (table){
	var soma= 0;
	for (var i = 0; i < table.length; i++) {
        for (var j = 0; j <table[i].length; j++) {
        	soma = soma + table[i][j];
 }
}
return soma;
}

    if (i >= 0 && j >= 0 && i < table2.length && j < table2[0].length && estaVivo){
    console.log(`vc clicou na celula ${i},${j}`)
        abrir(i, j)

        if(table[i][j] == '*'){
        console.log(`voce perdeu`);
        estaVivo = false;
    res.write('<div id="gameover">')
    res.write('<h1>GAME OVER!</h1>')
    res.write('</div>')
    	}
    
         else if (soma(table) == 71 && table2 != 'BB' && estaVivo){
           estaVivo = true;
         	    res.write('<div id="gameover">')
                res.write('<h1>YOU WIN!</h1>')
                res.write('</div>')
         }
    //se !estaVivo escreva uma div "game over" (div 'GAME OVER')    
}

    //tabela do campo
    res.write('<div id="cm">')
    res.write('<table>');
 

    // impressao da tabela
    for (var i = 0; i < table.length; i++) {
      res.write('<tr>');
     
        for (var j = 0; j <table[i].length; j++) {

        if (table2[i][j] == 0) {
          // celula vazia com link
      // incrementa(i, j);
         res.write(`<td id="td1"><a href="/JOGAR?i=${i}&j=${j}">click</a></td>`);
        }
         // celula com valor
        else  {
        	var oi = table[i][j];
        	if (oi == 0) {
        		oi = '';
        	} else if (oi == '*') {
        		oi = 'BB'/*res.write(`<img src ="css/img/bomba.png"></img>`);*/
        	}
        res.write(`<td id="td2">${oi} </td>`);
        }
      }
        res.write('</tr>');
      }


    res.write('</table>');
    res.write('</div>')


   //botoes para voltar a pag inicial e reset
    res.write('<div id="botoes">')
    res.write('<nav>')
    res.write('<br>')
    res.write('<li><a href="JOGAR?reset=1" classe="RESET">RESET</a></li>')
    res.write('<li><a href="/" classe="VOLTAR">VOLTAR</a></li>')
    res.write('</nav>')
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


function contarBombas() {
  var bombas = 0;
  for (i = 0; i < table2.length; i++ ) {
    for (j = 0; j < table[i].length; j++) {
      if (table[i][j] == bom) {
        bombas++
      }
    }
  }
  return bombas;
}


function colocarBombas() {
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      table[i][j] = 0;
    }
  }
  while (contarBombas() < 10) {
    var i = Math.floor(Math.random() * 9 * .99)
    var j = Math.floor(Math.random() * 9 * .99)
    console.log(i, j)
    if (table[i][j] != bom) { // nao era bomba
      table[i][j] = bom;
      incrementa(i - 1, j - 1)
      incrementa(i - 1, j)
      incrementa(i - 1, j + 1)
      incrementa(i, j + 1)
      incrementa(i, j - 1)
      incrementa(i + 1, j - 1)
      incrementa(i + 1, j)
      incrementa(i + 1, j + 1)
    }
  }
  console.table(table)
}


function incrementa(i, j) {
  if (i < 0 || i > 8 || j < 0 || j > 8) {
    return
  }
  if (table[i][j] != bom) {
    table[i][j]++;
  }
}
