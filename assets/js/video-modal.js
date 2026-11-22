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
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");

  // Convert relative video paths into full URLs
  const url = new URL(videoUrl, window.location.href);

  if (!["http:", "https:"].includes(url.protocol)) return;

  // Support Google Drive video sharing links
  let playableUrl = url.href;

  if (url.hostname === "drive.google.com") {
    const match = url.pathname.match(/\/file\/d\/([^/]+)/);

    if (match) {
      playableUrl =
        "https://drive.google.com/file/d/" + match[1] + "/preview";
    }
  }

  iframe.src = playableUrl;
  modal.style.display = "flex";

  // Update browser URL for sharing
  if (updateUrl) {
    const pageUrl = new URL(window.location.href);
    pageUrl.searchParams.set("video", videoUrl);

    window.history.pushState({}, "", pageUrl);
  }
}

function closeVideoModal(updateUrl = true) {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");

  iframe.src = "";
  modal.style.display = "none";

  // Remove video parameter from browser URL
  if (updateUrl) {
    const pageUrl = new URL(window.location.href);
    pageUrl.searchParams.delete("video");

    window.history.replaceState({}, "", pageUrl);
  }
}

// Automatically open video if URL contains ?video=
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const videoUrl = params.get("video");

  if (videoUrl) {
    openVideoModal(videoUrl, false);
  }
});

// Keep the modal synchronized with browser back/forward
window.addEventListener("popstate", function () {
  const params = new URLSearchParams(window.location.search);
  const videoUrl = params.get("video");

  if (videoUrl) {
    openVideoModal(videoUrl, false);
  } else {
    closeVideoModal(false);
  }
});

// Close modal by clicking outside it
document.addEventListener("click", function (event) {
  const modal = document.getElementById("videoModal");

  if (event.target === modal) {
    closeVideoModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  const modal = document.getElementById("videoModal");

  if (event.key === "Escape" && modal.style.display === "flex") {
    closeVideoModal();
  }
});
