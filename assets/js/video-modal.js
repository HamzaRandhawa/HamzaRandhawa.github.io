// function openVideoModal(videoUrl) {
//   document.getElementById("videoFrame").src = videoUrl;
//   document.getElementById("videoModal").style.display = "flex";
// }

// function closeVideoModal() {
//   document.getElementById("videoFrame").src = ""; // Stop video playback
//   document.getElementById("videoModal").style.display = "none";
// }
// // function openVideoModal(videoUrl) {
// //   var modal = document.getElementById("videoModal");
// //   var iframe = document.getElementById("videoFrame");

// //   // Convert Google Drive share link to embeddable format
// //   if (videoUrl.includes("drive.google.com")) {
// //     let fileIdMatch = videoUrl.match(/[-\w]{25,}/); // Extract file ID
// //     if (fileIdMatch) {
// //       videoUrl = "https://drive.google.com/file/d/" + fileIdMatch[0] + "/preview";
// //     }
// //   }
// //   // Set video source (allow YouTube, Vimeo, or uploaded files)
// //   // iframe.src = videoUrl.includes("http") ? videoUrl : "/assets/videos/" + videoUrl;
  
// //   modal.style.display = "flex"; // Show modal
// // }

// // function closeVideoModal() {
// //   var modal = document.getElementById("videoModal");
// //   var iframe = document.getElementById("videoFrame");
  
// //   iframe.src = ""; // Stop video when closing modal
// //   modal.style.display = "none";
// // }

// window.onclick = function(event) {
//   var modal = document.getElementById("videoModal");
//   if (event.target == modal) {
//     closeVideoModal();
//   }
// };
// ----------------------------------


function openVideoModal(videoUrl, updateUrl = true) {
  const iframe = document.getElementById("videoFrame");
  const modal = document.getElementById("videoModal");

  // Resolve the video URL
  const url = new URL(videoUrl, window.location.href);

  if (!["http:", "https:"].includes(url.protocol)) return;

  let playableUrl = url.href;

  // Support Google Drive videos
  if (url.hostname === "drive.google.com") {
    const match = url.pathname.match(/\/file\/d\/([^/]+)/);
    if (match) {
      playableUrl =
        "https://drive.google.com/file/d/" + match[1] + "/preview";
    }
  }

  iframe.src = playableUrl;
  modal.style.display = "flex";

  // NEW: Make the opened video shareable through the browser URL
  if (updateUrl) {
    const pageUrl = new URL(window.location.href);
    pageUrl.searchParams.set("video", videoUrl);
    window.history.replaceState({}, "", pageUrl);
  }
}

function closeVideoModal(updateUrl = true) {
  document.getElementById("videoFrame").src = "";
  document.getElementById("videoModal").style.display = "none";

  // NEW: Remove the video parameter when closing
  if (updateUrl) {
    const pageUrl = new URL(window.location.href);
    pageUrl.searchParams.delete("video");
    window.history.replaceState({}, "", pageUrl);
  }
}

// NEW: Automatically open the video from a shared website link
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const videoUrl = params.get("video");

  if (videoUrl) {
    openVideoModal(videoUrl, false);
  }
});

// Keep the modal in sync with browser navigation
window.addEventListener("popstate", function () {
  const params = new URLSearchParams(window.location.search);
  const videoUrl = params.get("video");

  if (videoUrl) {
    openVideoModal(videoUrl, false);
  } else {
    closeVideoModal(false);
  }
});

// Close modal when clicking outside the video
window.addEventListener("click", function (event) {
  const modal = document.getElementById("videoModal");

  if (event.target === modal) {
    closeVideoModal();
  }
});

// NEW: Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modal = document.getElementById("videoModal");

    if (modal.style.display === "flex") {
      closeVideoModal();
    }
  }
});
