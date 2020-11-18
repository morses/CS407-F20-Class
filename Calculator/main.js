const antlr4 = require('antlr4/index');
const CalculatorLexer = require('./CalculatorLexer');
const CalculatorParser = require('./CalculatorParser');
const OurVisitor = require('./OurVisitor').OurVisitor;
//const OurErrorListener = require('./OurErrorListener').OurErrorListener;

// Node.js application that prompts the user for input then processes it with an antlr4 visitor
// Remember to generate lexer, parser etc. with
//
// antlr4 Calculator.g4 -visitor -Dlanguage=JavaScript

// Surprisingly difficult to write a simple interactive command line program in Javascript
// (because it doesn't have blocking I/O)

// console prompt code from: https://stackoverflow.com/questions/8128578/reading-value-from-console-interactively
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let prompt = function(ques) {
    return new Promise( (res, rej) => {
        rl.question( ques, answer => {
            res(answer);
        })
    });
};

// main function
async function main() {
    let input;
    while ( input != 'quit' ) {
        // prompt user for input
        input = await prompt('>>> ');

        if(input === 'quit')
            continue;
 
        let chars = new antlr4.InputStream(input);
        let lexer = new CalculatorLexer.CalculatorLexer(chars);
        let tokens  = new antlr4.CommonTokenStream(lexer);
        let parser = new CalculatorParser.CalculatorParser(tokens);  
        parser.buildParseTrees = true;   
        let tree = parser.expression();   
        let visitor = new OurVisitor();
        let output = visitor.visit(tree);       // base class has this generic function (like visitChildren)
                                                // it will look up ctx type and call the correct function
 
        console.log("\t" + output);
    }
    console.log( 'Bye!');
    rl.close();
}

main();