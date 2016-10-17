import Rx from 'rx';

class Input extends Rx.Subject {
  replicate(source) {
    if (typeof source === 'undefined') {
      throw new Error('Cannot replicate() if source is undefined.');
    }
    return source.subscribe(
      x => subject.onNext(x),
      err => console.error(err)
    );
  }
}

export default Input;