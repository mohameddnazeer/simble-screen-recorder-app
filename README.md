# Simple Screen Recorder

A lightweight, browser-based screen recorder built with vanilla HTML, CSS, and JavaScript. This application allows users to record their screen, window, or specific browser tabs with system audio support, preview the recording, and download it instantly.

## Features

-   **One-Click Recording**: Easily start capturing your screen or specific application windows.
-   **System Audio Support**: Option to capture system audio along with the video (dependent on browser/OS support).
-   **Live Timer**: Displays the duration of your current recording session in real-time (`MM:SS`).
-   **Instant Preview**: Automatically plays back the recorded video immediately after stopping, allowing you to verify content before downloading.
-   **Smart Downloads**: Saves files with timestamped names (e.g., `screen-recording-2023-10-27-14-30-00.webm`) to prevent overwriting.
-   **No Installation Required**: Works entirely in the browser using modern Web APIs.

## How to Use

1.  Open `index.html` to see the landing page, or go directly to `recorder.html`.
2.  Click **Start Recording**.
3.  A browser prompt will appear asking what you want to share (Entire Screen, Window, or Chrome Tab).
    *   *Tip: To capture audio, make sure to toggle the "Share system audio" switch in the prompt.*
4.  The recording will start, and the timer will begin counting.
5.  Click **Stop Recording** when finished (or use the browser's "Stop sharing" button).
6.  The video will automatically appear in the preview player.
7.  Click **Download Video** to save the `.webm` file to your computer.

## Technical Details

This project uses standard Web APIs and requires no backend server.

*   **Tech Stack**: HTML5, CSS3, JavaScript (ES6+)
*   **Key APIs**:
    *   `navigator.mediaDevices.getDisplayMedia()`: To capture the screen and audio stream.
    *   `MediaRecorder`: To encode the media stream into video chunks.
    *   `Blob` & `URL.createObjectURL()`: To generate the video file and preview URL in memory.

## Project Structure

```text
.
├── index.html      # Landing page
├── recorder.html   # Main application interface
├── recorder.js     # Core logic (recording, timer, download handling)
├── style.css       # Application styling
└── README.md       # Project documentation
```

## Browser Compatibility

Works best in modern browsers that support the `getDisplayMedia` API:
-   Google Chrome / Chromium-based browsers (Edge, Brave)
-   Mozilla Firefox
-   Safari (limited support for some features)
