$(function () {

    //comment logic
    comments = []
    saveComments()
    document.getElementById('btn').addEventListener('click', function () {
        event.preventDefault();
        let userName=document.getElementById('userName').value
        let commentText = document.getElementById('commentText').value

        let comment = {
            userName: userName,
            commentText:commentText
        }
        if (userName.length && commentText.length > 0) {
            comments.push(comment)
            userName.value = ''
            commentText.value=''   
        }
        showComments()
    })

    function saveComments() {
        if(localStorage.getItem('comments')) comments=JSON.parse(localStorage.getItem('comments')) 
        showComments()
    }
    
    function showComments() {
        let commentPosts = document.getElementById('commentPosts'),       
            out = ""
        comments.map((item) => {
            out += `<h4>${item.userName}</h4>`
            out+=`<p>${item.commentText}</p>`
        })
        commentPosts.innerHTML=out
    }
    


    //animation
    window.addEventListener('scroll', loop)
    var scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
    var elementsToShow = document.querySelectorAll('.show-on-scroll')
    
    // viewport in browser
    function isElementInViewport(el) {
        if (typeof jQuery == "function" && el instanceof jQuery) {
            el=el[0]
        }
        var rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0
                && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
             (rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        )
    }

    const callback = function(entries) {
        entries.forEach(entry => {
            entry.target.classList.toggle("is-visible");
            });
        };

        const observer = new IntersectionObserver(callback);

        const targets = document.querySelectorAll(".show-on-scroll");
        targets.forEach(function(target) {
            observer.observe(target);
        });
    
    function loop() {

         elementsToShow.forEach(function (element) {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            } else {
                element.classList.remove('is-visible');
        }
    });
    scroll(loop)
}




//header
    var header=$("#header"),
        scroll=0

    $(window).on('scroll',function(){
        scroll=$(this).scrollTop()
        if(scroll>=100){
            header.addClass("active")
        }else{
            header.removeClass("active")
        }
    })

    //menu
    var menu=document.querySelector(".menu")
    if(menu){
        var nav=document.querySelector(".nav")
        menu.addEventListener("click",function(e){
            nav.classList.toggle("nav_active")
    })
}

    $("[data-scroll]").on('click',function(event){
        event.preventDefault()
        var blockId=$(this).data('scroll'),
            blockOffset=$(blockId).offset().top;
        
        $("html,body").animate({
            scrollTop:blockOffset
        },700)
    })
})