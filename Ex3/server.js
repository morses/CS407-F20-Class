/*
    This example uses Express.js.  To install all dependencies (do this only once):
        npm install
    Then run with:
        npm run start
    Or if you want to have it automatically sense changes and restart, run with
        npm run watch
    which uses nodemon to restart the server.  These scripts are in package.json.

    Or just use F5 from VS Code to debug.
*/
// packages required for basic Express web server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// packages for our solution
const antlr4 = require('antlr4/index');

const HttpLexer = require('./HttpLexer');
const HttpParser = require('./HttpParser');
const HttpColorizerVisitor = require('./HttpColorizerVisitor').HttpColorizerVisitor;
const HttpColorizerListener = require('./HttpColorizerListener').HttpColorizerListener;
//const HttpErrorListener = require('./HttpErrorListener').HttpErrorListener;


// Set the port to listen on, either through the command line or default to 5000
const port = process.env.PORT || 5000;

const app = express();

// Configure the app
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));

// Add routes
// GET /
app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

// GET localhost:5000/p1
app.get('/p1', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// POST localhost:5000/problem1
app.post('/problem1', function(req, res) {
    // look for a parameter in form body with name "input"
    let input = req.body.input;
    let method = req.body.treeMethod;   // listener or visitor

    let chars = new antlr4.InputStream(input);
    let lexer = new HttpLexer.HttpLexer(chars);
    let tokens = new antlr4.CommonTokenStream(lexer);
    let parser = new HttpParser.HttpParser(tokens);
    parser.buildParseTrees = true;
    let tree = parser.message();  // start rule is message

    if( method == 'visitor' )
    {
      let colorizer = new HttpColorizerVisitor();
      // the tree is the first context
      let output = colorizer.visitMessage(tree);
      res.write(output);
      //res.write('Visitor not implemented yet');
    }
    else if( method == 'listener' )
    {
      let colorizer = new HttpColorizerListener(res);
      antlr4.tree.ParseTreeWalker.DEFAULT.walk(colorizer,tree);
    }
    else
    {
      res.write("No tree traversal method requested.");
    }

    res.end();
});

// Start it up
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
