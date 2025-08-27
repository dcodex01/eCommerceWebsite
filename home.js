let time = 1000
let countdownElement = document.getElementById("countdown")
let timer = setInterval(function(){
    countdownElement.textContent = time;
    time--
    if(time<0){
        clearInterval(timer)
        countdownElement.textContent = "Time's Up!"
    }
} , 1000)