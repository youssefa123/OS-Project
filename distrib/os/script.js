// Function to add a new message to the console
function addConsoleMessage(message) {
    const consoleContainer = document.getElementById('divConsole');
    // Add the new message to the console
    // ...
    // Adjust container height to fit content
    consoleContainer.style.height = consoleContainer.scrollHeight + 'px';
    // Scroll to the bottom
    consoleContainer.scrollTop = consoleContainer.scrollHeight;
}
//# sourceMappingURL=script.js.map