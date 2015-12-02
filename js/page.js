/*---------------------------
  Preload
 ---------------------------*/
// var imgUrl = $('#bg1').css('background-image').replace(/url\(("|')?/, '').replace(/("|')?\)/,'');
// $.get(imgUrl, function(data){
//   $('#preload').delay(2000).fadeOut(500, function(){
//     $('body').removeAttr('style');
//     $('.parallax_front').fadeIn().css('top', 0);
//   });
// }).fail(function(){
//   var msg = $(document.createElement('div')).css('display', 'none').attr('id', 'preload_error').html('Something wrong.<br>Please refresh the page');
//   $('#preload').append(msg);
//   $("#preload_error").fadeIn(500);
// });




/*---------------------------
  Get search query
 ---------------------------*/
var query = {};
(function(){
  var pair = window.location.search.substring(1).split("&");
  for(i=0; i<pair.length; i++){
    pair[i] = pair[i].split('=');
    query[pair[i][0]] = pair[i][1];
  }
})();

// get language
switch(query.lang){
  case 'en':
    lang = query.lang;
    break;
  default:
    lang = 'ch';
}




/*---------------------------
  Get and append data
 ---------------------------*/
// var data, dataGet = true;
// $.get( "./data.json", function(json) {
//   data = json;
//   $('[data-toggle="tooltip"]').tooltip();
// }).fail(function(){
//   dataGet = false;
// });

/*---------------------------
  Transition
 ---------------------------*/
(function(){
  $( window ).on('scroll', function() {
    progress = parseFloat($(document).scrollTop());
    var e = progress/$(window).height();


    if((progress*2.5)<=$(window).height())
      $('.parallax_front').css('top', -progress*1.5);
    else
      $('.parallax_front').css('top', $(window).height()*(-1.5)/2.5);

    if(progress>0){
      $('#quote').removeClass("transparent");
      $('#about').removeClass("transparent");
    }
  });

})();
/*---------------------------
  Alert
 ---------------------------*/
function github_alert(){
  alert("It's a private repository.");
}
function link_alert(){
  alert("The link is empty.");
}



/*---------------------------
  Loading
 ---------------------------*/
$(function(){
  var flag = 0;
  var start_offset = $(window).height()*2;
  $( window ).on('scroll', function() {
    if(($('#timeline').offset().top-progress+50)<start_offset && flag==0){
      flag=1;
      $.getScript('./js/jquery.timeline.min.js');
      $.getScript('./js/jquery.mCustomScrollbar.js');
      $.getScript('./js/jquery.easing.1.3.js');
      $.getScript('./js/lightbox.js');
      $.getScript('./js/timeline.js');
      $.getScript('./js/image.js');
      $.get('./timeline_extend.html', function(extend){
        $('#timeline').append(extend);
        $('#timeline_extend').click(function(){
          var a=$('#toggle').prop("checked");
          $('#extension').animate({height: 'toggle'}, 'slow');
        });
        if(dataGet == false){
          $('.timelineLoader').remove();
          $('.timelineFlat').remove();
          $('#timeline_extend').remove();
          $('#extension').show().find('.title').hide();
        }
      });
    }

    // if(($('#activity').offset().top-progress+50)<start_offset && flag==1){
    //   flag=2;
    //   $.get('./activities.html', function(data){
    //     $('#activity').append(data);
    //     imgLoader('#activity');
    //   });
    // }
  });
});

// function imgLoader(target){
//   var total_images = $(target).find('img').length;
//   var images_loaded = 0;
//   $(target).find('img').each(function() {
//       var fakeSrc = $(this).attr('src');
//       $("<img/>").attr("src", fakeSrc).load(function() {
//           images_loaded++;
//           if (images_loaded >= total_images) {
//             $(target).find('.loader').delay(1000).fadeOut();
//             $(target).find('.loader').prev().delay(1000).fadeIn();
//           }
//       });
//   });
// }
