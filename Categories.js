document.getElementById("toggleBtn").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("collapsed");
});

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