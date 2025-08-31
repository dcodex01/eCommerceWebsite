// --------------------Countdown SCRIPT START-------------------->
let time = 3605; // 1 hour , 0 minutes , 5 seconds
let countdownElement = document.getElementById("countdown")
let timer = setInterval(function () {
    // Calculate hours , minutes , seconds
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    // Format as HH:MM:SS
    countdownElement.textContent = String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    time--;
    if (time < 0) {
        clearInterval(timer);
        countdownElement.textContent = "Time Up!";
    }
}, 1000);
// --------------------Countdown SCRIPT END-------------------->



// --------------------ANIMATION SCRIPT START-------------------->
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            console.log(entry.target);
            entry.target.classList.add("show")
        }else{
            entry.target.classList.remove("show")
        }
    })
})

const todoelements = document.querySelectorAll(".todo")
todoelements.forEach(el => observer.observe(el))
// --------------------ANIMATION SCRIPT END-------------------->