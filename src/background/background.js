// FreeTube Extension - Background Service Worker

var defaultSettings = {
  ftModeEnabled: false
};

// Initialize on install
chrome.runtime.onInstalled.addListener(function() {
  
  // Save default settings
  chrome.storage.sync.set({ settings: defaultSettings }, function() {
    console.log("FreeTube: Default settings saved");
  });

  // Remove old context menus then recreate
  chrome.contextMenus.removeAll(function() {
    createContextMenus();
  });
  
  console.log("FreeTube: Extension installed successfully!");
});

// Recreate context menus on browser startup (MV3 service worker may lose them)
chrome.runtime.onStartup.addListener(function() {
  chrome.contextMenus.removeAll(function() {
    createContextMenus();
  });
});

// Create all context menus
function createContextMenus() {
  
  // Video link
  chrome.contextMenus.create({
    id: "playOnFreeTubeLink",
    title: "▶️ Play on FreeTube",
    contexts: ["link"],
    targetUrlPatterns: [
      "*://www.youtube.com/watch*",
      "*://youtube.com/watch*",
      "*://youtu.be/*",
      "*://www.youtube.com/shorts/*",
      "*://youtube.com/shorts/*"
    ]
  });

  // Current video page
  chrome.contextMenus.create({
    id: "playOnFreeTubePage",
    title: "▶️ Play this video on FreeTube",
    contexts: ["page", "video"],
    documentUrlPatterns: [
      "*://www.youtube.com/watch*",
      "*://youtube.com/watch*",
      "*://www.youtube.com/shorts/*",
      "*://youtube.com/shorts/*"
    ]
  });

  // Channel link
  chrome.contextMenus.create({
    id: "openChannelInFreeTube",
    title: "📺 Open Channel in FreeTube",
    contexts: ["link"],
    targetUrlPatterns: [
      "*://www.youtube.com/channel/*",
      "*://www.youtube.com/c/*",
      "*://www.youtube.com/@*",
      "*://youtube.com/channel/*",
      "*://youtube.com/c/*",
      "*://youtube.com/@*"
    ]
  });

  // Playlist link
  chrome.contextMenus.create({
    id: "openPlaylistInFreeTube",
    title: "📋 Open Playlist in FreeTube",
    contexts: ["link"],
    targetUrlPatterns: [
      "*://www.youtube.com/playlist*",
      "*://youtube.com/playlist*"
    ]
  });

  // Current channel page
  chrome.contextMenus.create({
    id: "openChannelPageInFreeTube",
    title: "📺 Open this Channel in FreeTube",
    contexts: ["page"],
    documentUrlPatterns: [
      "*://www.youtube.com/channel/*",
      "*://www.youtube.com/c/*",
      "*://www.youtube.com/@*"
    ]
  });

  // Current playlist page
  chrome.contextMenus.create({
    id: "openPlaylistPageInFreeTube",
    title: "📋 Open this Playlist in FreeTube",
    contexts: ["page"],
    documentUrlPatterns: [
      "*://www.youtube.com/playlist*"
    ]
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var url = null;
  var type = "video";

  switch(info.menuItemId) {
    case "playOnFreeTubeLink":
      url = info.linkUrl;
      type = "video";
      break;
    case "playOnFreeTubePage":
      url = info.pageUrl;
      type = "video";
      break;
    case "openChannelInFreeTube":
    case "openChannelPageInFreeTube":
      url = info.linkUrl || info.pageUrl;
      type = "channel";
      break;
    case "openPlaylistInFreeTube":
    case "openPlaylistPageInFreeTube":
      url = info.linkUrl || info.pageUrl;
      type = "playlist";
      break;
  }

  if (url) {
    openInFreeTube(url, type, null, tab ? tab.id : null);
  }
});

// Handle keyboard shortcut (Alt+F)
chrome.commands.onCommand.addListener(function(command) {
  if (command === "open-in-freetube") {
    // Respect FreeTube Mode - do nothing when it's OFF
    chrome.storage.sync.get(["settings"], function(result) {
      var settings = result.settings || defaultSettings;
      if (!settings.ftModeEnabled) {
        console.log("FreeTube: FT Mode is OFF - keyboard shortcut blocked");
        return;
      }

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          var url = tabs[0].url;
          if (isYouTubeVideoUrl(url)) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "pauseAndGetTimestamp" }, function(response) {
              var timestamp = null;
              if (response && response.timestamp) {
                timestamp = response.timestamp;
              }
              openInFreeTube(url, "video", timestamp, tabs[0].id);
            });
          }
        }
      });
    });
  }
});

// Check if URL is YouTube video
function isYouTubeVideoUrl(url) {
  if (!url) return false;
  return url.includes("youtube.com/watch") || 
         url.includes("youtu.be/") || 
         url.includes("youtube.com/shorts/");
}

// Extract video ID from URL
function extractVideoId(url) {
  try {
    var urlObj = new URL(url);
    var hostname = urlObj.hostname;

    if (hostname.includes("youtube.com")) {
      if (urlObj.pathname.includes("/watch")) {
        return urlObj.searchParams.get("v");
      } else if (urlObj.pathname.includes("/shorts/")) {
        return urlObj.pathname.split("/shorts/")[1].split("/")[0].split("?")[0];
      }
    } else if (hostname === "youtu.be") {
      return urlObj.pathname.substring(1).split("/")[0].split("?")[0];
    }
  } catch (e) {
    console.log("FreeTube: Error extracting video ID", e);
  }
  return null;
}

