var wordList = require('../lib/word-list');
var prompt = require('prompt');


var spaceChar = "space-char";

var getLetterFromUser = {
    properties: {
        letter: {
            description: 'Enter a Letter: ',
            pattern: /^[a-zA-Z]+$/,
            message: 'You can guess only letters!',
            required: true,
        }
    }
};
var playAgain = {
    properties: {
        yesOrNo: {
            description: 'Would you like to play again? Y/n',
            pattern: /^[Yn]+$/,
            message: 'Please select Y/n',
            required: true,
        }
    }
};

function HangmanGame(maxTries) {
    this.maxTries = maxTries;
    this.totalWins = 0;
    //this.canRun = false;
    //this.guessedLetters = [];


    this.initializeGame = () => {
        this.turns = 0;
        this.lastWordIdx = -1;
        this.wordToGuess = wordList.GetRandomWord();
        this.guessingWord = [];
        this.guessedLetters = [];
        for (var i = 0; i < this.wordToGuess.length; i++) {
            this.guessingWord.push(this.wordToGuess[i] === " " ? spaceChar : "_");
        }
        //console.log(this.guessingWord);
        this.updateDisplay();
        this.getLetter();
    };

    this.updateDisplay = () => {
        console.log("-----------------------------------------");
        console.log("Total Wins: " + this.totalWins);
        console.log("Turns Left: " + (this.maxTries - this.turns));
        var wordDisplay = "";

        for (var i = 0; i < this.guessingWord.length; i++) {
            wordDisplay += this.guessingWord[i] == spaceChar ? "  " : this.guessingWord[i] + " ";
        }
        console.log("Word to guess: " + wordDisplay);
    };
    this.alreadyGuessed = (letter) => {
        for (var i = 0; i < this.guessedLetters.length; i++) {
            if (letter === this.guessedLetters[i]) {
                return true;
            }
        }
        this.guessedLetters.push(letter);
        return false;
    };
    this.checkGuess = (letter) => {
        var idxs = [];
        for (var i = 0; i < this.wordToGuess.length; i++) {
            if (letter == this.wordToGuess[i].toUpperCase()) {
                idxs.push(i);
            }
        }
        for (var j = 0; j < idxs.length; j++) {
            this.guessingWord[idxs[j]] = letter;
        }
    }
    this.checkWin = () => {
        return (this.guessingWord.indexOf("_") == -1);
    }
    this.getLetter = () => {
        var hasWon = this.checkWin();
        if (hasWon) {
            console.log("Congratulations!  You win!");
            this.totalWins++;
            prompt.start();
            prompt.get(playAgain, (err, result) => {
                if (result.yesOrNo == 'Y') {
                    this.initializeGame(this.maxTries);
                } else {
                    process.exit();
                };
            });
        } else {
            if (this.turns < this.maxTries) {
                prompt.start();
                prompt.get(getLetterFromUser, (err, result) => {
                    if (err) {
                        console.log('Error happened');
                        this.getLetter();
                    }
                    var idxPos = [];
                    var letter = result.letter[0].toUpperCase();
                    var alreadyGuessed = this.alreadyGuessed(letter);
                    if (alreadyGuessed) {
                        console.log("You've already guessed that letter!");
                    } else {
                        this.checkGuess(letter);
                        this.turns++;
                    };

                    this.updateDisplay();
                    this.getLetter();
                });
            };
        };
    };
};

module.exports = HangmanGame;