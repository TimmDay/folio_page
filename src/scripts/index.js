//Running jquery-1.12.3.min.js

// BUTTONS

// EXPERIENCE button to toggle exp table reveal (and turn off other one)
$(document).ready(function(){
    $('#btn-exp').click(function(){
        $('#work-exp-tab').toggleClass('hidden');
        $('#edu-summ-tab').addClass('hidden');
        $('#btn-exp').toggleClass('current-resume');
        $('#btn-edu').removeClass('current-resume');

    });
});

// EDUCATION button to toggle edu table reveal (and turn off other one)
$(document).ready(function(){
    $('#btn-edu').click(function(){
        $('#edu-summ-tab').toggleClass('hidden');
        $('#work-exp-tab').addClass('hidden');
        $('#btn-edu').toggleClass('current-resume');
        $('#btn-exp').removeClass('current-resume');

    });
});


// ABOUT 

//party mode - click

var pulseLoop = null;
var partyBackground = null; 
//if you declare these within the functions, you won't get able to get to them outside of the functions to turn them off 

$('#party').click(function() { 
    
    $('#party').addClass('hidden');  //change button access
    $('#business').removeClass('hidden');

    
    
    //loop through imgs in the #about-img div
    var i = 0;
    pulseLoop = setInterval(function() {


        $('#about-img').children().eq(i).addClass('hidden');   //hide current photo
        i++;    //go to next photo
        $('#about-img').children().eq(i).removeClass('hidden'); //reveal next photo

        if (i == 6) {
            i = 0;
            $('#about-img').children().eq(i).removeClass('hidden');
        }

    }, 500); //time between img change
                
              
   // background color loop
    partyBackground = setInterval(function() {
        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);
        var randomRGB = 'rgb('+red+','+green+','+blue+')';
        $("#about").css("background-color",randomRGB);
    },250) 
});

//business time button clicked - change everything back

$('#business').click(function() {
    
    window.clearInterval(pulseLoop);
    window.clearInterval(partyBackground); //end the loops
    
    $('#party').removeClass('hidden'); 
    $('#business').addClass('hidden'); //swap buttons back
    
    $("#about").css("background-color","#fff"); // return original background color
});



//GALLERY FILTER

//DUCKETT based - creates it's own buttons
(function () {
    var $imgs = $('.wrapper-gallery .img-square'); //store all folio items
    var $buttons = $('#buttons'); // store buttons element - REMOVE FOR CHECKBOX INSTEAD?
    
    var tagged = {}; //create object for matched tagged img items to go into

    $imgs.each(function() {              //loop through folio items
        var img = this;                  //store this gallery item in var for pushing later
        var tags = $(this).data('tags'); //get the tags for this gallery item, assign to var tags

        if (tags) { //if gallery item has tags
            tags.split(',').forEach(function(tagName) { //split at comma
                if(tagged[tagName] == null) { //if tagged object doesn't have this tag..
                    tagged[tagName] = []; //assign an empty array to the object
                }                tagged[tagName].push(img); //add the image to the array if match found.
            });
        }
    });
    
    $.each(tagged, function(tagName) {
        $('<button/>', {
            text: tagName,
            class: 'not-current',
            click: function() {
                $(this) .addClass('current').removeClass('not-current') .siblings().removeClass('current').addClass('not-current');
                
                $imgs.hide() .filter(tagged[tagName]).show();
            }
        }).appendTo($buttons);
    });
    
    $('<button/>', {
        text: 'Show All',
        class: 'current',
        click: function() {
            $(this)     .addClass('current').removeClass('not-current')
            .siblings() .removeClass('current').addClass('not-current');
            $imgs.show();
        }
    }).appendTo($buttons);
}());
// End FOLIO FILTER



//FOR TOUCH SCREENS - toggle touchscreen behaviour in gallery
$(function(){
    //is this a touchscreen device?
    if ('ontouchstart' in window) {
        //set touchscreen body class
        $('body').removeClass('no-touch').addClass('touch');
        //add touch toggle so text shows when tapped
        $('div.inner-square img').click(function(){ //listener for taps on photos
            $(this).closest('.inner-square').toggleClass('touchFocus');
            //for this area of tapping, take the class cloest to inner-square and toggle .touchFocus. starts off (title-box hidden). defined in css.
        })
    }
});


//FOOTER --- game of throne quote machine. hard code it, for data structures practice
