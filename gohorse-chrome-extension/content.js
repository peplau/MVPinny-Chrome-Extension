chrome.runtime.onMessage.addListener((data, sender) => {
    if (data.message === "actionClickedInSitecore")
        toggleHover();
});

/* 
-------------
CLICK HANDLER 
-------------
*/

document.addEventListener(
    "click",
    function (event) {
        if (!isHoverFeatureActive) return; // Check if feature is activated

        // Prevent default action
        event.preventDefault();

        // Capture the clicked element
        var clickedElement = event.target;

        // Alert the outer HTML of the clicked element
        forceRemoveOverlay(event);
        toggleHover(event);

        // Send message to background script to open side panel
        chrome.runtime.sendMessage({
            action: "openSidePanel",
            context: getContext(clickedElement),
        });
    },
    true
);

function getContext(element) {
    // Get URL
    var context = "URL: " + document.location.href;

    // Get clicked element text
    var text = element.outerText || element.textContent;
    context += "\nSelected Element: " + text;

    // Content Editor - Check if its part of a ribbon
    var myRibbon = element.closest(".scRibbonToolbar");
    if (myRibbon !== null) {
        var activeRibbon = document.getElementsByClassName(
            "scRibbonNavigatorButtonsActive"
        );
        context += "\nActive Ribbon: " + activeRibbon[0].outerText;
    }

    return context;
}

/* 
------------------------
ENABLE/DISABLE SELECTION
------------------------
*/
let isHoverFeatureActive = false;

// Function to toggle hover feature activation
function toggleHoverOnShortcut(event) {
    // Check if CTRL+SHIFT+H is pressed
    if (event.ctrlKey && event.shiftKey && event.key === "H")
        toggleHover(event);
}

function toggleHover() {
    // Toggle the activation state
    isHoverFeatureActive = !isHoverFeatureActive;

    // Change the cursor style based on the feature state
    if (isHoverFeatureActive)
        alert("Select the element you want to learn more");
}

console.log('Adding chrome.action.onClicked.addListener');

// Listen for keydown events on the entire document
// document.addEventListener("keydown", toggleHoverOnShortcut, false);

/* 
---------------------------
SHOW/HIDE SELECTION OVERLAY
---------------------------
*/
// Function to create and show overlay
function showOverlay(event) {
    if (!isHoverFeatureActive) return; // Check if feature is activated

    // Prevent creating overlay for the body or html to avoid full-page overlay
    if (
        event.target === document.body ||
        event.target === document.documentElement
    ) {
        return;
    }

    const overlay = document.createElement("div");
    const rect = event.target.getBoundingClientRect(); // Get the size and position of the target element

    // Style the overlay to match the target element
    overlay.style.position = "fixed";
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    overlay.style.backgroundColor = "yellow";
    overlay.style.opacity = "0.5";
    overlay.style.pointerEvents = "none"; // Allows clicking through the overlay
    overlay.style.zIndex = "10000"; // Ensure the overlay is on top

    // Set an identifier for the overlay to remove it later
    overlay.setAttribute("id", "custom-hover-overlay");

    // Add the overlay to the body
    document.body.appendChild(overlay);
}

// Function to remove the overlay
function removeOverlay(event) {
    if (!isHoverFeatureActive) return; // Check if feature is activated
    forceRemoveOverlay(event);
}
function forceRemoveOverlay(event) {
    const overlay = document.getElementById("custom-hover-overlay");
    if (overlay) overlay.remove();
}

// Modify existing event listeners to be added or removed based on feature state
document.addEventListener("mouseover", showOverlay, true);
document.addEventListener("mouseout", removeOverlay, true);