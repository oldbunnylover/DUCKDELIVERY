let slideIndex = 1;
showSlides(slideIndex);

var timerID;

function showSlides(n){
    let i;
    let slides = document.getElementsByClassName('carousel-item');

    if (n > slides.length){
        slideIndex = 1
    }
    if(n < 1){
        slideIndex=slides.length
    }
    for(i=0; i< slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    timerID = setTimeout(() => showSlides(slideIndex += 1), 9000);
}

function addSlide(n){
    clearTimeout(timerID);
    showSlides(slideIndex += n);
}

function currentSlide(n){
    clearTimeout(timerID);
    showSlides(slideIndex = n);
}