document.getElementById("saveButton").addEventListener("click", function () {
    debugger;
    const myApiKey = document.getElementById("apiKey").value;
    chrome.storage.sync.set({ apiKey: myApiKey }, function () {
        console.log("API Key saved");
        window.close();
    });
});
