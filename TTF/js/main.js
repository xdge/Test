/**
 * @author: Ge Xiaodong
 * Date: 19/1/9
 * The interactive part is referenced from  https://blog.csdn.net/m0_37729058/article/details/79485302?utm_source=blogxgwz4
 */

$(function (){
    //格式转换
    $("#doBtn").click(function() {
        var txt = "";  
        txt = document.getElementById("source").value;
        for (var i=0;i<txt.length;i++)
        {
            if(txt.indexOf("\n"))
            txt = txt.replace("\n"," ");
            
        }
        document.getElementById("source").value = txt; 
    });
    //输出
    $("#goBtn").click(function() {
        var win = document.getElementById("source").value;
        if (win) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: win }, function (response) {
                    console.log(response);
                });
            }); 
        }
    });
    //转换格式并输出
    $("#dogoBtn").click(function() {
        var txt = "";  
        txt = document.getElementById("source").value;
        for (var i=0;i<txt.length;i++)
        {
            if(txt.indexOf("\n"))
            txt = txt.replace("\n"," ");     
        }
        document.getElementById("source").value = txt; 
        if (txt) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: txt }, function (response) {
                    console.log(response);
                });
            }); 
        }
    })

});
