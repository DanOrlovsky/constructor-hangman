

var masterWordList = [
    "CSHARP",   
    "C PLUS PLUS",
    "RUBY ON RAILS",
    "PYTHON",
    "JAVASCRIPT",
    "ANSI C",
    "COBOL",
    "FORTRAN",
    "VISUAL BASIC",
    "COMPILER",
    "ALGORITHM",
    "QBASIC",
    "ASP NET",
    "FRAMEWORK",
];

function GetRandomWord() {
    return masterWordList[Math.floor(Math.random() * masterWordList.length)];
}

module.exports = {
    masterWordList,
    GetRandomWord,
};