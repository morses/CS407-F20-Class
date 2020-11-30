const CymbolListener = require('./CymbolListener').CymbolListener;

class OurListener extends CymbolListener {

    constructor(){
        super();
        // store all function names in a list (same purpose as a "symbol table")
        this.nodes = [];
        // adjacency list "graph" to store edges (function calls)
        // will look like this: {"main":["fact","a"],"fact":["fact","print"],...}
        this.graph = {};
        this.currentFunctionName = null;
    }

    // DOT language: https://graphviz.org/doc/info/lang.html
    getDotCode(){
        let nodeListString = this.nodes.map(n => '\t' + n + ';\n').join('');
        // or without 2 separate calls, use the other functional programming staple: reduce
        let nodestyle = '[style=filled,fillcolor="#01665e",fontcolor=white]';
        let nodeListString2 = this.nodes.reduce((acc,curr) => acc + '\t' + curr + ` ${nodestyle};\n`,'');

        let edgeList = [];
        for(const nodeLeft in this.graph)
        {
            for(const nodeRight of this.graph[nodeLeft] )
            {
                edgeList.push(`\t${nodeLeft} -> ${nodeRight};\n`);
            }
        }
        let edgeListString = edgeList.join('');
        
        return `digraph G {
\tranksep=0.25;
\tedge [arrowsize=0.5]
\tnode [shape=circle, fontname="Arial",
\t\tfontsize=12, fixedsize=true, height=0.45];
\t// List of nodes
${nodeListString2}
\t// List of edges
${edgeListString}
}`;
    }

    enterFunctionDecl(ctx){
        this.currentFunctionName = ctx.ID().getText();
        this.nodes.push(this.currentFunctionName);
        //console.log('Entering function declaration: ' + this.currentFunctionName);
    }

    exitCall(ctx){
        const calledFunctionName = ctx.ID().getText();
        if(this.currentFunctionName in this.graph)
            this.graph[this.currentFunctionName].push(calledFunctionName);
        else
            this.graph[this.currentFunctionName] = [calledFunctionName];
        //console.log('Exiting called function: ' + calledFunctionName);
    }
}

exports.OurListener = OurListener;