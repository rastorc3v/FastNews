let menu = $('#dropdown');
let menuitem = $('a[tabindex]');
let dropMenuItem = menuitem.clone();
dropMenuItem.appendTo(menu);
//
// let dropdownHeight = $('nav ul').height()

$('#menu-button').click(function() {
    let ul = $('nav');
    let height = ul.height();
    let dropdownHeight = height + menu.height();
    let step = menu.height()/100;
    if (height <= 70) {
        dropMenuItem.css('visibility', 'visible');
        let dropdownIntervalId = setInterval(function () {
            height += step;
            ul.height(height);
            if (dropdownHeight <= height) {
                clearInterval(dropdownIntervalId);
            }
        }, 1);
    } else if (height <= dropdownHeight) {
        dropMenuItem.css('visibility', 'hidden');
        let dropdownIntervalId = setInterval(function () {
            ul.height(height);
            if (height <= 60) {
                clearInterval(dropdownIntervalId);
            }
            height -= step;
        }, 1);
    }
});

menuitem.eq(5)[0].onkeydown = e => {
    if (e.keyCode === 13) showLoginForm();
};

let cross = $('.lnr-cross');

$(document)[0].onkeydown = e => {
    if (e.keyCode === 27) hideLoginForm();
};


function showLoginForm() {
    $('#loginForm').fadeIn(700, "swing");
    cross[0].onkeydown = e => {
        if (e.keyCode === 13) hideLoginForm();
    };
    cross.attr('tabindex', '7');
}

function hideLoginForm() {
    $('#loginForm').fadeOut(700, "swing");
    cross[0].onkeydown = null;
    cross.attr('tabindex', '-1');
}

// $('body').click(function (event) {
//     hideLoginForm();
//
// });

$(window).resize(function() {
    startShift = $('.arrow-slider img').width() + parseInt($('.arrow-slider .post-m').css('margin-right').slice(0, 2));
    shift(arrowSlider, -startShift);
    shift($('.wrapper').eq(0), 0);
    updateActiveDot(undefined, $('.active'));
    currentPosition = 0;
});

$('select').change(function () {
    window.location.href=this.value;
});