const antlr4 = require('antlr4/index');
const CymbolLexer = require('./CymbolLexer').CymbolLexer;
const CymbolParser = require('./CymbolParser').CymbolParser;
const OurListener = require('./OurListener').OurListener;

let fs = require('fs');

// Remember to install (uses antlr4 4.8.0, does not work with the just released 4.9.0)
//    npm install

// Run like this:
//    node main.js input.cymbol out.dot

// Then visualize the graph with Graphviz
//   - in the VS Code plug-in: Graphviz (dot) language support for Visual Studio Code
//   - or if you have Graphviz installed on your system via
//      dot -Tpdf prog1.dot -o prog1.pdf

let chars = antlr4.CharStreams.fromPathSync(process.argv[2],{ encoding: 'utf8' });
let lexer = new CymbolLexer(chars);
let tokens  = new antlr4.CommonTokenStream(lexer);
let parser = new CymbolParser(tokens);
parser.buildParseTrees = true;
let tree = parser.file();

// A listener is a simple choice for this problem
let listener = new OurListener();
antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener,tree);
// Store the output in the listener and get it after we walk the tree
let output = listener.getDotCode();

// Write to file
let outputFile = process.argv[3];
fs.writeFile(outputFile,output, (err) => {
    if(err) throw err;
    console.log('Output written to file.');
});
