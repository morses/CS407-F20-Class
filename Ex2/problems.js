/* Here's where to solve the problem.  Write your code in the appropriate function below. 
   Return true to indicate success, false otherwise. Print out indicated output or add to
   the DOM with jQuery as shown where needed.
*/

// Our predicates
const matchSingleChar = char => charIn => char === charIn;
const matchUndefined  = char => typeof char == 'undefined';
const matchAnything   = _ => true;

// Our functions
const nop = function(){}

function accumulateOneSection(charIn,context)
{
    context.acc.push(charIn);
}

function clearAccumulator(charIn,context)
{
    context.output.push(context.acc.join(""));
    context.acc = [];
}

function p1(input)
{
    const spl = input[0];

    const context = {
        output: [],
        acc: []
    };

    // Create our FSM object
    const fsm = new FSM(3,context);

    // Add rules to the state machine (in the order we want the predicates to be checked)
    fsm.addRule(0,matchSingleChar(spl),clearAccumulator,1);
    fsm.addRule(0,matchUndefined,clearAccumulator,2);
    fsm.addRule(0,matchAnything,accumulateOneSection,0);
    fsm.addRule(1,matchSingleChar(spl),clearAccumulator,0);
    fsm.addRule(1,matchUndefined,clearAccumulator,2);
    fsm.addRule(1,matchAnything,accumulateOneSection,1);
    fsm.addRule(2,matchUndefined,nop,2);
    fsm.addRule(2,matchAnything,nop,2);

    // Run the state machine on the input
    // (run it one past the end of the string to get undefined as the last char read)
    for(let i = 1; i <= input.length; i++)
    {
        fsm.advance(input[i]);
        console.log("fsm state = " + fsm.state);
    }

    alert(context.output);
    return false;
}





















function p2(input)
{
    // Example of how to output the results. Wrap alternating lines in 
    //    <p class="color1">Line 1 text goes here</p>
    //    <p class="color2">Line 2 text goes here</p>
    let output = `<p class="color1">1  Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
<p class="color2">2  Asperiores, esse ab veritatis perferendis, exercitationem nisi quia</p>
<p class="color1">3  non illo dignissimos suscipit fugiat consequatur atque saepe alias facere!</p>
<p class="color2">4  Nihil dolores consequuntur in.</p>`;
    // Use jQuery to empty the previous output, if any, and append the new output
    $('#p2-output p.output').empty().append($(output));
    return false;
}

function p3(input)
{
    return false;
}

function p4(input)
{
    return false;
}

function p5(input)
{
    return false;
}

// Useful utility for comparing arrays (deep comparison)
// From top answer in: https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) 
{
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) 
    {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) 
        {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) 
        { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});