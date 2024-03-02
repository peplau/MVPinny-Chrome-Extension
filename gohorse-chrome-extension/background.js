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
        options: {},
    });
});

/*
Disable extension for non-Sitecore pages
*/
function updateIconBasedOnUrl(tabId, changeInfo, tab) {
    // Define your URL patterns here
    const urlPatterns = [
        "*://*/*/sitecore/*",
        "*://*/sitecore/*",
        "*://*.sitecorecloud.io/*",
    ];

    // Check if the URL matches any of your patterns
    const matchesPattern = urlPatterns.some((pattern) =>
        new RegExp(pattern.replace(/\*/g, ".*").replace(/\//g, "\\/")).test(
            tab.url
        )
    );

    if (matchesPattern) {
        // Enable the extension icon if the URL matches
        chrome.action.enable(tabId);
    } else {
        // Disable the extension icon if the URL does not match
        chrome.action.disable(tabId);
    }
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Ensure we only update icon state for tabs with a complete status to avoid unnecessary calls
    if (changeInfo.status === "complete") {
        updateIconBasedOnUrl(tabId, changeInfo, tab);
    }
});

// Update icon state when tabs are activated (switched)
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        updateIconBasedOnUrl(tab.id, {}, tab);
    });
});
