const changeColor = document.getElementById("Donwload");

chrome.storage.sync.get("color", function(data) {
  //   changeColor.setAttribute("value", data.color);
  changeColor.onclick = function(element) {
    chrome.tabs.executeScript({
      file: "contentScript.js"
    });
    // chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    //   chrome.tabs.sendMessage(tabs[0].id, { action: "readDom" });
    // });
  };
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "urls") {
    var tag = document.getElementById("list");
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
    button.innerHTML = "Download all Urls";
    changeColor.appendChild(button);
    button.click = () => {
      req.urls.forEach(({ url }) => {
        chrome.windows.create({
          url,
          type: "popup"
        });
      });
    };
  }
});
