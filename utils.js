function plusFont(){
    $('body').css('font-size', (parseInt($('body').css('font-size')) + 2).toString()+'px');
    $('html').css('font-size', (parseInt($('html').css('font-size')) + 2).toString()+'px');
}

function minusFont(){
    $('body').css('font-size', (parseInt($('body').css('font-size')) - 2).toString()+'px');
    $('html').css('font-size', (parseInt($('html').css('font-size')) - 2).toString()+'px');
}