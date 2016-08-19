/* 
 * 
 */

$(document).on("pagecreate", "#localstorage", function(){
    
});

$('#gBtn').unbind('click').click(function(){
    var name = $('#mTxtBoxName').val();
    if(!name){
        $('#lblWarning').show();
    }else{
        localStorage.setItem("pName", name);
        window.location.replace("Game.html");
    }
});