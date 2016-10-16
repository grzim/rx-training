import Rx from 'rxjs/Rx';
import _ from "lodash";
import logOperator from "./../log-operator";

const flatMapObservable$ = Rx.Observable
  .range(0,2)
  .log('flatMapObservable$ before  flat:')
  .flatMap(x => Rx.Observable.range(0,2))
  .log('flatMapObservable$ after flat:');

flatMapObservable$.subscribe(
  x => console.log(x),
  error => console.error(error),
  () => console.log('done')
);
