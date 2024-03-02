document.getElementById("saveButton").addEventListener("click", function () {
    var selectElement = document.getElementById("model");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    const myModel = selectedOption.value;
    const myApiKey = document.getElementById("apiKey").value;

    chrome.storage.sync.set({ apiKey: myApiKey, model: myModel }, function () {
        window.close();
    });
});
