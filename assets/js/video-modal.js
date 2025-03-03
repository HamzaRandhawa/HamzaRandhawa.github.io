// function openVideoModal(videoUrl) {
//   document.getElementById("videoFrame").src = videoUrl;
//   document.getElementById("videoModal").style.display = "flex";
// }

// function closeVideoModal() {
//   document.getElementById("videoFrame").src = ""; // Stop video playback
//   document.getElementById("videoModal").style.display = "none";
// }
function openVideoModal(videoUrl) {
  var modal = document.getElementById("videoModal");
  var iframe = document.getElementById("videoFrame");
  
  // Set video source (allow YouTube, Vimeo, or uploaded files)
  iframe.src = videoUrl.includes("http") ? videoUrl : "/assets/videos/" + videoUrl;
  
  modal.style.display = "flex"; // Show modal
}

function closeVideoModal() {
  var modal = document.getElementById("videoModal");
  var iframe = document.getElementById("videoFrame");
  
  iframe.src = ""; // Stop video when closing modal
  modal.style.display = "none";
}



window.onclick = function(event) {
  var modal = document.getElementById("videoModal");
  if (event.target == modal) {
    closeVideoModal();
  }
};
