chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.storage.sync.get("apiKey", function (data) {
            if (!data.apiKey) {
                // If the API Key has not been set, open the apiKey.html in a new tab
                chrome.tabs.create({
                    url: chrome.runtime.getURL("options.html"),
                });
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "openSidePanel" && sender.tab) {
        chrome.storage.local.set({
            context: request.context,
        });

        chrome.sidePanel.setOptions({
            tabId: sender.tab.id,
            path: "sidepanel.html",
            enabled: true,
        });
        chrome.sidePanel.open({ tabId: sender.tab.id });
    }
});

chrome.action.onClicked.addListener(function (tab) {
    var isSitecoreWebsite = tab.url && tab.url.includes("sitecorecloud.io");

    if (isSitecoreWebsite) {
        chrome.tabs.sendMessage(tab.id, {
            message: "actionClickedInSitecore",
            options: {}
        });
    }
    else {
        console.log("Extension doesn't work in this context");
    }
});
