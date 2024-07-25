document.addEventListener('DOMContentLoaded', () => {
    // Show popup with animation
    document.body.classList.remove('popup-hidden');
    document.body.classList.add('popup-visible');

    document.getElementById('openUrlButton').addEventListener('click', () => {
        const url = document.getElementById('urlInput').value;

        // Validate URL
        try {
            new URL(url);
        } catch (_) {
            alert('Invalid URL');
            return;
        }

        // Hide popup with animation before opening the URL
        document.body.classList.remove('popup-visible');
        document.body.classList.add('popup-hidden');

        setTimeout(() => {
            chrome.tabs.create({ url: url }, () => {
                // Close the popup
                window.close();
            });
        }, 300); // Match the animation duration
    });
});
