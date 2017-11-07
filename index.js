var prompt = require('prompt');
var figlet = require('figlet');
var clear = require('clear');
var sleep = require('system-sleep');
var Hangman = require('./lib/hangman-game.js');            


DisplayOpeningTitle();
var hangman = new Hangman(10);


var schema = {
    properties: {
        letter: {
            description: 'Enter a Letter: ',
            pattern: /^[a-zA-Z]+$/,
            message: 'You can guess only letters!',
            required: true,
        }
    }
}


function DisplayOpeningTitle() {
    clear();
    figlet('NODE HANGMAN!', function(err, data) {
        if(err) {
            console.log("NODE Hangman!")
            return;
        }
        console.log(data);
    })
    sleep(5000);    
}

/*
var count = 0;

function recur() {
    if (count < 5) {
        prompt.start();
        prompt.get(schema, (err, result) => {
            console.log(result.letter);
            count++;
            recur();
        });
    }
}

recur();*/