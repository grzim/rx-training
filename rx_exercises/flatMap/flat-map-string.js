import Rx from 'rx';
import _ from "lodash";
import logOperator from "./../logOperator";

const flatMapString$ = Rx.Observable
  .of('hello world!')
  .log('before flat:')
  .flatMap(x => x.split(" "))
  .log('after flat:');

flatMapString$.subscribe(
  (x) => console.log('Next: ' + x),
  (err) => console.log('Error: ' + err),
  () => console.log('Completed')
);


