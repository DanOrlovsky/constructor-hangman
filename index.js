var figlet = require('figlet');
var clear = require('clear');
var sleep = require('system-sleep');
var inquirer = require('inquirer');
var Hangman = require('./lib/hangman-game.js');




DisplayOpeningTitle();
PromptGameStart();

function PromptGameStart() {
    var question = [{
        type: "list",
        name: "startOrQuit",
        message: "Difficulty Select: ",
        choices: [
            'Easy',
            'Medium',
            'Hard',
            'Pansie (Quit)'
        ],
    }];

    inquirer.prompt(question).then(data => {
        switch (data.startOrQuit) {
            case 'Easy':
                console.log("Easy mode activated");
                var hangman = new Hangman(15);
                hangman.initializeGame();
                break;
            case 'Medium':
                console.log("Medium mode activated");
                var hangman = new Hangman(10);
                hangman.initializeGame();
                break;
            case 'Hard':
                console.log("Hard mode activated");
                var hangman = new Hangman(5);
                hangman.initializeGame();
                break;
            default:
                console.log("QUITTER!!");
                process.exit();
                break;
        }
    });
}

function DisplayOpeningTitle() {
    clear();
    figlet('NODE HANGMAN!', function (err, data) {
        if (err) {
            // If figlet fails, just display the text.
            console.log("NODE Hangman!")
        } else {
            // Display the figlet.
            console.log(data);
        }
    });
    sleep(10);
}