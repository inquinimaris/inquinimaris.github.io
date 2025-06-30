$(()=>{
    function weDoALittleUnfolding(e){
        let thatButton = $(this);
        let thatList = thatButton.next();
        if(!thatButton.hasClass('active')){
            $(e.delegateTarget).find('.wdalu.active').each(function(_, element){
                let anotherList = $(element).next();
                anotherList.slideToggle(300, "swing");
                if(anotherList.hasClass('open')){
                    anotherList.removeClass('open');
                }
                $(element).removeClass('active');
            });
        }
        if(!thatButton.attr('disabled')){
            thatList.slideToggle(300, "swing", function(){
                thatButton.prop('disabled', false);
                if(thatList.hasClass('open')){
                    thatList.removeClass('open');
                } else{
                    thatList.addClass('open');
                }
            });
        }
        thatButton.toggleClass('active').prop('disabled', true);
    }
});