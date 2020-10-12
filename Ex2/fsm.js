/* Finite State Machine 

    This machine is specialized so that when it fails to find a match for a state transition
    it will transition to the start state, which is assumed to be 0.  Also, state transition
    rules are tested in the order they are added.  See example string split code.

    This form of class definition was introduced in ECMAScript 2015, i.e version ES6.  Previous
    versions use constructor functions and add methods via prototype functions.  Public and
    private fields are not yet standardized so we don't use them here.
*/
class FSM {
    constructor(numStates, context){
        // current state the FSM is in, 0 is the start state
        this.state = 0;
        // context object for the problem being solved
        this.context = context;
        // state transition table
        this.stt = [];
        // fill it with the correct number of (empty) rows
        for(let i = 0; i < numStates; i++){
            this.stt.push([]);
        }
    }

    // add an entry into the state transition table; the order in which you add these rules matters
    addRule(inState,predicate,transitionFn,outState) {
        const entry = {predicate:predicate,      // fn(char) => true for char as transition character, false otherwise
                    transitionFn:transitionFn,   // fn(char,ctx) => undefined, this is where you can do your work for this transition
                    outState:outState};          // what state to transition to
        this.stt[inState].push(entry);
    }

    // advance this FSM one character
    advance(char) {
        let foundRule = false;
        // search along a row for the right table entry to use, i.e. transition to take
        for(let entry of this.stt[this.state])
        {
            if(entry.predicate(char))
            {
                // follow the first one to match (this determines precedence of predicates)
                entry.transitionFn(char,this.context);
                this.state = entry.outState;
                foundRule = true;
                break;
            }
        }
        if(!foundRule)
        {
            // execute default rule to fail to start state and do nothing else
            this.state = 0
        }
    }
}
