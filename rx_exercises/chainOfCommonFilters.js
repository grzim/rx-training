import Rx from 'rx';

Rx.Observable.prototype.chainOfCommonFilters = chainOfCommonFilters;

function chainOfCommonFilters(fn) {
  return this
    .filter(x => x%2)
    .map(x => x + 2)
}

const a$ = Rx.Observable.of(1,2,3,4);
const subscription = a$
  .chainOfCommonFilters()
  .subscribe(x => console.log(x));

subscription.dispose();
