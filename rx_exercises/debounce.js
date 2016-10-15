import Rx from 'rx';
import logOperator from './log-operator'

const numbersArr = [1,2,3,4,5];

const numbers$ = Rx.Observable.from(numbersArr);

const interval$ = Rx.Observable
  .from(numbersArr)
  .flatMap(x => Rx.Observable.interval(x * 300)
    .take(numbersArr.length)
    .timeInterval())
  .log('after flat map')
  .log();


const subscription = numbers$
  .log('number')
  .zip(interval$)
  .log('after zip')
  .debounce(1000)
  .log('after debounce:')
  .subscribe(
    x => console.log(x),
    error => console.error(error),
    () => console.log('done')
  );

export default subscription;