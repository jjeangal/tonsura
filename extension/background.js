chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "getYoutubeMetadata",
      title: "Share with Tonsura",
      contexts: ["page"],
      documentUrlPatterns: ["*://*.youtube.com/watch*"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "getYoutubeMetadata") {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
      });
    }
  });
  