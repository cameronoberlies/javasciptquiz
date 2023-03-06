const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
let randomQuestion, currentQuestionIndex
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
var secondsLeft = 60;
var timeEl = document.querySelector('.time');

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage('Out of Time')
        }
    }, 6000);
}

function startGame() {
startButton.classList.add('hide')
randomQuestion = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainer.classList.remove('hide');
nextQuestion()
}

function nextQuestion() {
resetState()
showQuestion(randomQuestion[currentQuestionIndex])
}

function showQuestion(question) {
questionElement.innerText = question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer) 
    answerButtons.appendChild(button) 

})
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtons.firstChild) {
        answerButtons.removeChild 
        (answerButtons.firstChild)
    }
}

function selectAnswer(i) {
const selectedButton = i.target
const correct = selectedButton.dataset.correct
setStatusClass(document.body, correct)
Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})
if (randomQuestion.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
} else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}


}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        
    } else { 
        element.classList.add('wrong')

    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
{
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
       {text: '1. <scripting>', correct: false},
       {text: '2. <javascript>', correct: false},
       {text: '3. <js>', correct: false},
       {text: '4. <script>', correct: true}
    ]

},
{
    question: "How do you create a function in JavaScript?",
    answers: [
        {text: '1. function:myFunction()', correct: false},
        {text: '2. function = myFunction()', correct: false},
        {text: '3. function myFunction()', correct: true}
    ]
},
{
    question: "How does a FOR loop start?", 
    answers: [
        {text: '1. for(i<= 5, i++)', correct: false},
        {text: '2. for i = 1 to 5', correct: false},
        {text: '3. for(i=0; i <=5)', correct: false},
        {text: '4. for (i=0, i <=5, i++)', correct: true}

        
    ]
},
{
    question: 'How do you declare a JavaScript variable?', 
    answers: [
        {text: '1. v carName;', correct: false},
        {text: '2. var carName;', correct: true}, 
        {text: '3. variable carName;', correct: false}
    ]
}
    
]
 
setTime();
