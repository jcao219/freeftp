chrome.runtime.getBackgroundPage(function(bgPage) {

  document.getElementById('serverStart').addEventListener('click', function() {
    var addr=document.getElementById("addresses").value;
    var port=parseInt(document.getElementById("serverPort").value);
    document.querySelector("#server").className="connected";
    bgPage.startServer(addr, port);
  });
})
