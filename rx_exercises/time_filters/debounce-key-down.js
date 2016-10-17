import Rx from 'rxjs/Rx';
import logOperator from './../log-operator'


const keyDown$ = Rx.Observable.fromEvent(window, 'keydown');

const subscription = keyDown$
  .debounceTime(1000)
  .pluck('code')
  .subscribe(
    x => console.log(x),
    error => console.error(error),
    () => console.log('done')
  );

export default subscription;