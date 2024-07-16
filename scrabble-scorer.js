// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log(`Let's play some Scrabble \n`);
  let response = input.question("Enter a word to score: ");
  return response;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = {
  name: "simpleScorer",
  description: "Each letter is worth 1 point",
  scorerFunction: function(word) {
    return word.length
  }
};

let vowelBonusScorer = {
  name: "vowelBonusScorer",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: function(word){
    word = word.toUpperCase();
    let score = 0;
    for (i = 0; i < word.length; i++){
      if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U"){
        score += 3;
      } else{
        score += 1;
      }
    }
    return score;
  }
};

let scrabbleScorer = {
  name: "scrabbleScorer",
  description: "The traditional scoring algorithm",
  scorerFunction: function(word){
    word = word.toLowerCase();
    let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
    }
    return letterPoints;
  }
};

const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScorer];

function scorerPrompt(word) {
  let algorithmChoice = Number(input.question(`Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `));
  while (algorithmChoice > 2 || algorithmChoice < 0 || isNaN(algorithmChoice)){
    console.log(`You must enter 0, 1, or 2.`);
    algorithmChoice = Number(input.question(`Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `));
  }
  if (algorithmChoice === 0){
    console.log(`Score for '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
  } else if (algorithmChoice === 1){
    console.log(`Score for '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
  } else if (algorithmChoice === 2){
    console.log(`Score for '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
  }

}

function transform(pastPointStructure) {
  let pointStructure = {};
  for (value in pastPointStructure){
    for (i = 0; i < pastPointStructure[value].length; i++){
      pointStructure[pastPointStructure[value][i].toLowerCase()] = Number(value);
    }
  }
  return pointStructure;
};

function runProgram() {
   let word = initialPrompt();
   let algorithm = scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};


