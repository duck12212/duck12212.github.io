$(function(){
  // get all events
  var event = data.timeline;

    // append to html
    for(i=0; i<event.length; i++){
      $('<div class="event">\
          <div class="item" data-id="' + event[i].date + '" data-description="' + event[i].title + '">\
            <a class="image_rollover_bottom con_borderImage" data-description="ZOOM IN" href="' + event[i].img + '" rel="lightbox[timeline]">\
            <img src="' + event[i].img_t + '" alt=""/>\
            </a>\
            <div class="post_date"></div>\
            <span>' + event[i].period + '<br>' + event[i].info[lang] + '</span>\
          </div>\
        </div>').appendTo('.timelineFlat');
      if(event[i].text[lang]!=''){
        $('[data-description="' + event[i].title + '"][data-id="' + event[i].date + '"]').append('<div class="read_more" data-id="' + event[i].date + '">Read more</div>');
        $('<div class="item_open" data-id="' + event[i].date + '">\
            <div class="item_open_content">\
              <div class="timeline_open_content">\
                <header>' + event[i].period + '</header>\
                <span>' + event[i].text[lang] + '</span>\
              </div>\
            </div>\
          </div>').appendTo($('[data-description="' + event[i].title + '"][data-id="' + event[i].date + '"]').parent('.event'));
      }
    }

  // light
  $('.tl2').timeline({
    openTriggerClass : '.read_more',
    startItem : $(".event").last().prev().find('.item').attr('data-id'),
    closeText : 'x',
    ajaxFailMessage: 'This ajax fail is made on purpose. You can add your own message here, just remember to escape single quotes if you\'re using them.'
  });
  $(document).ready(function(){
    var e=$(".event").last().prev(),
        click=false,
        max=$(".event").last().find('.item').attr('data-count');
    $('div.read_more').click(function(){
      click=true;
      e = $(".item_open[data-id='" + $(this).attr('data-id') + "']");
      if(!e.find('span').hasClass('mCustomScrollbar')) enroll();
      e=e.parent();
    });

    $('.item_open').find('.t_close').click(function(){
      click=false;
    });

    $('.t_left').click(function(){
      // console.log(e.prev().find('.item_open').attr('data-count'));
      if(parseInt(e.prev().find('.item_open').attr('data-count'))>=0){
        e=e.prev().find('.item_open');
        // console.log(e);
        if(click==true && !e.find('span').hasClass('mCustomScrollbar')) enroll();
        e=e.parent();
      }
    });

    $('.t_right').click(function(){
      // console.log(e.next().find('.item_open').attr('data-count'));
      if(parseInt(e.next().find('.item_open').attr('data-count'))<=max){
        e=e.next().find('.item_open');
        // console.log(e);
        if(click==true && !e.find('span').hasClass('mCustomScrollbar')) enroll();
        e=e.parent();
      }
    });

    function enroll(){
        var height = e.height()-60-e.find('h2').height();
        e.find('.timeline_open_content').children('span').css('max-height', height).mCustomScrollbar({
          autoHideScrollbar:true,
          theme:"light-thin"
        });
    }
  });
});

// display date
$(function(){
  var month={01: "Jan", 02: "Feb", 03: "Mar", 04: "Apr", 05: "May", 06: "Jun", 07: "Jul", 08: "Aug", 09: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"};
  for(var i=0; i<$('.item').length; i++){
    var date=$('.item').eq(i).attr('data-id').split('/');
    $('.item').eq(i).find("div.post_date").html(date[0]+"<span>"+month[parseInt(date[1])]+"</span>");
    var name="<h2>"+$('.item').eq(i).attr('data-description')+"</h2>";
    $('.item').eq(i).children("span").before(name);
  }
});
