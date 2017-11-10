// Includes our word-list library.
var wordList = require('../lib/word-list');
// Requires the npm prompt package
var prompt = require('prompt');

// Special character to represent spaces
var spaceChar = "space-char";

// Prompt to get a letter from the user
var getLetterFromUser = {
    properties: {
        letter: {
            description: 'Enter a Letter: ',
            // Allows only capital and lowercase letters
            pattern: /^[a-zA-Z]+$/,
            message: 'You can guess only letters!',
            required: true,
        }
    }
};

// Prompt to ask the user if they would like to play again.
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


// Hangman game constructor
function HangmanGame(maxTries) {
    // maxTries the user has tpo win
    this.maxTries = maxTries;
    // Total number of wins
    this.totalWins = 0;

    // This function resets all game values
    this.initializeGame = () => {
        this.turns = 0; 
        this.wordToGuess = wordList.getRandomWord();    // Calls the getRandomWord() function
        this.guessingWord = [];         // This array displays '_' or the letter if it has been guessed
        this.guessedLetters = [];       // This array holds all of the letters we've guessed at this point
        //  Builds our guessing word out with "_" or our space char
        for (var i = 0; i < this.wordToGuess.length; i++) {
            this.guessingWord.push(this.wordToGuess[i] === " " ? spaceChar : "_");
        }
        // Updates the display
        this.updateDisplay();
        // Calls our getLetter recursive function
        this.getLetter();
    };
    // Updates our display
    this.updateDisplay = () => {
        console.log("-----------------------------------------");
        console.log("Total Wins: " + this.totalWins);
        console.log("Turns Left: " + (this.maxTries - this.turns));
        var wordDisplay = "";

        for (var i = 0; i < this.guessingWord.length; i++) {
            wordDisplay += this.guessingWord[i] == spaceChar ? "  " : this.guessingWord[i] + " ";
        }
        wordDisplay += "\n";
        console.log("Word to guess: " + wordDisplay);
    };
    // Checks if a letter is already guessed or not.
    this.alreadyGuessed = (letter) => {
        for (var i = 0; i < this.guessedLetters.length; i++) {
            if (letter === this.guessedLetters[i]) {
                return true;
            }
        }
        this.guessedLetters.push(letter);
        return false;
    };
    // Checks if the guess matches a letter in the word.
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
    // Checks if any "_"'s are still in the guessingWord.  If not you win!
    this.checkWin = () => {
        return (this.guessingWord.indexOf("_") == -1);
    }
    this.promptToPlay = () => {
        prompt.start();
        prompt.get(playAgain, (err, result) => {
            if (result.yesOrNo == 'Y') {
                this.initializeGame(this.maxTries);
            } else {
                process.exit();
            };
        });
    }
    this.getLetter = () => {
        // Checks if we've won
        var hasWon = this.checkWin();
        if (hasWon) {
            console.log("Congratulations!  You win!");
            this.totalWins++;
            this.promptToPlay();
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
            } else {
                console.log("We're sorry, you're out of tries.")
                console.log("The word was: " + this.wordToGuess);
                this.promptToPlay();
            };
        };
    };
};

module.exports = HangmanGame;