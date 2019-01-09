//Google API，将转换格式后的文字push到谷歌翻译界面的textarea中
chrome.extension.onMessage.addListener(  
     function (request, sender, sendResponse) {
         if (request.action === "paste") {
            var ctrl = $("#source"); 
          // var ctrl = document.getElementsByTagName("textarea")[0];  
          //ctrl.innerText = request.data;   
            ctrl.val(request.data);
            sendResponse("OK");
        }
    }
);