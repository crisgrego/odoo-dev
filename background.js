chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if(!changeInfo || !changeInfo.status || changeInfo.status != "loading"){
            return;
        }

        chrome.storage.sync.get(["debugMode","ip", "port"], function(config){
            if(!config.ip || !config.port || !config.debugMode) return;

            debugString ="?debug";
            acualUrl = tab.url;
            host = config.ip + ":" + config.port; 

            pattern = new RegExp("^(http:\\/\\/|https:\\/\\/)((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+)\\/web(\\?debug)?#","g");
            match = null;
            count = 0;
            while((match=pattern.exec(acualUrl)) !== null){
                count++;
                if(match[2]!== host || match[6] == debugString) return;
            }

            if(count === 0) return;

            indexInsertion = acualUrl.indexOf("web#")+3;
            newUrl = acualUrl.substring(0, indexInsertion) + debugString +acualUrl.substring(indexInsertion, acualUrl.length);
            chrome.tabs.update(tab.id, {url: newUrl});
    });
  });
