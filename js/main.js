document.addEventListener("DOMContentLoaded", function (){
    $(function() {
        $('#toggle-two').bootstrapToggle({
          on: 'Debug Mode',
          off: 'Normal Mode'
        });
      })

    $("#apply").click(function(){
        chrome.storage.sync.set({ 
            "ip": $("#ip").val(),
            "port": $("#port").val() || 8069,
            "debugMode": $("#debug-mode").prop('checked')
        },function(){
            window.close();
        });
    })

    chrome.storage.sync.get(["debugMode", "ip", "port"], function(config){
           $("#ip").val(config.ip || "");
           $("#port").val(config.port || "");
           $("#debug-mode").prop('checked', config.debugMode || false).change();
    });
});
