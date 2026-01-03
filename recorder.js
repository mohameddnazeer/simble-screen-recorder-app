let mediaRecorder = null;
let recordedChunks = [];
let recordedVideoURL = null;
let screenStream = null;
let timerInterval = null;
let startTime = null;

const startRecord = document.getElementById("startBtn");
const stopRecord = document.getElementById("stopBtn");
const downloadRecord = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");
const timerText = document.getElementById("timer");
const previewVideo = document.getElementById("previewVideo");

async function startRecording() {
  try {
    statusText.textContent = "Requesting screen access...";
    
    // Request both video and audio (system audio)
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true 
    });

    mediaRecorder = new MediaRecorder(screenStream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = handleStopRecording;

    mediaRecorder.start();
    
    // Update UI
    startRecord.disabled = true;
    stopRecord.disabled = false;
    downloadRecord.disabled = true;
    previewVideo.style.display = "none";
    previewVideo.src = "";
    
    statusText.textContent = "Recording...";
    startTimer();
    
    // Listen for the "Stop sharing" browser UI button
    screenStream.getVideoTracks()[0].onended = () => {
        stopRecording();
    };

  } catch (error) {
    console.error("Error starting recording:", error);
    statusText.textContent = "Recording canceled or failed.";
  }
}

function stopRecording() {
  if (!mediaRecorder || mediaRecorder.state === "inactive") return;

  mediaRecorder.stop();
  screenStream.getTracks().forEach(track => track.stop());

  startRecord.disabled = false;
  stopRecord.disabled = true;

  statusText.textContent = "Processing video...";
  stopTimer();
}

function handleStopRecording() {
  const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
  recordedChunks = []; // Clear chunks for next recording

  if (recordedVideoURL) {
      URL.revokeObjectURL(recordedVideoURL);
  }
  recordedVideoURL = URL.createObjectURL(videoBlob);

  // Enable download
  downloadRecord.disabled = false;
  statusText.textContent = "Recording finished.";

  // Show preview
  previewVideo.src = recordedVideoURL;
  previewVideo.style.display = "block";
  // previewVideo.play(); // Optional: Auto-play
}

function downloadVideo() {
  if (!recordedVideoURL) return;

  const a = document.createElement("a");
  a.href = recordedVideoURL;
  a.download = `screen-recording-${new Date().toISOString().slice(0,19).replace(/:/g,"-")}.webm`;
  a.click();
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        
        timerText.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}