// Extract channel info from URL
function extractChannelInfo(url) {
  try {
    var urlObj = new URL(url);
    var pathname = urlObj.pathname;

    // Handle /@handle URLs (e.g. /@PewDiePie, /@PewDiePie/videos)
    if (pathname.includes("/@")) {
      var parts = pathname.split("/@");
      if (parts.length > 1) {
        var id = parts[1].split("/")[0];
        if (id) return { type: "@", id: id };
      }
    }
    
    // Handle /channel/ID URLs
    if (pathname.includes("/channel/")) {
      var parts = pathname.split("/channel/");
      if (parts.length > 1) {
        var id = parts[1].split("/")[0];
        if (id) return { type: "channel", id: id };
      }
    }
    
    // Handle /c/CustomURL URLs
    if (pathname.includes("/c/")) {
      var parts = pathname.split("/c/");
      if (parts.length > 1) {
        var id = parts[1].split("/")[0];
        if (id) return { type: "c", id: id };
      }
    }
    
    // Handle /user/Username URLs
    if (pathname.includes("/user/")) {
      var parts = pathname.split("/user/");
      if (parts.length > 1) {
        var id = parts[1].split("/")[0];
        if (id) return { type: "user", id: id };
      }
    }
  } catch (e) {
    console.log("FreeTube: Error extracting channel info", e);
  }
  return null;
}

// Extract playlist ID from URL
function extractPlaylistId(url) {
  try {
    var urlObj = new URL(url);
    return urlObj.searchParams.get("list");
  } catch (e) {
    console.log("FreeTube: Error extracting playlist ID", e);
  }
  return null;
}

// Launch a freetube:// URL.
// Priority 1: Use chrome.tabs.update on the specific tab (keeps context, reliable)
// Priority 2: Use chrome.tabs.create (fallback for extension pages/popup)
function launchFreeTubeUrl(freetubeUrl, tabId) {
  if (tabId) {
    chrome.tabs.update(tabId, { url: freetubeUrl }, function(tab) {
      if (chrome.runtime.lastError) {
        console.log("FreeTube: tabs.update failed, trying tabs.create", chrome.runtime.lastError);
        chrome.tabs.create({ url: freetubeUrl });
      }
    });
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.update(tabs[0].id, { url: freetubeUrl }, function(tab) {
          if (chrome.runtime.lastError) {
             chrome.tabs.create({ url: freetubeUrl });
          }
        });
      } else {
        chrome.tabs.create({ url: freetubeUrl });
      }
    });
  }
}

// Open in FreeTube app
function openInFreeTube(url, type, timestamp, tabId) {
  var freetubeUrl = null;

  console.log("FreeTube: Opening", type, url, "timestamp:", timestamp);

  if (type === "video") {
    var videoId = extractVideoId(url);
    if (videoId) {
      freetubeUrl = "freetube://https://www.youtube.com/watch?v=" + videoId;
      if (timestamp && timestamp > 0) {
        freetubeUrl += "&t=" + Math.floor(timestamp) + "s";
      }
    }
  } else if (type === "channel") {
    // For channels, we must be careful.
    // If we're on a channel page, the URL might be https://www.youtube.com/@Channel/videos
    // We want to open the *channel root* or specific valid channel URL.
    var channelInfo = extractChannelInfo(url);
    if (channelInfo) {
      if (channelInfo.type === "@") {
        freetubeUrl = "freetube://https://www.youtube.com/@" + channelInfo.id;
      } else if (channelInfo.type === "c") {
        freetubeUrl = "freetube://https://www.youtube.com/c/" + channelInfo.id;
      } else if (channelInfo.type === "user") {
        freetubeUrl = "freetube://https://www.youtube.com/user/" + channelInfo.id;
      } else {
        freetubeUrl = "freetube://https://www.youtube.com/channel/" + channelInfo.id;
      }
    }
  } else if (type === "playlist") {
    var playlistId = extractPlaylistId(url);
    if (playlistId) {
      freetubeUrl = "freetube://https://www.youtube.com/playlist?list=" + playlistId;
    }
  }

  if (freetubeUrl) {
    console.log("FreeTube: Opening URL", freetubeUrl);
    launchFreeTubeUrl(freetubeUrl, tabId);
  } else {
    console.log("FreeTube: Could not create FreeTube URL");
  }
}

// Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("FreeTube: Message received", request.action);

  switch(request.action) {
    
    case "openVideo":
      openInFreeTube(request.url, "video", request.timestamp || null, request.tabId || (sender.tab ? sender.tab.id : null));
      sendResponse({ success: true });
      break;
    
    case "openChannel":
      openInFreeTube(request.url, "channel", null, request.tabId || (sender.tab ? sender.tab.id : null));
      sendResponse({ success: true });
      break;
    
    case "openPlaylist":
      openInFreeTube(request.url, "playlist", null, request.tabId || (sender.tab ? sender.tab.id : null));
      sendResponse({ success: true });
      break;
    
    case "getSettings":
      chrome.storage.sync.get(["settings"], function(result) {
        var settings = result.settings || defaultSettings;
        console.log("FreeTube: Sending settings", settings);
        sendResponse({ settings: settings });
      });
      return true;
    
    case "saveSettings":
      chrome.storage.sync.set({ settings: request.settings }, function() {
        console.log("FreeTube: Settings saved", request.settings);
        
        // Notify all YouTube tabs
        chrome.tabs.query({ url: "*://www.youtube.com/*" }, function(tabs) {
          for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, { 
              action: "settingsUpdated", 
              settings: request.settings 
            }).catch(function() {});
          }
        });
        
        sendResponse({ success: true });
      });
      return true;
  }
  
  return true;
});