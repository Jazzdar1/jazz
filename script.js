document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');

    // Initialize DPlayer with support for MPD and M3U8
    const dp = new DPlayer({
        container: videoPlayer,
        video: {
            url: 'your_initial_video_url_here', // Set the initial stream URL here (MPD/M3U8)
            type: 'auto' // DPlayer will auto-detect the format
        }
    });

    // Function to load the EPG
    function loadEPG(epgUrl) {
        fetch(epgUrl)
            .then(response => response.text())
            .then(data => {
                const epgContainer = document.getElementById('epg');
                epgContainer.innerHTML = data; // Assuming EPG is in HTML or XML format
                epgContainer.style.display = 'block';
            })
            .catch(error => console.error('Error loading EPG:', error));
    }

    // Example usage: Load EPG from a URL
    loadEPG('your_epg_url_here.xml');

    // Function to change video source dynamically
    function changeSource(url, type = 'auto') {
        dp.switchVideo({ url, type });
        dp.play();
    }

    // Example usage: Change to a new MPD stream
    // changeSource('new_stream_url.mpd', 'dash');
});

// ClearKey DRM integration
document.getElementById('videoPlayer').addEventListener('encrypted', (event) => {
    const keySystem = 'org.w3.clearkey';
    const initDataType = event.initDataType;
    const initData = event.initData;

    const keySession = videoPlayer.mediaKeys.createSession();
    keySession.addEventListener('message', async (event) => {
        const license = await fetchLicense(event.message);
        keySession.update(license);
    });

    keySession.generateRequest(initDataType, initData);
});

async function fetchLicense(message) {
    // This function should communicate with your license server
    // Example: return fetch('/api/license', { method: 'POST', body: message }).then(res => res.arrayBuffer());
}
