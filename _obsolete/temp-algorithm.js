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

const reposition = (questionsArray, questionCurrent, questionCurrentIndex, questionPriorIndex) => {
  // array is the array from user.questions (state), so do not mutate
  array = [...questionsArray];
  // questionCurrent is what we just answered
  // prior >>> current >>>> next  ====>>>  prior >>> next (take current out of the mix)
  array[questionPriorIndex].nextIndex = questionCurrent.nextIndex;
  // consts below are used after function completes
  const score = questionCurrent.score;
  const nextIndex = questionCurrent.nextIndex;
  
  /* very simple, ordered array (no next pointers)
    [ 0 , 1 , 1 , 1 , 2 , 3 , 4 , 4 , 5 , 6 ]
                  loopCurrent
                  loopCurrentIndex = 3
                      loopNextIndex = 4
                      loopNext = 2
                  score = 2
                  while 2 >= 2 ... true ... keep going
  */
  // initialize loop
  let loopCurrent = array[nextIndex];
  let loopNextIndex = loopCurrent.nextIndex;
  let loopNext = loopNextIndex ? array[loopNextIndex] : null ; // these ternaries are to prevent errors in loop statement
  let loopNextScore = loopNext ? loopNext.score : 999 ;
  // loop thru and find slot at end of matching values, i.e. if we have a 2, find last 2, then stop
  while ( score >= loopNextScore || loopNext ) {
    loopNextIndex = loopCurrent.nextIndex;
    loopCurrent = array[loopNextIndex];
    loopNext = loopNextIndex ? array[loopNextIndex] : null ; // these ternaries are to prevent errors in loop statement
    loopNextScore = loopNext ? loopNext.score : 999 ;
  }
  // once loop completes, insert current question in that slot
  questionCurrent.nextIndex = loopNextIndex;
  loopCurrent.nextIndex = questionCurrentIndex;
}

