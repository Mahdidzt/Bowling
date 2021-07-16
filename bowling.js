//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {
  // class Bowling {

  frames = [];
  rollElement = {
    rollOne: 0,
    rollTwo: 0,
    type: '',
    finished: false
  };

  roll(pins) {
    if (pins < 0) {
      throw 'Negative roll is invalid';
    }
    if (pins > 10) {
      throw 'Pin count exceeds pins on the lane';
    }

    const lastRoll = this.frames[this.frames.length - 1];
    if (!lastRoll) {
      if (pins === 10) {
        this.rollElement.rollOne = 10;
        this.rollElement.rollTwo = 0;
        this.rollElement.type = 'X';
        this.rollElement.finished = true;
      } else {
        this.rollElement.rollOne = pins;
        this.rollElement.finished = false;
      }
      this.frames.push({ ...this.rollElement })
    } else if (this.frames[8]?.finished) {
      const lastRollOfList = this.frames[9];
      if (!lastRollOfList) {
        if (pins === 10) {
          this.rollElement.rollOne = 10;
          this.rollElement.finished = true;
          this.rollElement.type = 'X';
        } else {
          this.rollElement.rollOne = pins;
          this.rollElement.finished = false;
          this.rollElement.type = '';
        }
        this.frames.push({ ...this.rollElement })
      } else if (!lastRollOfList.finished) {
        if (pins === 10) {
          this.rollElement.rollOne = 10;
          this.rollElement.rollTwo = 0;
          this.rollElement.finished = true;
          this.rollElement.type = 'X';
          this.frames.push({ ...this.rollElement })
        } else if (lastRollOfList.rollOne + pins === 10) {
          lastRollOfList.rollTwo = pins;
          lastRollOfList.type = '/';
          lastRollOfList.finished = true;
        } else {
          lastRollOfList.rollTwo = pins;
          lastRollOfList.type = '';
          lastRollOfList.finished = true;
        }
        // if (lastRollOfList.rollOne + pins === 10) {
        //   lastRollOfList.type = '/';
        // }
        // lastRollOfList.rollTwo = pins;
        // lastRollOfList.finished = true;
      } else {
        this.rollElement.rollOne = pins;
        this.rollElement.rollTwo = 0;
        this.rollElement.type = pins === 10 ? 'X' : '';
        this.rollElement.finished = true;
        this.frames.push({ ...this.rollElement })
      }
    } else {
      if (lastRoll.finished) {
        if (pins === 10) {
          this.rollElement.rollOne = 10;
          this.rollElement.rollTwo = 0;
          this.rollElement.type = 'X';
          this.rollElement.finished = true;
        } else {
          this.rollElement.rollOne = pins;
          this.rollElement.type = '';
          this.rollElement.finished = false;
        }
        this.frames.push({ ...this.rollElement })
      } else {
        if (pins === 10) {
          lastRoll.rollTwo = 10;
          lastRoll.type = 'X';
        } else if (lastRoll.rollOne + pins === 10) {
          lastRoll.rollTwo = pins;
          lastRoll.type = '/';
        } else {
          lastRoll.rollTwo = pins;
          lastRoll.type = '';
        }
        lastRoll.finished = true;
      }
    }
    let error = '';
    this.frames.forEach((item, i, list) => {
      if (
        (item.rollOne + item.rollTwo > 10 && i <= 8) ||
        (i > 8 && (list[i].type !== '/' && list[i].type !== 'X') && list[i].rollOne + list[i + 1]?.rollOne > 10)
      ) {
        error = 'Pin count exceeds pins on the lane';
      }
    })
    if (error) {
      throw error;
    }
    const initial

    if ((this.frames[9]?.type !== 'X' && this.frames[9]?.type !== '/') && this.frames.length > 10) {
      throw 'Cannot roll after game is over';
    }

    if (this.frames[9]?.type === 'X' && this.frames.length > 12) {
      throw 'Cannot roll after game is over';
    }

    if (this.frames[9]?.type === '/' && this.frames.length > 11) {
      throw 'Cannot roll after game is over';
    }


  }

  score() {
    if (this.frames.length < 9) {
      throw 'Score cannot be taken until the end of the game';
    }

    if (this.frames[9]?.type === 'X' && this.frames.length <= 11) {
      throw 'Score cannot be taken until the end of the game';
    }

    if (this.frames[9]?.type === '/' && this.frames.length <= 10) {
      throw 'Score cannot be taken until the end of the game';
    }

    const score = this.frames.reduce((acc, frame, i, list) => {
      if (i > 9) {
        return acc;
      }
      if (i === 9) {
        if (frame.type === 'X') {
          acc += 10 + list[i + 1].rollOne + list[i + 2].rollOne;
        } else if (frame.type === '/') {
          acc += 10 + list[i + 1].rollOne;
        } else {
          acc += frame.rollOne + frame.rollTwo;
        }
      } else {
        if (frame.type === 'X') {
          if (list[i + 1].type === 'X') {
            acc += 10 + list[i + 1].rollOne + list[i + 2].rollOne;
          } else {
            acc += 10 + list[i + 1].rollOne + list[i + 1].rollTwo;
          }
        } else if (frame.type === '/') {
          acc += 10 + list[i + 1].rollOne;
        } else {
          acc += frame.rollOne + frame.rollTwo;
        }
      }
      return acc;
    }, 0)

    return score;
  }
}
// const rolls = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6];
// const rolls = [6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
// const rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
// const rolls = [10, 10, 10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3];
// const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7];
// bowling.roll(5);
// bowling.roll(6);
// const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 6];
// const rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10];
// const bowling = new Bowling();
// rolls.forEach((roll) => {
//   bowling.roll(roll);
// });
// console.log(bowling.frames);
// const score = bowling.score();
// console.log(score);


