// 1. You will have only <span>15 second</span> per each question
// 2. Once you select your answer, you can't reselect
// 3. You cant select any option once time goes off
// 4. You cant exit from the quiz while you're playing
// 5. You'll get points for correct answers



//getting all required elements

const start__btn = document.querySelector(".start__btn button");
const info__box = document.querySelector(".info__box");
const exit__btn = info__box.querySelector(".buttons .quit");
const continue__btn = info__box.querySelector(".buttons .restart");
const quiz__box = document.querySelector(".quiz__box");
const timeCount = document.querySelector(".timer .timer__sec");
const timeLine = document.querySelector("header .time__line");
const timeOff= document.querySelector("header .time__text");
const option__list = document.querySelector(".option__list");

//if start button clicked
start__btn.onclick = ()=>{
    info__box.classList.add("activeInfo");
}

//if exit button clicked
exit__btn.onclick = ()=>{
    info__box.classList.remove("activeInfo");
}

//if continue button clicked
continue__btn.onclick = ()=>{
    info__box.classList.remove("activeInfo");
    quiz__box.classList.add("activeQuiz");
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que__count = 0;
let que__numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next__btn = quiz__box.querySelector(".next__btn");
const result__box = document.querySelector(".result__box");
const restart__quiz = result__box.querySelector(".buttons .restart");
const quit__quiz = result__box.querySelector(".buttons .quit");

restart__quiz.onclick = ()=>{
    quiz__box.classList.add("activeQuiz");
    result__box.classList.remove("activeResult");
     que__count = 0;
     que__numb = 1;
     timeValue = 15;
     widthValue = 0;
     userScore = 0;
    showQuestion(que__count);
    queCounter(que__numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next__btn.style.display = "none";
    timeOff.textContent = "Time Left";
}

quit__quiz.onclick = ()=>{
    window.location.reload();
}


//if next button clicked

next__btn.onclick = ()=>{
    if(que__count < questions.length - 1){
        que__count++;
        que__numb++;
        showQuestion(que__count);
        queCounter(que__numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next__btn.style.display = "none";
        timeOff.textContent = "Time Left";
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Question comlited");
        showResultBox();
    }
}

function showQuestion(index){
    const que__text = document.querySelector(".que__text");
    let que__tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option__tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                      + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                      + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                      + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que__text.innerHTML = que__tag;
    option__list.innerHTML = option__tag;
    const option = option__list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i>❌</div>';
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i>✔️</div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que__count].answer;
    let allOptions = option__list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is not correct");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //show correct answer if u picked wrong one
        for (let i = 0; i < allOptions; i++) {
            if(option__list.children[i].textContent == correctAns){
            option__list.children[i].setAttribute("class", "option correct");
            option__list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    //after selected disabled all options
    for (let i = 0; i < allOptions; i++) {
        option__list.children[i].classList.add("disabled");
    }
    next__btn.style.display = "block";
}

function showResultBox(){
    info__box.classList.remove("activeInfo");
    quiz__box.classList.remove("activeQuiz");
    result__box.classList.add("activeResult");
    const scoreText = result__box.querySelector(".score__text");
    if(userScore > 4){
        let scoreTag = '<span>And congrats, U got  <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

    else if(userScore > 2){
        let scoreTag = '<span>And not bad, U got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

    else{
        let scoreTag = '<span>And sorry, U got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que__count].answer;
            let allOptions = option__list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option__list.children[i].textContent == correctAns){
                option__list.children[i].setAttribute("class", "option correct");
                option__list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option__list.children[i].classList.add("disabled");
            }
            next__btn.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    const bottom__ques__counter = quiz__box.querySelector(".total__que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom__ques__counter.innerHTML = totalQuesCountTag;
}
