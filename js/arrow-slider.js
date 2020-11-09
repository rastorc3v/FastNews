let startShift = $('.arrow-slider img').width() + parseInt($('.arrow-slider .post-m').css('margin-right').slice(0, 2));

let arrowSlider = $('.wrapper').eq(1);
let arrowSliderActive = false;
let currPosition = -startShift;
let rightBorder = 0;
let leftBorder = -360;

shift(arrowSlider, -startShift);

function moveSlide(direction) {
    if (!arrowSliderActive) {
        arrowSliderActive = true;
        setTimeout(function() {
            arrowSliderActive = false;
            checkBorders();
            }, 1500);

        let arrowSliderIntervalId = setInterval(function () {
            currPosition += direction;
            shift(arrowSlider, currPosition);
            if (Math.abs(currPosition % startShift) === 0) {
                clearInterval(arrowSliderIntervalId);
            }
        }, 5);
    }
}

function checkBorders() {
    if (currPosition <= leftBorder) {
        formatNews('right');
        leftBorder -= startShift;
    }
    if (currPosition >= rightBorder) {
        formatNews('left');
    }
}

//TODO: add ajax request to API server to get featured news

// For example using random images
function formatNews(place) {
    let article = $('<article></article>').addClass('post-m');
    let img = $('<img src="" alt="" />');
    article.append(img);
    httpGet().then(response => {
        img.attr('src', response);
    }, error => {
        img.attr('src', error);
    });
    article.append($('<h4></h4>').text('Prince William And Kate Middleto.'));
    article.append($('<time></time>').text('— November 5, 2013'));
    article.append($('<p></p>').text('Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,'));
    if (place === 'right') {
        arrowSlider.append(article);
    } else {
        arrowSlider.prepend(article);
        shift(arrowSlider, -startShift);
        currPosition -= startShift;
    }
}

function httpGet() {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', "https://source.unsplash.com/random", true);
        xhttp.onload = function() {
            if (this.status === 200) {
                resolve(this.responseURL);
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhttp.onerror = function() {
            reject(new Error("../icons/sad404.jpg"));
        };
        xhttp.send();
    });
}

