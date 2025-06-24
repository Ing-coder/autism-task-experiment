const startBtn = document.getElementById('startBtn');
const taskContainer = document.getElementById('taskContainer');
const submitBtn = document.getElementById('submitBtn');
const answerInput = document.getElementById('answerInput');
const questionDiv = document.getElementById('question');
const feedbackDiv = document.getElementById('feedback');

let startTime, responses = [];

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    taskContainer.style.display = 'block';
    startTask();
});

function startTask() {
    const task = {
        question: 'Mix 4 parts blarp and ? parts quabble to make flumpf. Enter the quabble parts.',
        correctAnswer: 6 // Example: 4:6 ratio
    };
    questionDiv.textContent = task.question;
    startTime = Date.now();
}

submitBtn.addEventListener('click', () => {
    const answer = parseInt(answerInput.value);
    const reactionTime = (Date.now() - startTime) / 1000; // Seconds
    const isCorrect = answer === 6;
    feedbackDiv.textContent = isCorrect ? 'Correct!' : 'Incorrect, try again.';
    responses.push({ answer, reactionTime, isCorrect });
    answerInput.value = '';
    if (responses.length < 5) { // Limit to 5 trials for pilot
        startTask();
    } else {
        saveResponses();
    }
});

function saveResponses() {
    // For pilot, log to console and instruct to copy to Google Forms
    console.log('Responses:', responses);
    alert('Task complete! Please copy the console data to the provided Google Form.');
}