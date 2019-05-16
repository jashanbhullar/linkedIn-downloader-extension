// console.log("This is the content Script");
[...document.querySelectorAll("artdeco-tab")]
  .find(a => a.textContent.includes("Contents"))
  .click();

var urls;
var interval = window.setInterval(() => {
  urls = [
    ...document.querySelectorAll('[data-control-name="course_video_route"]')
  ].map((value, index) => ({
    id: index,
    url: value.href,
    name: value.innerText
  }));
  console.log("timer running - contentScripts");
  if (urls && urls.length > 0) {
    console.log(urls);
    chrome.runtime.sendMessage({
      action: "urls",
      urls
    });
    window.clearInterval(interval);
  }
}, 1000);
