let questions = [
    "Where should you put your jquery CDN link?",
    '"3" + 2 = ?',
    "What is the result of this expression: 'undefined == false'",
    "What is Bootstrap?",
    "What does 'm-auto' class do in bootstrap?"
];

// answer at index 0 is the correct answer
let answers = [
    ["Just before the end of body tag, just before any custom script.",
        "In the head tag.",
        "At the beginning of body tag",
        "At the end of body tag"],
    ['"32"',
        '32',
        '5',
        '"5"'],
    ["false",
        'true',
        'undefined'],
    ["A CSS framework",
        "A Javascript framework"],
    ["Set margin to auto",
        "Set padding to auto",
        "Does nothing"]
];


let secondsLeft = 120;
let currentIndex = 0;
let $question = $('#question');
let $answers = $('#answers');
let $startBtn = $('#startBtn');
let $time = $('#time');
let $result = $('#result');

let score = 0;
let scores = [];

let interval = undefined;
let timeout = undefined;

//load past score:
if(localStorage.getItem('scores')) {
    scores = JSON.parse(localStorage.getItem('scores'));
}


/**
 * renders the question and answers
 * @param index
 */
function renderQuestion(index) {
    let question = questions[index];
    let answerArr = answers[index];

    $question.text(question);
    $question.data('question-index', index);
    $answers.empty();

    for(let answer of answerArr) {
        let $answer = $(`<li>${answer}</li>`);
        if(Math.random() > 0.5) {
            $answers.append($answer);
        } else {
            $answers.prepend($answer);
        }
    }
}


/**
 * stops the countdown, calculate and displays score.
 */
function displayScore() {
    clearInterval(interval);
    interval = undefined;
    score += secondsLeft;

    alert("Your score is: " + score);
    let initials = prompt('Please Enter your initials');
    if(initials != null) {
        scores.push(initials + ": " + score);
        localStorage.setItem('scores', JSON.stringify(scores));
    }
}

/**
 * when an answer was clicked.
 * check if answer is correct, calculates time left and check for end of quiz
 */
$answers.on('click', (event) => {
    if(!interval) {
        //stop the quiz if the time is not counting.
        return;
    }

    let answerText = $(event.target).text();
    let index = $question.data('question-index');
    $result.show();
    if(answers[index][0] === answerText) {
        $result.text('Correct');
        score+=5;
    } else {
        $result.text('Incorrect');
        secondsLeft-=5;
        $time.text(secondsLeft);
    }
    currentIndex++;

    if(currentIndex < questions.length) {
        renderQuestion(currentIndex);
    } else {
        displayScore();
    }


    if(timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(()=> {
        $result.hide();
    }, 2000);
});


/**
 * starts the quiz, also check for time left to stop the quiz/
 */
$startBtn.click(() => {
    $startBtn.css('display', 'none');
    renderQuestion(currentIndex);

    interval = setInterval(()=> {
        secondsLeft--;
        $time.text(secondsLeft);
        if(secondsLeft <= 0) {
            alert('Time is up!');
            displayScore();
        }

    }, 1000)
});