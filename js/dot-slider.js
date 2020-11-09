let currentPosition = 0;
let userOut = true;
let autoMovingIntervalIds = [];
let sliderActive = false;
let movingIntervalIds = [];

let slider = $('.wrapper').eq(0);
let dots = $('.dots li');

//event listener for every dot in the slider
dots.click(function() {
    if (!sliderActive) {
        clearAutoMovingIntervalIds();
        sliderActive = true;
        setTimeout(function () {
            sliderActive = false;
            startSlider();
            }, 500);
        let activeDot = $('.active');
        if (this !== activeDot[0]) {
            let distance = +activeDot.text() - +this.innerText;
            moveTo(distance);
            updateActiveDot(this, activeDot);
        }
    }
});

//move wrapper box for showing next (or previous) slide
function moveTo(distance) {
    let slideWidth = $('.dot-slider img').width();
    let step = 5 * distance;
    let length = currentPosition + slideWidth * distance;
    movingIntervalIds.push(setInterval(function () {
        currentPosition += step;
        // slider.css('transform', 'translateX(' + currentPosition + 'px)');
        // slider.css('-o-transform', 'translateX(' + currentPosition + 'px)');
        // slider.css('-ms-transform', 'translateX(' + currentPosition + 'px)');
        // slider.css('-moz-transform', 'translateX(' + currentPosition + 'px)');
        // slider.css('-webkit-transform', 'translateX(' + currentPosition + 'px)');
        shift(slider, currentPosition);
        if (currentPosition === length) {
            console.log(currentPosition);
            console.log(length);
            clearAutoMovingIntervalIds();
        }
        if (currentPosition <= -5 * slideWidth) {
            currentPosition = 0;
        }

    }, 5));
}

function clearAutoMovingIntervalIds() {
    for (let i = 0; i < movingIntervalIds.length; i++) {
        clearInterval(movingIntervalIds[i]);
    }
}

//activate next dot or first if the slider has reached the end
function updateActiveDot(newDot, oldDot) {
    if (newDot === undefined) {
        oldDot.toggleClass('active');
        dots.eq(0).toggleClass('active');
    } else {
        oldDot.toggleClass('active');
        dots.eq(newDot.innerText).toggleClass('active');
    }
}

//move to next slide
function autoMoving() {
    if (!sliderActive){
            sliderActive = true;
        setTimeout(function() {
            sliderActive = false;
        }, 500);
        moveTo(-1);
        let activeDot = $('.active');
        updateActiveDot(
            dots[+activeDot.text() + 1],
            activeDot
        )
    }
}
let userNotOnPage;
//user leave from the page -> stop slider! (debug)
setInterval(function(){
    userNotOnPage = !$('body:hover').length;
    if(userOut !== userNotOnPage){
        userOut = userNotOnPage;
        if (userOut) {
            for (let i = 0; i < autoMovingIntervalIds.length; i++) {
                clearInterval(autoMovingIntervalIds[i]);
            }
        }
        else {
            startSlider();
        }
    }
}, 10);

//start auto move slides
function startSlider() {
    if (autoMovingIntervalIds.length === 0) {
        autoMovingIntervalIds.push(setInterval(autoMoving, 3000));
    }
}

function shift(element, len) {
    element.css('transform', 'translateX(' + len + 'px)');
    element.css('-o-transform', 'translateX(' + len + 'px)');
    element.css('-ms-transform', 'translateX(' + len + 'px)');
    element.css('-moz-transform', 'translateX(' + len + 'px)');
    element.css('-webkit-transform', 'translateX(' + len + 'px)');
}

startSlider();