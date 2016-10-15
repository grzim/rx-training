import _ from "lodash";
import logOperator from "./logOperator";

const wordApiUrl = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
const numberOfWords = 10;
const timeInterval = 1 * 1000;

function duplicate(n) {
  return [n, n];
}

function* flatMapExampleGenerator(){
  yield _.map([1, 2], duplicate);
  yield _.flatMap([1, 2], duplicate);
}

export const flatMapExample = flatMapExampleGenerator();

const source = Rx.Observable
  .of('hello world!')
  .log('before flat:')
  .flatMap(x => x.split(" "))
  .log('after flat:');

const subscription = source.subscribe(
  function (x) { console.log('Next: ' + x); },
  function (err) { console.log('Error: ' + err); },
  function () { console.log('Completed'); });



function getWordPromise(){
  return fetch(wordApiUrl)
    .then(
      response =>
      // Examine the text in the response
       response.json().then(wordArr => wordArr[0].word)
        .catch(err => console.log('Response Error', err))
    )
    .catch(err => {
      console.log('Fetch Error', err);
    });
}

Rx.Observable
  .interval(timeInterval)
  .take(numberOfWords)
  .flatMap(x => getWordPromise())
  .subscribe(x => console.log(x),
    error => console.error(error),
    () => console.log('done'));