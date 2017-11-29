'use strict';
// Create new user
// Copy all questions
// Set questionHead to 0
// ​
// Start user session
// Get user from db & load into state
// User array of questions should be ready to use out-of-the-box
// question = question[questionHead]
// ​
// User answers question

const scoreAnswer = (questionObject) => {
  const correct = 2;
  const incorrect = -1;
  const maxRange = 10;
  const minRange = ;
  let score;
  if (questionObject.brit === questionObject.us) {
    if (questionObject.score + correct <= maxRange ) {
      score = questionObject.score + correct;       
    } else {
      score = maxRange;
    }
  } else {
    if (questionObject.score + incorrect >- minRange ) {
      score = questionObject.score + incorrect;       
    } else {
      score = minRange;
    }    
  }
  return score;
};

// this mutates the array upon which it is called
const reposition = (array, questionCurrent, questionCurrentIndex, questionPriorIndex) => {
  // questionCurrent is what we just answered
  // both prior question and current question point to same next (for now)
  array[questionPriorIndex].nextIndex = questionCurrent.nextIndex;
  // consts below are used after function completes
  const score = questionCurrent.score;
  const nextIndex = questionCurrent.nextIndex;
  const questionNext = array[nextIndex]
  
  /* very simple, ordered array (no next pointers)
    [ 0 , 1 , 1 , 1 , 2 , 3 , 4 , 4 , 5 , 6 ]
                  loopCurrent
                  loopCurrentIndex = 3
                      loopNextIndex = 4
                      loopNext = 2
                  score = 2
                  while 2 >= 2 ... true ... keep going
  */

  let loopCurrent = questionNext;
  let loopNextIndex = loopCurrent.nextIndex;
  let loopNext = loopNextIndex ? array[loopNextIndex] : null ; // these ternaries are to prevent errors in loop statement
  let loopNextScore = loopNext ? loopNext.score : 999 ;
  
  while ( score >= loopNextScore || loopNext ) {
    loopNextIndex = loopCurrent.nextIndex;
    loopCurrent = array[loopNextIndex];
    loopNext = loopNextIndex ? array[loopNextIndex] : null ; // these ternaries are to prevent errors in loop statement
    loopNextScore = loopNext ? loopNext.score : 999 ;
  }
  questionCurrent.nextIndex = loopNextIndex;
  loopCurrent.nextIndex = questionCurrentIndex;
}

