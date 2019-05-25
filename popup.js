const changeColor = document.getElementById("Donwload");

chrome.storage.sync.get("color", function(data) {
  changeColor.onclick = function(element) {
    chrome.tabs.executeScript({
      file: "contentScript.js"
    });
  };
});

var urls;

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "urls") {
    var tag = document.getElementById("list");
    urls = req.urls;
    req.urls.forEach(val => {
      const newli = document.createElement("li");
      const newA = document.createElement("a");
      const newText = document.createTextNode(val.name);
      newA.setAttribute("href", val.url);
      newA.appendChild(newText);
      newli.appendChild(newA);
      tag.appendChild(newli);
      tag = newli;
    });
    const button = document.createElement("button");
    button.setAttribute("id", "downloadAll");
    button.innerHTML = "Download all Urls";
    button.onclick = function() {
      chrome.runtime.sendMessage({
        action: "downloadAll",
        urls: req.urls
      });
    };
    document.body.appendChild(button);
  }
});
