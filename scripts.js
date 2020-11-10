let questions = [
    "Where should you put your jquery CDN link?",
    '"3" + 2 = ?'
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
        '"5']
];


let secondsLeft = 30;
let currentIndex = 0;
let $question = $('#question');
let $answers = $('#answers');

/**
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

$answers.on('click', (event) => {
    let answerText = $(event.target).text();
    let index = $question.data('question-index');

    if(answers[index][0] === answerText) {
        console.log('correct');
    } else {
        console.log('wrong');
    }
});

renderQuestion(currentIndex);