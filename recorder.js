let mediaRecorder = null;
let recordedChunks = [];
let recordedVideoURL = null;
let screenStream = null;

const startRecord = document.getElementById("startBtn");
const stopRecord = document.getElementById("stopBtn");
const downloadRecord = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");

async function startRecording() {
  try {
    statusText.textContent = "Requesting screen acces";

    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    mediaRecorder = new MediaRecorder(screenStream);
    
    mediaRecorder.ondataavailable = (event) =>{
        if(event.data.size > 0){
            recordedChunks.push(event.data);
        }
    }

    mediaRecorder.onstop = handleStopRecording;

    mediaRecorder.start();
    startRecord.disabled = true;
    stopRecord.disabled = false;
    downloadRecord.disabled = true;

    statusText.textContent = "Recording";
  } catch (error) {
    statusText.textContent = "recording canceled";
  }
}
