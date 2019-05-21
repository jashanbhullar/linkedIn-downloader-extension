chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.linkedin.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  if (message.action === "download") {
    chrome.downloads.download({
      url: message.url,
      filename: message.name
    });
    chrome.tabs.getCurrent(function(tab) {
      chrome.tabs.remove(tab.id, function() {});
    });
  }
});
