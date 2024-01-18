const questions = [
    {
        question:"Who is the main character in 'Naruto'?",
        answers:[
            {text:"Sasuke Uchiha", correct:false},
            {text:"Naruto Uzumaki", correct:true},
            {text:"Sakura Haruno", correct:false},
            {text:"Kakashi Hatake", correct:false},
        ]
    },
    {
        question:"In 'One Piece,' what is the name of the main character's straw hat?",
        answers:[
            {text:"Straw Hat A", correct:false},
            {text:"Gomu Gomu no Hat", correct:false},
            {text:"Luffy's Hat", correct:false},
            {text:"Straw Hat Luffy", correct:true},
        ]
    },
    {
        question:"Which anime features a Death Note that allows the user to kill anyone by writing their name?",
        answers:[
            {text:"Bleach", correct:false},
            {text:"Attack on Titan", correct:false},
            {text:"Death Note", correct:true},
            {text:"Fullmetal Alchemist", correct:false},
        ]
    },
    {
        question:"In 'My Hero Academia,' what is the main character Izuku Midoriya's hero name?",
        answers:[
            {text:"Deku", correct:true},
            {text:"All Might Jr.", correct:false},
            {text:"Heroic Green", correct:false},
            {text:"Mighty Hero", correct:false},
        ]
    },
    {
        question:"Who is the creator of 'Dragon Ball'?",
        answers:[
            {text:"Masashi Kishimoto", correct:false},
            {text:"Eiichiro Oda", correct:false},
            {text:"Akira Toriyama", correct:true},
            {text:"Hiromu Arakawa", correct:false},
        ]
    },
    {
        question:"What is the name of the giant humanoid creatures in 'Attack on Titan'?",
        answers:[
            {text:"Ghouls", correct:false},
            {text:"Titans", correct:true},
            {text:"Kaiju", correct:false},
            {text:"Hollows", correct:false},
        ]
    },
    {
        question:"In 'Sword Art Online,' what is the name of the virtual reality MMORPG?",
        answers:[
            {text:"Alfheim Online", correct:false},
            {text:"The World", correct:false},
            {text:"Gun Gale Online", correct:false},
            {text:"Sword Art Online", correct:true},
        ]
    },
    {
        question:"Who is the protagonist of 'Fullmetal Alchemist: Brotherhood'?",
        answers:[
            {text:"Edward Elric", correct:true},
            {text:"Alphonse Elric", correct:false},
            {text:"Roy Mustang", correct:false},
            {text:"Winry Rockbell", correct:false},
        ]
    },
    {
        question:"In 'Hunter x Hunter,' what is the main character Gon Freecss searching for?",
        answers:[
            {text:"The Holy Grail", correct:false},
            {text:"The One Piece", correct:false},
            {text:"Hisoka", correct:false},
            {text:"His missing father", correct:true},
        ]
    },
    {
        question:"What is the name of the mysterious organization in 'Steins;Gate'?",
        answers:[
            {text:"SERN", correct:true},
            {text:"The Organization", correct:false},
            {text:"Future Gadget Lab", correct:false},
            {text:"Labomen", correct:false},
        ]
    }
];


const question_element = document.getElementById("question");
const answer_buttons = document.getElementById("answer-buttons");
const next_button = document.getElementById("next-btn");
const timer_display = document.getElementById("timer-display");

let current_question_index = 0;
let score = 0;
let timer;

const showQuestion = () => {
    resetState();
    let current_question = questions[current_question_index];
    let question_no = current_question_index + 1;
    question_element.innerHTML = question_no + ". " + current_question.question;

    current_question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_buttons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    startTimer();
}

const resetState = () => {
    clearInterval(timer);
    next_button.style.display = "none";
    timer_display.textContent = 5; 
    while (answer_buttons.firstChild) {
        answer_buttons.removeChild(answer_buttons.firstChild);
    }
}

const startQuiz = () => {
    current_question_index = 0;
    score = 0;
    next_button.innerHTML = "Next";
    showQuestion();
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answer_buttons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        next_button.style.display = "block";
        clearInterval(timer); // Stop the timer after answering
    });
}

next_button.addEventListener("click", () => {
    if (current_question_index < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

const handleNextButton = () => {
    current_question_index++;
    if (current_question_index < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

const showScore = () => {
    resetState();
    question_element.innerHTML = ` Your scored ${score} out of ${questions.length}!`;
    next_button.innerHTML = "Play Again";
    next_button.style.display = "block";
}

const startTimer = () => {
    let timeLeft = 5;
    timer = setInterval(() => {
        timeLeft--;
        timer_display.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            handleNextButton();
        }
    }, 1000);
}

startQuiz();