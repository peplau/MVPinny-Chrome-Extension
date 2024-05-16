/*
------------------------------------------------------
Pre-populate fields if settings are already configured
------------------------------------------------------
*/
window.onload = (event) => {
    var dropdown = document.getElementById("model");
    models.forEach(function (model) {
        var option = document.createElement("option");
        option.value = model.Key;
        option.textContent = model.Text;
        dropdown.appendChild(option);
    });

    chrome.storage.sync.get("apiKey", function (data) {
        if (data.apiKey) document.getElementById("apiKey").value = data.apiKey;
    });
    chrome.storage.sync.get("model", function (data) {
        if (data.model) document.getElementById("model").value = data.model;
    });
};

/*
------------------------
Save settings to storage
------------------------ 
*/
document.getElementById("saveButton").addEventListener("click", function () {
    var selectElement = document.getElementById("model");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    const myModel = selectedOption.value;
    const myApiKey = document.getElementById("apiKey").value;

    chrome.storage.sync.set({ apiKey: myApiKey, model: myModel }, function () {
        window.close();
    });
});
