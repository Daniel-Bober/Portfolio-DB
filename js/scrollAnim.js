gsap.registerPlugin(ScrollTrigger);

const body = document.querySelector(('body'));
let isScrollAnimPlaying

const backToTopButton = document.querySelector('.back-to-top');

backToTopButton.addEventListener('click', ()=> {
   goToSection(0) ;
});

function goToSection(i, anim) {
    if(!isScrollAnimPlaying) {
        body.classList.add("scroll-off");
        isScrollAnimPlaying = true;

        gsap.timeline({defaults:{duration: 1.2}, onComplete: removeScrollOff})
            .to(window, {
                scrollTo: {y: i*innerHeight, autoKill: false},
                ease: "power3.out"
            })
            .to({}, 0.01, {});

        if(anim) {
            anim.restart();
        }
    }
}

function removeScrollOff() {
    body.classList.remove('scroll-off');
    isScrollAnimPlaying = false;
}

gsap.utils.toArray(".page").forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        onEnter: () => {
            goToSection(i)
            enterSectionSwitch(i)
        }
    });

    ScrollTrigger.create({
        trigger: panel,
        start: "bottom bottom",
        onEnterBack: () => {
            goToSection(i)
            hideBackButton(i)
        },
    });
});

ScrollTrigger.create({
   trigger: '.game-dev-left',
    start: 'top top',
    pin: true
});

ScrollTrigger.create({
    trigger: '.front-end-left',
    start: 'top top',
    pin: true
});


function enterSectionSwitch(i) {
    switch(i) {
        case 1:
            scrollEnterAnimation('.mission-mars .info');
            scrollEnterAnimation('.mission-mars .txt', 0.2, 50);
            scrollEnterAnimation('.game-dev-left h2', 0.4, -50);
            showBackButton()
            break;
        case 2:
            scrollOutAnimation('.mission-mars .info');
            scrollOutAnimation('.mission-mars .txt');

            scrollEnterAnimation('.squared .info', 0.2, -220);
            scrollEnterAnimation('.mission-mars .txt', 0.3, -320);
            break;
        case 3:
            scrollOutAnimation('.squared .info');
            scrollOutAnimation('.squared .txt');
            scrollOutAnimation('.game-dev-left h2');

            scrollEnterAnimation('.front-end-left h2', 0.5, -50);
            scrollEnterAnimation('.travel-diary .info')
            scrollEnterAnimation('.travel-diary-images', 0.5, 50);

            break;
        case 4:
            // scrollOutAnimation('.workflow-app .info');
            scrollOutAnimation('.travel-diary .info');
            scrollOutAnimation('.travel-diary-images');

            scrollEnterAnimation('.workflow-app .info', 0.2, 50);
            break;
    }
}

function scrollEnterAnimation(element, delay, y = -400) {
    gsap.from(element, {y: y, opacity:0, delay: delay})
}

function scrollOutAnimation(element, delay, y = 300) {
    gsap.to(element, {duration:0.2, y: y, opacity:0, delay:delay})
    gsap.set(element, {y:0, opacity:1, delay: 1.15})
}

function showBackButton() {
    backToTopButton.classList.remove('hidden');
}

function hideBackButton(section) {
    if(section === 0){
        backToTopButton.classList.add('hidden')
    }
}