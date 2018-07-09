
var scrollHeight = 0;

$(function(){

   $('.test-textarea').on('keyup', function(e) {

        var value, // 文本域中的值
            lineHeight, // 文本域中的行高
            height; // 虚拟容器的高度

        // 文本域行高
        lineHeight = $(this).css('line-height').replace(/px/g, '') * 1;
        // lineHeight = 28.8;

        value = $(this).val();
        // 回车事件
        if ( e.keyCode == 13 ) {
            // 回车转换为文本就是一个空格
            // 但是却需要多加一行

            // 将虚拟容器的高度赋值给文本域
            // $(target).css('height', height + lineHeight + 'px');

            value = value + '<br>';

        }
        
        // var newValue = getFormatCode(value, '<br>')
        $('.another-wrapper').html( value );

        // 获取虚拟容器的高度。
        height = $('.another-wrapper').innerHeight();

        // 将虚拟容器的高度赋值给文本域
        $(this).css('height', height + 'px ');
   });

});

/**
 * 清除临时虚拟存储容器中的内容。
 * @return {[type]} [description]
 */
function clearVirtualWrapper() {
    $('.another-wrapper').html('');
}

/**
 * 随着内容的增多，自适应文本域的高度。
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function autoSize(target) {

    var areaValue, // 文本域中的值
        amountOfNewlineSymbols, // 文本中换行符的个数
        lineHeight, // 文本域中的行高
        newTextareaHeight, // 文本域的新高度。
        newLineSymbolsArray = []; // 正则表达式返回的包含换行符的数组。


    // 粘贴事件。 
    $(target).on('paste', function() {
        var that = this;

        //  使用 setTimeout 函数的原因是，当粘贴之后马上获取scrollHeight的值
        // 是为变化的值，所以需要取间隔一段时间之后 scrollHeight的值（正确的值)
        setTimeout(function() {
            scrollHeight = $(that).prop('scrollHeight');
            $(that).css('height', scrollHeight + 'px');
        },50);
        

    });

    // 文本域中的值
    areaValue = $(target).val();
    // 文本域行高
    lineHeight = $(target).css('line-height').replace(/px/g, '') * 1;

    // scrollHeight = $(target).prop('scrollHeight');

    // 获取换行符数组
    newLineSymbolsArray = getMatchWrapCode(areaValue);

    /* 如果文本域中包含换行符 */
    if ( newLineSymbolsArray ) {

        // 获取换行符的个数。
        amountOfNewlineSymbols = newLineSymbolsArray.length;

        //
        newTextareaHeight = (amountOfNewlineSymbols + 1) * lineHeight + scrollHeight + 'px';

        // 设置新高度
        $(target).css('height', newTextareaHeight);

    } else { 

        // 当没有换行符号的时候
        // 将文本域的高度设置为只有一行时的高度。
        $(target).css('height', lineHeight + scrollHeight + 'px');

    }// if.


   

   


}


/**
 * 通过获取另一个容器的宽度和高度
 * 来设置文本域的大小。
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function autoSizeByAnotherWrapper(target, event) {

    var value, // 文本域中的值
        lineHeight, // 文本域中的行高
        height; // 虚拟容器的高度

    var event = event || window.Event ;

    // 文本域行高
    lineHeight = $(target).css('line-height').replace(/px/g, '') * 1;
    // lineHeight = 28.8;

    value = $(target).val();
    // 回车事件
    if ( event.keyCode == 13 ) {
        // 回车转换为文本就是一个空格
        // 但是却需要多加一行

        // 将虚拟容器的高度赋值给文本域
        // $(target).css('height', height + lineHeight + 'px');

        value = value + '<br>';

    }
    
    // var newValue = getFormatCode(value, '<br>')
    $('.another-wrapper').html( value );

    // 获取虚拟容器的高度。
    height = $('.another-wrapper').innerHeight();

    // 将虚拟容器的高度赋值给文本域
    $(target).css('height', height + 'px ');
}


/**
 * 取出 textarea 中的值， 在textarea中是可以将
 * 换行符号取出来的，只不过显示是以空格的形式显示出来的
 * 可以使用正则表达式将 ‘\r\n’ 替换为别的字符
 */
function getValue(target) {
    var areaValue = $(target).val();

    // 全局替换 '\r\n' 的正则表达式
    var wrapReg = new RegExp('<br>', 'g');

    var newAreaValue = areaValue.replace(wrapReg, '\r\n');

    $('.editable-paragraph').html( newAreaValue );
}

/**
 * 将文本域中的换行符号替换为真实的符号输出来。
 * @return {[type]} [description]
 */
function replaceValue() {

    var value = $('#test-textarea').val();

    var newAreaValue = getFormatCode(value, '\\n');

    $('.editable-paragraph').html( newAreaValue );
}


/* 
 * 根据Value格式化为带有换行、空格格式的HTML代码,
 * 将换行符替换为 '\n'. 
 *
 * \n 换行使用场景 IE9, FireFox, Chrome
 * \r\n            IE7 - IE8
 * @param strValue {String} 需要转换的值 
 * @return  {String}转换后的HTML代码 
 * @example   
 * getFormatCode("测\r\n\s试")  =>  “测<br/> 试” 
 */  
var getFormatCode=function(strValue, replaceStr){  
    return strValue.replace(/\r\n/g, replaceStr).replace(/\n/g, replaceStr).replace(/\s/g, ' ');  
}

function getMatchWrapCode(strValue) {

    var matchArray = strValue.match(/\n/g);
    return matchArray;
}


// 粘贴事件。
function pasteAutoSize(target) {
    var scrollHeight = $(target).prop('scrollHeight');
    $(target).css('height', scrollHeight + 'px');
}
/*$('#test-textarea').on('paste', function() {

   
});*/