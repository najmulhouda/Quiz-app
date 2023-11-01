const questions  =  [
    {
        question: "Which is largest animal in the world?",
        answer:[
            {text: "shark", corret: false},
            {text: "elephant", corret: false},
            {text: "tiger", corret: false}, 
            {text: "Blue Whale", corret: true}   
        ]
    },
    {
        question: "Which is the smallest country in the world?",    
        answer:[
            {text: "Vatican City", corret: true},
            {text: "Bhutan", corret: false},
            {text: "Nepal", corret: false}, 
            {text: "Bangladesh", corret: false}   
        ]
    },
    {
        question: "Which is largest Desert in the world?",
        answer:[
            {text: "Kalahari", corret: false},
            {text: "Gobi", corret: false},
            {text: "Sahara", corret: false}, 
            {text: "Antarctica", corret: true}   
        ]
    },
    {
        question: "Where is Tajmahal Locatated?",
        answer:[
            {text: "Bangladesh", corret: false},
            {text: "India", corret: true},
            {text: "Pakisthan", corret: false}, 
            {text: "Afghanistan", corret: false}   
        ]
    }
    
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

 function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
 } 


function showQuestion (){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let  questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.corret){
            button.dataset.correct = answer.corret;

        }
        button.addEventListener("click", selectAnswer);

    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 
} 

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();