
function Animal(numAp,nam)
{
    this.numberOfAppendages = numAp;
    this.name = nam;
}

Animal.prototype.eat = function(){
    console.log("I'm eating");
}


let myAnimal = new Animal(4,"Dog");
let yourAnimal = new Animal(6,"Starfy");

// ES 6 ECMASCript 2015

class Animal {
    //numberOfAppendages;
    name = "Bob";

    constructor(numAp,nam)
    {
        this.numberOfAppendages = numAp;
        this.name = nam;
    }

    eat(){
        console.log("I'm eating");
    }
}


function name(a)
{
    return 2*a;
}

const name = function(a){return 2*a;}

const name = a => 2*a;
const other = (a,b) => a*b;

const twoup = a => b => 2*b;