const checkIfAnswerIsCorrect = (userAnswer, question) => {
  let answerIsCorrect = false;

  switch (question.type) {
    case `artist`:
      answerIsCorrect = userAnswer.every((it, i) => it === (
        question.answers[i].artist === question.song.artist
      ));
      break;
    case `genre`:
      answerIsCorrect = userAnswer.every((it, i) => it === (
        question.answers[i].genre === question.genre
      ));
      break;
  }

  return answerIsCorrect;
};

const getTime = (timeInSeconds) => {
  let time = {
    minutes: null,
    seconds: null,
  };

  time.minutes = (timeInSeconds < 60)
    ? 0
    : Math.floor(timeInSeconds / 60);

  if (time.minutes < 10) {
    time.minutes = `0` + time.minutes;
  }

  time.seconds = (timeInSeconds < 60)
    ? timeInSeconds
    : timeInSeconds % 60;

  if (time.seconds < 10) {
    time.seconds = `0` + time.seconds;
  }

  return time;
};

export {
  checkIfAnswerIsCorrect,
  getTime,
};
