import Rx from 'rx';
import _ from "lodash";
import logOperator from "./../logOperator";

const wordApiUrl = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
const numberOfWords = 10;
const timeInterval = 1 * 1000;

function duplicate(n) {
  return [n, n];
}



/*
function* flatMapExampleGenerator(){
  yield _.map([1, 2], duplicate);
  yield _.flatMap([1, 2], duplicate);
}
*/

function flatMapExampleGenerator(){
  return 1;
}

export const flatMapExample = flatMapExampleGenerator();