var url;
console.log("Download process has begun");
var interval = window.setInterval(() => {
  url = document.getElementsByTagName("video")[0];
  console.log("timer running", url);
  if (url.src) {
    var arr = [
      ...document.querySelectorAll(".course-toc__item.video-item.ember-view")
    ];

    const activeElement = document.querySelector(
      '.active[data-control-name="course_video_route"]  .course-toc__item-content'
    );

    const toFind = activeElement.parentElement.parentElement.parentElement;

    const index = arr.findIndex(el => el === toFind) + 1;

    chrome.runtime.sendMessage({
      action: "download",
      url: url.src,
      name:
        index.toString() +
        ". " +
        (activeElement.childNodes[0].nodeValue || "404, Name not found") +
        ".mp4"
    });
    window.close();
    window.clearInterval(interval);
  }
}, 1000);
