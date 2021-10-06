let displayWords = [];

let subWords = [];

let guessedWords = [];

let rootWord = "";

getWordOfLength()

//Selects the word and begins the game
function getWordOfLength (length = 6){

    console.clear();

    let possibleWords = [];
    subWords = [];

    //Creates an array of all the words of the proper length
    dictionary.forEach(word => {
        if(word.length == 6){
            possibleWords.push(word);
        }
    });

    //Selects the word to be guessed
    let wordNum = Math.floor(Math.random() * [possibleWords.length]);
    rootWord = possibleWords[wordNum];

    let wordLetters = [];

    //Adds the letters of the root word to the word letters
    possibleWords[wordNum].split("").forEach(letter => {
        wordLetters.push(letter);
    });

    //Selects the subwords
    dictionary.forEach(subWord => {
        let confirmedLetters = 0;

        if(subWord.length >= 3){

            //Breaks the selected word into letters and compares each one to the root word, clearing already used
            let subWordTest = subWord.split("");
            wordLetters.forEach(letter => {
                if(subWordTest.includes(letter)){
                    confirmedLetters++;
                    subWordTest[subWordTest.indexOf(letter)] = "";
                }
            });

            //If the number of confirmed letters is the same as the length of the subword, and the subword is not the original word, the subword is added to the subWord array
            if(confirmedLetters == subWordTest.length){
                subWords.push(subWord);
            }
        }
    });

    scrambledWord = scramble(rootWord);
    console.log(scrambledWord);

    playTheGame();
}

function displaySubWords(){

    displayWords = [];

    //Sets the displayed words to "-"
    subWords.forEach(subWord => {
        if(guessedWords.indexOf(subWord) == -1){
            subWord.split("").forEach(letter => {

                if(displayWords[subWords.indexOf(subWord)]){
                    displayWords[subWords.indexOf(subWord)] += "-"
                } else {
                    displayWords[subWords.indexOf(subWord)] = "-"
                }
            });
        } else {
            displayWords[subWords.indexOf(subWord)] = subWord;
        }
        
    });

    //Displays the words
    displayWords.forEach(displayedWord =>{
        console.log(displayedWord);
    });
}

//Scrambles the given word
function scramble(wordToScramble = ""){

    let wordLen = wordToScramble.length;
    let scrambledArray = [];

    //Splits the given word into an array and randomizes the location of each letter
    wordToScramble.split("").forEach(letter => {
        let slot = Math.floor(Math.random() * wordLen);
        while(scrambledArray[slot]){
            slot++;
            if(slot >= wordLen){
                slot = 0;
            }
        }
        scrambledArray[slot] = letter;
    });

    //Forms a word from the scrambled word array
    function createWord(){
        let reformedWord = "";
        scrambledArray.forEach(letter => {
            reformedWord = reformedWord + "" + letter;
        });
        return reformedWord;
    }
    
    return createWord();
}

//Repeatedly prompts user until a win condition is met or the game is canceled or restarted
function playTheGame(){

    console.clear();

    let gameOver = false;

    console.log(scrambledWord);
    displaySubWords();
    
    input = prompt("Guess a word, or enter Cancel to quit! Entering a * will restart");

        if(input != null && guessedWords.length != subWords.length && input != "*"){
            if(subWords.indexOf(input) != -1){
                if(guessedWords.indexOf(input) == -1){
                    alert("Got one!");
                    guessedWords.push(input);
                } else {
                    alert("You already guessed that");
                }
            } else {
                if(input == "*"){

                } else if(input != null){
                    alert("That's not a word");
                }
            }
            console.clear();
            console.log(scrambledWord);
            displaySubWords();
        } else if (input == "*"){
            console.clear();
            scramble(rootWord);
        } else {
            console.clear();
            console.log("You guessed " + guessedWords.length + " of " + subWords.length + " words!")
            guessedWords = subWords;
            displaySubWords();
            gameOver = true;
        }

        if(guessedWords.length == subWords.length && input != null){
            alert("YOU WIN!!!");
            gameOver = true;
        }

    if(!gameOver){
        playTheGame();
    }
}