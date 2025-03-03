function openVideoModal(videoUrl) {
  document.getElementById("videoFrame").src = videoUrl;
  document.getElementById("videoModal").style.display = "flex";
}

function closeVideoModal() {
  document.getElementById("videoFrame").src = ""; // Stop video playback
  document.getElementById("videoModal").style.display = "none";
}

window.onclick = function(event) {
  var modal = document.getElementById("videoModal");
  if (event.target == modal) {
    closeVideoModal();
  }
};
