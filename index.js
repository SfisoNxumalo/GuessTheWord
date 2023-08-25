const btnGuess = document.getElementById("btn-Guess");
const btnNewWord = document.getElementById("new-word");
const btnHint = document.getElementById("hint");
const lblResult = document.getElementById("out-put");
const lblOutput = document.getElementById("word-d");
const txtGuess = document.getElementById("txt-field");
const lblWordsToGuess = document.getElementById("wordsToGuess");
const lblHighScore = document.getElementById("highscore");
const lblCurrentScore = document.getElementById("yourscore");
const btnNewgame = document.getElementById("newgame");


let hints = 2;
const words = ["Guess", "Dare", "Name","Amen","Skate", "Dear", "Steak","Limitation","Javascript","Align","Stake","Dictionary","Horse","Camera","Elevate","Programmer","Red","Read","Hammer","Summer","Mean"];
let CorrectlyGuessed = [];
let PreGeneratedWord = ""
let tryLimit = 5;

let high_score = 0;
let current_score = 0;

function fCheck_Hints()
{
    if(hints === 2){
        lblResult.innerHTML = "Word starts with '" + PreGeneratedWord.split("")[0] + "'";
        hints--;
        btnHint.value = `Hint (${hints})`
        localStorage.setItem("hints", hints);
    }
    else if(hints === 1)
    {
        lblResult.innerHTML = "Word end with '" + PreGeneratedWord.split("")[PreGeneratedWord.length-1] + "'";
        hints--;
        btnHint.value = `Hint (${hints})`
        localStorage.setItem("hints", hints);
    }
    else {
        lblResult.innerHTML = "All hints have been used";
        setTimeout(() => {lblResult.innerHTML = ".........."}, 3000)
    }
}

function fGenerateNewWord()
{
    hints = 2;
    localStorage.setItem("hints", hints);

    while(true)
    {
        const index = Math.floor(Math.random() * words.length);

       const CurrentWord = words[index].toLowerCase();

        if(CurrentWord !== PreGeneratedWord 
            && !CorrectlyGuessed.includes(CurrentWord))
        {
            const randomizedWord = CurrentWord.toLowerCase().split("").sort(() => Math.random() - 0.5).join('');
            
            const upper = words.map(element => {
                return element.toLowerCase();
              });

            if (!upper.includes(randomizedWord))
            {
                lblOutput.innerHTML = randomizedWord;
                PreGeneratedWord = CurrentWord;
                localStorage.setItem("generated_word", randomizedWord);
                localStorage.setItem("generated_wordIndex", index)
                lblWordsToGuess.innerHTML = `Words guessed: ${CorrectlyGuessed.length} /${words.length}`;
                fClear();
                break;
            }
        }
    }
}

function fWindowLoaded()
{
    fLocalStorageManager();

    btnHint.value = `Hint (${localSHints})`
    CorrectlyGuessed = localSWordsGuessed

    lblWordsToGuess.innerHTML = `Words guessed: ${CorrectlyGuessed.length} /${words.length}`;

    if(localSGeneratedWord === "")
    {
        fGenerateNewWord();
    }
    else {
        PreGeneratedWord = localSGeneratedWord;
        lblOutput.innerHTML = localSGeneratedWord;
    }
    
    lblHighScore.innerHTML = `High Score: ${high_score}` ;
    lblCurrentScore.innerHTML = `Your Score: ${current_score}` ;
}

let localSHints = 2;
let localSWordsGuessed = [];
let localSUserInput = "";
let localSGeneratedWord = "";

function fLocalStorageManager()
{
    if(localStorage.length !== 0)
    {
        if(localStorage.getItem("hints") === null)
        {
            localStorage.setItem("hints", localSHints);
        }
        else{
            localSHints = localStorage.getItem("hints");
        }

        if(JSON.parse(localStorage.getItem("words_guessed")).length === 0)
        {
            localStorage.setItem("words_guessed", JSON.stringify(localSWordsGuessed));
        }
        else
        {
            localSWordsGuessed = JSON.parse(localStorage.getItem("words_guessed"));
        }

        if(localStorage.getItem("user_input") === null)
        {
            localStorage.setItem("user_input", localSUserInput);
        }
        else
        {
            localSUserInput = localStorage.getItem("user_input");
        }

        if(localStorage.getItem("generated_word") === null)
        {
            localStorage.setItem("generated_word", localSGeneratedWord);
        }
        else 
        {
            localSGeneratedWord = localStorage.getItem("generated_word");
        }

        if(localStorage.getItem("high_score") === null)
        {
            localStorage.setItem("high_score", 0);
        }
        else 
        {
            high_score = localStorage.getItem("high_score");
        }

        if(localStorage.getItem("current_score") === null)
        {
            localStorage.setItem("current_score", 0);
        }
        else 
        {
            current_score = localStorage.getItem("current_score");
        }
         
    }
    else 
    {
        localStorage.setItem("words_guessed", JSON.stringify(localSWordsGuessed));
        localStorage.setItem("generated_word", localSHints);
        localStorage.setItem("user_input", localSUserInput);
        localStorage.setItem("generated_word", localSGeneratedWord);
        localStorage.setItem("current_score", 0);
        localStorage.setItem("high_score", 0);
    }
}

function fCheckWord()
{
    if(txtGuess.value.toLowerCase() === words[localStorage.getItem("generated_wordIndex")].toLowerCase())
    {
        lblResult.innerHTML = "Correct"
        CorrectlyGuessed.push(PreGeneratedWord);
        localStorage.setItem("words_guessed", JSON.stringify(CorrectlyGuessed));
        current_score = Number(current_score) + 2;
        localStorage.setItem("current_score", current_score);

        if(current_score > localStorage.getItem("high_score"))
        {
            localStorage.setItem("high_score", current_score);
        }

        lblHighScore.innerHTML = `High Score: ${localStorage.getItem("high_score")}` ;
        lblCurrentScore.innerHTML = `Your Score: ${localStorage.getItem("current_score")}` ;

        fGenerateNewWord();
    }
    else{
        lblResult.innerHTML = "Incorrect"
        fClear();
    }
}

function fClear()
{
    txtGuess.value = "";
    setTimeout(() => {lblResult.innerHTML = ".........."}, 3000)
    btnHint.value = `Hint (${hints})`
    
}

function fNewGame()
{
    
            localStorage.setItem("hints", 2);
            const em = []
    
            localStorage.setItem("words_guessed", JSON.stringify(em));
            localStorage.setItem("current_score", 0);
            lblCurrentScore.innerHTML = `Your Score: ${0}` ;
            lblWordsToGuess.innerHTML = `Words guessed: ${0} /${words.length}`;
    fClear();
    fGenerateNewWord();
}

window.addEventListener("DOMContentLoaded", fWindowLoaded)

btnHint.addEventListener("click", fCheck_Hints);
btnNewWord.addEventListener("click", fGenerateNewWord);
btnGuess.addEventListener("click", fCheckWord);
btnNewgame.addEventListener("click", fNewGame);