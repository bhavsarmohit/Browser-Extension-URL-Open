document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded triggered");

    // Show popup with animation
    document.body.classList.remove('popup-hidden');
    document.body.classList.add('popup-visible');

    const oldRadio = document.getElementById('old');
    const newRadio = document.getElementById('new');
    let _new = true;

    oldRadio.addEventListener('change', function () {
        if (oldRadio.checked) {
            _new = false;
            console.log('Old radio button selected');
        }
    });

    newRadio.addEventListener('change', function () {
        if (newRadio.checked) {
            _new = true;
            console.log('New radio button selected');
        }
    });

    document.getElementById('openUrlButton').addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Open URL button clicked");

        const url = document.getElementById('urlInput').value;
        const errorMessage = document.getElementById('errorMessage') || { style: {} }; // Provide a fallback in case the element is not found
        const urlField = document.getElementById('urlInput');

        // Clear previous error
        if (errorMessage) errorMessage.style.display = 'none';
        if (urlField) urlField.classList.remove('error');

        try {
            // Validate URL
            const url = new URL(url);
            console.log("URL is valid");

            if (_new) {
                console.log("New option selected");
            } else {
                console.log("Old option selected");
            }

            // Hide popup with animation before opening the URL
            document.body.classList.remove('popup-visible');
            document.body.classList.add('popup-hidden');

            setTimeout(() => {
                chrome.tabs.create({ url: url }, () => {
                    window.close();
                });
            }, 300); // Match the animation duration

        } catch (_) {
            if (urlField) urlField.classList.add('error');
            if (errorMessage) errorMessage.style.display = 'block';
            console.error("Invalid URL");
        }
    });
});
