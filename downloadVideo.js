var url;
console.log("Download process has begun");
var interval = window.setInterval(() => {
  url = document.getElementsByTagName("video")[0];
  console.log("timer running", url);
  if (url.src) {
    chrome.runtime.sendMessage({
      action: "download",
      url: url.src,
      name:
        (document.querySelector(
          '.active[data-control-name="course_video_route"]  .course-toc__item-content'
        ).childNodes[0].nodeValue || "404, Name not found") + ".mp4"
    });
    window.close();
    window.clearInterval(interval);
  }
}, 1000);
