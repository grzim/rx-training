import Rx from 'rx';
import replicate from './replicate';
import startState, {
  nextState,
  baseCharArray,
  startInterval
} from './state';
import toDispose from './to_dispose';
import Input from './Input';

const string$ = new Input();
const interval$ = new Input();
const gameLose$ = new Input();
const gameWon$ = new Input();
const terminateGame$ = new Input();
const startGame$ = new Input();

const subscriptions = toDispose(terminateGame$);

const currentString$ = string$
        .scan(({transformTable, string, nextTransformation, nextGoal}, pressedKey) => {
          const getNextState = transformTable[pressedKey];
          const newData = getNextState({string, nextTransformation, nextGoal});

          transformTable = nextState();
          transformTable[newData.nextGoal] =
            ({string, nextTransformation}) => nextTransformation(string);

          return {
            transformTable,
            ...newData
          }
        }, startState)
        .startWith({
          string: baseCharArray
        })
        .distinctUntilChanged(data => data.string.join(''))
        .pluck('string')

const averageTime$ = currentString$
        .timeInterval()
        .pluck('interval')
        .scan((acc, val) => acc + val, 0)
        .map((val, idx) => val / (idx + 1));

export default {
  currentString$,
  averageTime$,
  interval$: interval$.startWith(startInterval),
  loseMessage$: gameLose$.pluck('message'),
  winMessage$: gameWon$.pluck('message'),
  terminateGame$,
  startGame$,
  observe
}

function observe(intent) {
  subscriptions.push(
    string$.replicate(intent.letter$),
    interval$.replicate(intent.intervalChange$),
    gameLose$.replicate(intent.gameLose$),
    gameWon$.replicate(intent.gameWon$),
    terminateGame$.replicate(intent.terminateGame$),
    startGame$.replicate(intent.startGameChange$)
  )
}
