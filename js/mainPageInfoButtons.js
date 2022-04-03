const mainPageInfoButtons = document.querySelectorAll('.info-button');
const aboutButton = document.querySelector('#about-button');
const contactButton = document.querySelector('#contact-button');
const projectsButton = document.querySelector('#projects-button');
const resetButton = document.querySelector(('#reset-button'));
let clickedButton = null;
let clickedButtonNr = 0;
let isMainPageAnimPlaying = false;



const nameAnim = gsap.timeline({defaults: {duration: 0.45, ease: 'none'}, paused: true})
    .to('.main-page-name', {
        x: '-400',
        opacity: 0,
        stagger: 0.3,
    })

resetButton.addEventListener('click', ()=> {
    resetButtons();
});

function resetButtons(){
    if(clickedButton != null) {
        clickedButton.classList.remove('active');
        afterInAnims(clickedButtonNr);
        clickedButtonNr = 0
        clickedButton = null;
    }
}


aboutButton.addEventListener('click', ()=> {
    if(!isMainPageAnimPlaying) {
        clickedButtonNr = 1;
        isMainPageAnimPlaying = true;
        if(clickedButton != null) {
            clickedButton.classList.remove('active');
            mainPageInfoTextAnimOut('.contact-info');
        }
        else {
            gsap.to(nameAnim, {time: nameAnim.duration(), ease: 'power2.out', onComplete:afterOutAnims});
            //afterInAnims(0);
        }

        mainPageInfoButtons[0].classList.add('active');
        clickedButton = aboutButton;
    }
});


contactButton.addEventListener('click', ()=> {
    if(!isMainPageAnimPlaying) {
        clickedButtonNr = 2;
        isMainPageAnimPlaying = true;
        if(clickedButton != null) {
            clickedButton.classList.remove('active');
            mainPageInfoTextAnimOut('.about-info');
        }
        else {
            gsap.to(nameAnim, {time: nameAnim.duration(), ease: 'power2.out', onComplete:afterOutAnims});
        }

        mainPageInfoButtons[1].classList.add('active');
        clickedButton = contactButton;
    }
});

projectsButton.addEventListener('click', ()=> {
    if(!isMainPageAnimPlaying) {
        goToSection(1);
        resetButtons();
    }
});


function mainPageInfoTextAnimIn(className) {
    gsap.timeline({defaults: {duration: 0.3}, onComplete:afterAnim})
        .to(className, {
            y: 0,
            opacity: 1,
            ease:'power2.out'
        })
}

function mainPageInfoTextAnimOut(className) {
    console.log(clickedButtonNr);
    gsap.timeline({defaults: {duration: 0.3}, onComplete:afterOutAnims})
        .to(className, {
            y: 200,
            opacity: 0,
        })
        .to({},0.1,{})
        .set(className, {y: -200});
}

function afterOutAnims() {
    switch(clickedButtonNr) {
        case 1:
            mainPageInfoTextAnimIn('.about-info');
            break;
        case 2:
            mainPageInfoTextAnimIn('.contact-info');
            break;
        case 0:
            gsap.to(nameAnim, {time: 0, ease: "power2.out", overwrite: true, onComplete: afterAnim});
            break;
    }
}

function afterInAnims() {
    switch(clickedButtonNr) {
        case 1:
            mainPageInfoTextAnimOut('.about-info');
            break;
        case 2:
            mainPageInfoTextAnimOut('.contact-info');
            break;
        case 0:
            gsap.to(nameAnim, {time: nameAnim.duration(), ease: 'power2.out', onComplete:afterOutAnims});
            break;
    }
}

function afterAnim() {
    isMainPageAnimPlaying = false;
}