chrome.runtime.onInstalled.addListener(function() {
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

const startDownload = url => {
  return new Promise((resolve, reject) => {
    const newUrl = new URL(url);
    newUrl.searchParams.append("autoplay", "true");
    newUrl.searchParams.append("download", "true");
    chrome.windows.create({
      url: newUrl.href,
      type: "popup"
    });
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });
};

chrome.runtime.onMessage.addListener(function(message, sender, reply) {
  if (message.action === "download") {
    chrome.downloads.download({
      url: message.url,
      filename: message.name
    });
    chrome.runtime.sendMessage({
      action: "downloadBegun"
    });
  }
});

chrome.runtime.onMessage.addListener(async message => {
  if (message.action === "downloadAll") {
    for (const { url } of message.urls) {
      await startDownload(url);
      break;
    }
  }
});
