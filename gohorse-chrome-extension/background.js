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

        chrome.sidePanel.open({ tabId: sender.tab.id },
            () => {
                chrome.runtime.sendMessage({
                    message: "openGtpSidePanel"
                })
            }
        );
    }
});

chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, {
        message: "actionClickedInSitecore",
        options: {}
    });
});
