import Rx from 'rxjs/Rx';

Rx.Observable.prototype.chainOfCommonFilters = chainOfCommonFilters;

function chainOfCommonOperators(fn) {
  return this
    .filter(x => x%2)
    .map(x => x + 2)
}

const a$ = Rx.Observable.of(1,2,3,4);
const subscription = a$
  .chainOfCommonOperators()
  .subscribe(x => console.log(x));

subscription.dispose();
