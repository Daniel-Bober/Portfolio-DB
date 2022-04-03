const travelDiaryImages = document.querySelectorAll('.td-img');
const  travelDiaryImagesBig = document.querySelectorAll('.td-img-big')
const travelDiaryImagesBigDiv = document.querySelector('.travel-diary-images-big');
const imageButton = document.querySelector('.images-button');
const blackBg = document.querySelector('.black-bg');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let actualDiaryImage = 0;
let nextDiaryImage = 0;
let diaryAnimPlaying = false;
let isSliderOpen = false;


leftArrow.addEventListener("click", ()=>leftArrowClick());
rightArrow.addEventListener("click", ()=>rightArrowClick());
imageButton.addEventListener('click',()=> {
    openSlider();
})

blackBg.addEventListener('click', ()=> {
    closeSlide();
})

function leftArrowClick() {
    if(!diaryAnimPlaying){
        diaryAnimPlaying = true;
        nextDiaryImage--;
        if(nextDiaryImage < 0){
            nextDiaryImage = (travelDiaryImages.length - 1);
        }
        swipeLeft(travelDiaryImages[actualDiaryImage], travelDiaryImages[nextDiaryImage]);
        imageBigToggle(actualDiaryImage, nextDiaryImage);
    }
}

function rightArrowClick() {
    if(!diaryAnimPlaying){
        diaryAnimPlaying = true;
        nextDiaryImage++;
        if(nextDiaryImage > (travelDiaryImages.length - 1)){
            nextDiaryImage = 0;
        }
        swipeRight(travelDiaryImages[actualDiaryImage], travelDiaryImages[nextDiaryImage]);
        imageBigToggle(actualDiaryImage, nextDiaryImage);
    }
}

function swipeLeft(imageOut, imageIn) {
    gsap.timeline({onComplete:afterSwipeLeft})
        .set(imageIn, {x:"-100", scale: "0.88"})
        .to(imageOut, {
            duration: 0.2,
            x: "100",
            scale: "0.88",
            opacity: 0
        })
        .to(imageIn, {
            duration: 0.35,
            x: "0",
            scale: "1",
            opacity: 1
        }, 0.15)
}
function afterSwipeLeft(){
    actualDiaryImage--;
    if(actualDiaryImage < 0) {
        actualDiaryImage = (travelDiaryImages.length - 1);
    }
    diaryAnimPlaying = false;
}

function swipeRight(imageOut, imageIn) {
    gsap.timeline({onComplete:afterSwipeRight})
        .set(imageIn, {x:"100", scale: "0.88"})
        .to(imageOut, {
            duration: 0.2,
            x: "-100",
            scale: "0.88",
            opacity: 0
        })
        .to(imageIn, {
            duration: 0.35,
            x: "0",
            scale: "1",
            opacity: 1
        }, 0.15)
}
function afterSwipeRight(){
    actualDiaryImage++;
    if(actualDiaryImage > (travelDiaryImages.length - 1)) {
        actualDiaryImage = 0;
    }
    diaryAnimPlaying = false;
}

function openSlider() {
    if(!isSliderOpen){
        gsap.timeline({defaults: {duration: 0.2}, onComplete:afterOpenSlide})
            .to(blackBg, {duration:0.3, opacity:1, pointerEvents:'auto'})
            .to(travelDiaryImagesBigDiv, {scale:1, opacity:1}, 0.1)
        body.classList.add("scroll-off");
    }
}
function closeSlide() {
    if(isSliderOpen){
        gsap.timeline({defaults: {duration: 0.1}, onComplete:afterCloseSlide})
            .to(travelDiaryImagesBigDiv, {scale:0.85, opacity:0})
            .to(blackBg, {duration:0.2, opacity:0, pointerEvents:'none'})
        body.classList.remove('scroll-off');
    }
}

function afterOpenSlide() {
    isSliderOpen = true;
}
function afterCloseSlide() {
    isSliderOpen = false;
}

function imageBigToggle(actualDiaryImage, nextDiaryImage) {
    travelDiaryImagesBig[actualDiaryImage].classList.remove('active');
    travelDiaryImagesBig[nextDiaryImage].classList.add('active');
}