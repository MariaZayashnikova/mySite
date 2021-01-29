import {wordsAll} from './dictionary';
import {showMessage} from './dictionary';

function test () {

    const containerStart = document.querySelector('.test-start'),
          formTest = document.querySelector('.form-test'),
          statWord = document.querySelector('.stat-word'),
          userWord = document.querySelector('.user-word'),
          pageEndTest = document.querySelector('.test-end'),
          resultTest = document.querySelector('.result-test'),
          btnRestart = document.querySelector('.restart-test'),
          containerAnswers = document.querySelector('.result-flex'),
          progressBar = document.querySelector('.progress'),
          containerUserWord = document.querySelector('.container-user-word'),
          btnCheck = document.querySelector('.check');

    let newWordsArr = [],
        widthProgress = 0,
        indexCurrWord,
        currVariationWord;

    let quantityWordInTest = 20;

    containerStart.classList.add('hidden');
    formTest.classList.remove('hidden');

    function getRandomNum (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createWordsCollection (originalArr, quantity) {
        for (let i = 0; i < quantity; i++){
            let num = getRandomNum(0, originalArr.length-1);
            let element = wordsAll[num];
            if(newWordsArr.some(word => word.id === element.id)){
                i--;
            } else {
                element.show = false;
                newWordsArr.push(element);
            }
        }
    }

    function findWord (arr) {
        for (let i = 0; i < arr.length; i++) {
            if(!arr[i].show) {
                return i;
            } else {
                continue;
            }
        }
    }

    function showWord (containerWord, arrWords, index) {
        if (index % 2) {
            containerWord.textContent = arrWords[index].rus;
            return 'rus';
        } else {
            containerWord.textContent = arrWords[index].en;
            return 'en';
        }
    }

    function saveData (arr, index, answerUser, variation) {
        arr[index].show = true;
        arr[index].variationWord = variation;

        if(variation === 'rus') {
            let origWord = arr[index].en.toLowerCase();

            if(origWord === answerUser) {
                arr[index].isCorrect = true;
            } else {
                arr[index].isCorrect = false;
                arr[index].answerUser = answerUser;
                arr[index].wordInDB = origWord;
            }
        } else {
            let origWord = arr[index].rus.toLowerCase();

            if(origWord === answerUser) {
                arr[index].isCorrect = true;
            } else {
                arr[index].isCorrect = false;
                arr[index].answerUser = answerUser;
                arr[index].wordInDB = origWord;
            }
        }
    }

    function createTableAnswers (arrWords) {
        let incorretWords = [];
        arrWords.forEach(word => {
            if(!word.isCorrect) {
                incorretWords.push(word);
            }
        });

        if(incorretWords.length > 0) {

            for (let i = 0; i < incorretWords.length; i++) {
                let element = document.createElement('div');
                element. classList.add('result-flex-element');

                let word = document.createElement('div');
                word.classList.add('word-test');
                if(incorretWords[i].variationWord === 'rus') {
                    word.textContent = incorretWords[i].rus;
                } else {
                 word.textContent = incorretWords[i].en;
                }
                element.append(word);

                let answerUser = document.createElement('div');
                answerUser.classList.add('answer-user');
                answerUser.textContent = incorretWords[i].answerUser;
                element.append(answerUser);

                let answerCorrect = document.createElement('div');
                answerCorrect.classList.add('correct-answer');
                answerCorrect.textContent = incorretWords[i].wordInDB;
                element.append(answerCorrect);

                containerAnswers.append(element);
            }
        }
    }

    function showResultTest () {
        let result = 0;
        newWordsArr.forEach(word => {
            if(word.isCorrect) {
                result++;
            }
        });
        resultTest.textContent = result;
        createTableAnswers(newWordsArr);
    }
    
    function testion () {
        indexCurrWord = findWord(newWordsArr);

        if(indexCurrWord == undefined) {
            formTest.classList.add('hidden');
            pageEndTest.classList.remove('hidden');
            showResultTest();
            return;
        }

        currVariationWord = showWord(statWord, newWordsArr, indexCurrWord);
    } 

    function showProgress (currWidthProgress) {
        progressBar.style.width = `${currWidthProgress}%`;
        progressBar.textContent = `${currWidthProgress}%`;
    }

    btnCheck.addEventListener('click', (event) => {
        event.preventDefault();

        if (!userWord.value) {
            showMessage(containerUserWord, 'errTranslation');
        } else {
            widthProgress += 5;
            let wordUser = userWord.value.toLowerCase();
            saveData(newWordsArr, indexCurrWord, wordUser, currVariationWord);
            userWord.value = '';
            showProgress(widthProgress);
            testion();
        }
    });

    btnRestart.addEventListener('click', () => {
        let oldResult = document.querySelectorAll('.result-flex .result-flex-element');
        if(oldResult) {
            oldResult.forEach(result => {
                result.remove();
            });
        } 

        pageEndTest.classList.add('hidden');
        formTest.classList.remove('hidden');
        widthProgress = 0;
        showProgress(widthProgress);
        newWordsArr = [];
        indexCurrWord = 0;
        currVariationWord = 0;

        createWordsCollection(wordsAll, quantityWordInTest);
        testion();
    });

    createWordsCollection(wordsAll, quantityWordInTest);
    testion();
}
export default test;

