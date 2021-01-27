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
          btnCheck = document.querySelector('.check');

    let newWordsArr = [],
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
                element.answer = false;
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

        if(variation === 'rus') {
            let origWord = arr[index].en.toLowerCase();

            if(origWord === answerUser) {
                arr[index].isCorrect = true;
            } else {
                arr[index].isCorrect = false;
            }
        } else {
            let origWord = arr[index].rus.toLowerCase();

            if(origWord === answerUser) {
                arr[index].isCorrect = true;
            } else {
                arr[index].isCorrect = false;
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

    btnCheck.addEventListener('click', () => {
        if (!userWord.value) {
            showMessage(userWord, 'errTranslation');
        } else {
            let wordUser = userWord.value.toLowerCase();
            saveData(newWordsArr, indexCurrWord, wordUser, currVariationWord);
            userWord.value = '';
            testion();
        }
    });

    btnRestart.addEventListener('click', () => {
        pageEndTest.classList.add('hidden');
        formTest.classList.remove('hidden');
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

