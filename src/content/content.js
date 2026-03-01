// FreeTube Extension - Content Script

(function() {
  "use strict";

  // Settings
  var settings = {
    ftModeEnabled: false
  };

  console.log("FreeTube: Content script loaded");

  // Load settings from storage
  function loadSettings() {
    try {
      chrome.runtime.sendMessage({ action: "getSettings" }, function(response) {
        if (chrome.runtime.lastError) {
          console.log("FreeTube: Error loading settings");
          return;
        }
        if (response && response.settings) {
          settings = response.settings;
          console.log("FreeTube: Settings loaded", settings);
        }
      });
    } catch (e) {
      console.log("FreeTube: Exception loading settings", e);
    }
  }

  // Load settings on start
  loadSettings();

  // Reload settings every 2 seconds
  setInterval(loadSettings, 2000);

  // Pause the video
  function pauseVideo() {
    var video = document.querySelector("video");
    if (video && !video.paused) {
      video.pause();
      console.log("FreeTube: Video paused");
      return true;
    }
    return false;
  }

  // Get current timestamp
  function getTimestamp() {
    var video = document.querySelector("video");
    if (video) {
      return video.currentTime;
    }
    return null;
  }

  // Get channel URL from video page
  function getChannelUrl() {
    // --- Method 1: Targeted selectors scoped to the video owner area ---
    var scopedSelectors = [
      // Regular video page – owner section
      "ytd-video-owner-renderer a.yt-simple-endpoint[href*='/@']",
      "ytd-video-owner-renderer a.yt-simple-endpoint[href*='/channel/']",
      "ytd-video-owner-renderer a.yt-simple-endpoint[href*='/c/']",
      "#owner a.yt-simple-endpoint[href*='/@']",
      "#owner a.yt-simple-endpoint[href*='/channel/']",
      "#above-the-fold ytd-channel-name a",
      "#top-row ytd-channel-name a",
      "ytd-channel-name a.yt-simple-endpoint",
      "#channel-name a.yt-simple-endpoint",
      "#channel-name a",
      // Shorts page
      "ytd-reel-video-renderer [id='channel-info'] a[href*='/@']",
      "ytd-reel-video-renderer a.yt-simple-endpoint[href*='/@']",
      "#shorts-container a[href*='/@']"
    ];

    for (var i = 0; i < scopedSelectors.length; i++) {
      var link = document.querySelector(scopedSelectors[i]);
      if (link && link.href && isChannelHref(link.href)) {
        console.log("FreeTube: Found channel URL (scoped)", link.href);
        return link.href;
      }
    }

    // --- Method 2: Walk all links in #owner / #above-the-fold ---
    var containers = document.querySelectorAll("#owner, #above-the-fold, #top-row");
    for (var c = 0; c < containers.length; c++) {
      var links = containers[c].querySelectorAll("a[href]");
      for (var j = 0; j < links.length; j++) {
        if (isChannelHref(links[j].href)) {
          console.log("FreeTube: Found channel URL (container walk)", links[j].href);
          return links[j].href;
        }
      }
    }

    // --- Method 3: Broad fallback – first /@handle link on the page ---
    var broadSelectors = [
      "a[href*='/@']",
      "a[href*='/channel/']",
      "a[href*='/c/']"
    ];
    for (var k = 0; k < broadSelectors.length; k++) {
      var fallback = document.querySelector(broadSelectors[k]);
      if (fallback && fallback.href && isChannelHref(fallback.href)) {
        console.log("FreeTube: Found channel URL (broad fallback)", fallback.href);
        return fallback.href;
      }
    }

    console.log("FreeTube: Could not find channel URL");
    return null;
  }

  // Helper: check if an href looks like a YouTube channel URL
  function isChannelHref(href) {
    return href.includes("/@") || href.includes("/channel/") || href.includes("/c/");
  }

  // Extract video ID from href
  function extractVideoId(href) {
    try {
      var fullUrl = href;
      if (href.startsWith("/")) {
        fullUrl = "https://www.youtube.com" + href;
      }

      var urlObj = new URL(fullUrl);

      if (urlObj.pathname.includes("/watch")) {
        return urlObj.searchParams.get("v");
      } else if (urlObj.pathname.includes("/shorts/")) {
        return urlObj.pathname.split("/shorts/")[1].split("/")[0].split("?")[0];
      }
    } catch (e) {
      console.log("FreeTube: Error extracting video ID", e);
    }
    return null;
  }

  // Open video in FreeTube
  function openInFreeTube(videoId) {
    var freetubeUrl = "freetube://https://www.youtube.com/watch?v=" + videoId;
    console.log("FreeTube: Opening", freetubeUrl);
    window.location.href = freetubeUrl;
  }

  // Listen for messages from popup and background
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("FreeTube: Content received message", request.action);

    switch(request.action) {
      
      case "getTimestamp":
        sendResponse({ timestamp: getTimestamp() });
        break;
      
      case "pauseVideo":
        pauseVideo();
        sendResponse({ success: true });
        break;
      
      case "pauseAndGetTimestamp":
        pauseVideo();
        sendResponse({ timestamp: getTimestamp() });
        break;
      
      case "getChannelUrl":
        sendResponse({ channelUrl: getChannelUrl() });
        break;
      
      case "settingsUpdated":
        settings = request.settings;
        console.log("FreeTube: Settings updated", settings);
        sendResponse({ success: true });
        break;
    }

    return true;
  });

  // Handle click events when FT Mode is enabled
  function handleClick(e) {
    if (!settings.ftModeEnabled) {
      return;
    }

    // Find the link element
    var target = e.target;
    var link = null;

    while (target && target !== document) {
      if (target.tagName === "A") {
        link = target;
        break;
      }
      target = target.parentElement;
    }

    if (!link) {
      return;
    }

    var href = link.getAttribute("href");
    if (!href) {
      return;
    }

    // Check if it's a video link
    if (href.includes("/watch") || href.includes("/shorts/")) {
      var videoId = extractVideoId(href);
      
      if (videoId) {
        console.log("FreeTube: Intercepted click, video ID:", videoId);
        
        // Stop normal navigation
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Open in FreeTube
        openInFreeTube(videoId);
        
        return false;
      }
    }
  }

  // Add click listener
  document.addEventListener("click", handleClick, true);

  console.log("FreeTube: Event listeners attached");

})();