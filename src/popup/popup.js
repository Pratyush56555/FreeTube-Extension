// FreeTube Extension - Popup Script

var currentTabUrl = null;

document.addEventListener("DOMContentLoaded", function() {

  // Load settings
  loadSettings();

  // Check current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      currentTabUrl = tabs[0].url;
      updateButtonStates(currentTabUrl);
    }
  });

  // Event listeners
  document.getElementById("ftModeEnabled").addEventListener("change", function() {
    saveSettings();
    updateModeUI();
    updateButtonStates(currentTabUrl);
  });

  document.getElementById("openVideoBtn").addEventListener("click", function() {
    openVideo(false);
  });

  document.getElementById("openVideoTimestampBtn").addEventListener("click", function() {
    openVideo(true);
  });

  document.getElementById("openChannelBtn").addEventListener("click", function() {
    openChannel();
  });

  document.getElementById("openPlaylistBtn").addEventListener("click", function() {
    openPlaylist();
  });

});

// Load settings
function loadSettings() {
  chrome.runtime.sendMessage({ action: "getSettings" }, function(response) {
    if (response && response.settings) {
      document.getElementById("ftModeEnabled").checked = response.settings.ftModeEnabled;
      updateModeUI();
      updateButtonStates(currentTabUrl);
    }
  });
}

// Save settings
function saveSettings() {
  var settings = {
    ftModeEnabled: document.getElementById("ftModeEnabled").checked
  };

  chrome.runtime.sendMessage({ action: "saveSettings", settings: settings }, function(response) {
    if (response && response.success) {
      showStatus("Settings saved!", "success");
    }
  });
}

// Update mode UI
function updateModeUI() {
  var isOn = document.getElementById("ftModeEnabled").checked;
  var statusEl = document.getElementById("ftModeStatus");
  var descEl = document.getElementById("ftModeDesc");

  if (isOn) {
    statusEl.textContent = "ON";
    statusEl.className = "ft-mode-status on";
    descEl.textContent = "🟢 All video clicks open in FreeTube";
  } else {
    statusEl.textContent = "OFF";
    statusEl.className = "ft-mode-status";
    descEl.textContent = "⚪ Videos play in browser";
  }
}

// Update button states based on URL and ftMode
function updateButtonStates(url) {
  var ftModeOn = document.getElementById("ftModeEnabled").checked;

  // Always disable all first
  document.getElementById("openVideoBtn").disabled = true;
  document.getElementById("openVideoTimestampBtn").disabled = true;
  document.getElementById("openChannelBtn").disabled = true;
  document.getElementById("openPlaylistBtn").disabled = true;

  // If FT Mode is OFF or no URL, leave all disabled
  if (!ftModeOn || !url) return;

  var isVideo = url.includes("youtube.com/watch") ||
                url.includes("youtu.be/") ||
                url.includes("youtube.com/shorts/");

  var isChannel = url.includes("youtube.com/channel/") ||
                  url.includes("youtube.com/c/") ||
                  url.includes("youtube.com/@");

  var isPlaylist = url.includes("youtube.com/playlist") ||
                   url.includes("list=");

  var isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  document.getElementById("openVideoBtn").disabled = !isVideo;
  document.getElementById("openVideoTimestampBtn").disabled = !isVideo;
  document.getElementById("openChannelBtn").disabled = !(isChannel || isVideo);
  document.getElementById("openPlaylistBtn").disabled = !isPlaylist;

  if (!isYouTube) {
    showStatus("Open a YouTube page first", "error");
  }
}

// Open video
function openVideo(withTimestamp) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];

    if (withTimestamp) {
      // Pause video and get timestamp
      chrome.tabs.sendMessage(tab.id, { action: "pauseAndGetTimestamp" }, function(response) {
        void chrome.runtime.lastError; // suppress unchecked error
        var timestamp = (response && response.timestamp) ? response.timestamp : null;
        chrome.runtime.sendMessage({
          action: "openVideo",
          url: tab.url,
          timestamp: timestamp
        });
        showStatus("Opening in FreeTube...", "success");
      });
    } else {
      chrome.runtime.sendMessage({
        action: "openVideo",
        url: tab.url,
        timestamp: null
      });
      showStatus("Opening in FreeTube...", "success");
    }
  });
}

// Open channel
function openChannel() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    // If on video page, pause then get channel URL from page
    if (url.includes("/watch") || url.includes("/shorts/")) {
      chrome.tabs.sendMessage(tab.id, { action: "pauseVideo" }, function() {
        void chrome.runtime.lastError; // suppress unchecked error
        chrome.tabs.sendMessage(tab.id, { action: "getChannelUrl" }, function(response) {
          void chrome.runtime.lastError; // suppress unchecked error
          if (response && response.channelUrl) {
            chrome.runtime.sendMessage({
              action: "openChannel",
              url: response.channelUrl
            });
            showStatus("Opening channel in FreeTube...", "success");
          } else {
            showStatus("Could not find channel", "error");
          }
        });
      });
    } else {
      // Already on channel page — no content script message needed
      chrome.runtime.sendMessage({
        action: "openChannel",
        url: url
      });
      showStatus("Opening channel in FreeTube...", "success");
    }
  });
}

// Open playlist
function openPlaylist() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];

    // Pause video first
    chrome.tabs.sendMessage(tab.id, { action: "pauseVideo" }, function() {
      void chrome.runtime.lastError; // suppress unchecked error
      chrome.runtime.sendMessage({
        action: "openPlaylist",
        url: tab.url
      });
      showStatus("Opening playlist in FreeTube...", "success");
    });
  });
}

// Show status message
function showStatus(message, type) {
  var el = document.getElementById("statusMessage");
  el.textContent = message;
  el.className = "status-message " + type;

  setTimeout(function() {
    el.className = "status-message";
  }, 3000);
}