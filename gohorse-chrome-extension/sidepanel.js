var currentContext;
var apiKey;
var myModel;
const endpoint = "https://api.openai.com/v1/chat/completions";

chrome.storage.sync.get("apiKey", function (data) {
    apiKey = data.apiKey;
});
chrome.storage.sync.get("model", function (data) {
    myModel = data.model;
});

chrome.storage.local.get("context", (result) => {
    currentContext = result.context;
    var message = "Provide a quick information about the context.";
    message +=
        "After that break a line and return javascript array of strings with 5 common doubts a user might have to this context. ";
    message +=
        "\n Skip from the information to array without any context, don't use 'Here are the common doubts' or similar intro.";
    callChatGPT(currentContext, message, true);
});

var globalInstructions =
    "You are a Sitecore XP/XM/XM Cloud and you will provide useful answers. ";
globalInstructions += "Always direct to the user in 1st person.";
globalInstructions +=
    "Be assertive, don't say things like 'based on the content or url provided', or 'it seems'. ";
globalInstructions += "Be direct, don't start with 'Sure' or 'Of course'. ";
globalInstructions +=
    "Don't use superlatives or adjectives, such as 'powerful'. ";

function callChatGPT(context, message, firstLoad) {
    alert("context: " + context + " - message: " + message);

    createLoader();

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };

    var systemMessage = globalInstructions;
    systemMessage += "User context: " + context;

    const requestData = {
        model: myModel,
        messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: message },
        ],
        max_tokens: 1000,
    };

    fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
    })
        .then((response) => {
            if (response.status === 429) {
                // Implement exponential backoff and retry logic
                console.warn("Too Many Requests. Retrying after delay...");
                return new Promise((resolve) => setTimeout(resolve, 5000)).then(
                    () => callChatGPT(context)
                );
            } else {
                var x = response.json();
                return x;
            }
        })
        .then((data) => {
            // Remove loader
            document.getElementById("loader-container").remove();

            // Add message to screen
            var container = document.getElementById("content");
            var fullReturn = data.choices[0].message.content;
            const startIndex = fullReturn.indexOf("[");
            const endIndex = fullReturn.indexOf("]", startIndex);
            const responseDiv = document.createElement("div");

            if (firstLoad) {
                // On first load, take the questions
                var messagePart = fullReturn.substring(0, startIndex);
                responseDiv.innerHTML = messagePart.replace(/\n/g, "<br/>");
            } else {
                responseDiv.innerHTML = fullReturn.replace(/\n/g, "<br/>");
            }

            container.appendChild(responseDiv);
            container.appendChild(document.createElement("hr"));

            if (firstLoad) {
                // Add links with questions
                var questionsPart = fullReturn.substring(
                    startIndex,
                    endIndex + 1
                );
                const questions = JSON.parse(questionsPart);
                const list = document.createElement("ul");
                const h3 = document.createElement("h3");
                h3.innerText = "Common doubts:";

                questions.forEach((str) => {
                    const listItem = document.createElement("li");
                    const anchor = document.createElement("a");
                    anchor.href = "#";
                    anchor.className = "doubt-link";
                    anchor.textContent = str;
                    listItem.appendChild(anchor);
                    list.appendChild(listItem);
                });

                container.appendChild(h3);
                container.appendChild(list);
                container.appendChild(document.createElement("hr"));
            }

            container.scrollTop = container.scrollHeight;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Manage anchor clicks to answer doubts
document.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".doubt-link")) {
        var question = event.target.innerText;
        callChatGPT(currentContext, question, false);
    }
});

function createLoader() {
    // Create the container div
    var loaderContainer = document.createElement("div");
    loaderContainer.id = "loader-container";

    // Create the image element
    var loaderImage = document.createElement("img");
    loaderImage.src = "images/loader.gif";
    loaderImage.alt = "loader";
    loaderImage.id = "loader";

    // Append the image to the container
    loaderContainer.appendChild(loaderImage);

    // Append the container to the body or another specific element
    var container = document.getElementById("content");
    container.appendChild(loaderContainer);
    container.scrollTop = container.scrollHeight;
}

// Send question from textbox
document.getElementById("submit-button").addEventListener("click", () => {
    var questionBox = document.getElementById("question");
    var question = questionBox.value;
    questionBox.value = "";
    callChatGPT(currentContext, question, false);
});
