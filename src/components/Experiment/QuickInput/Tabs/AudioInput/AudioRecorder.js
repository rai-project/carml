import React from "react";
import { useState, useRef, useEffect } from "react";
import DownloadIcon from "../../../../../resources/icons/download-icon.png"

import "./AudioRecorder.scss";


const mimeType = "audio/webm";

export default function AudioRecorder(props) {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);   
    
    
    useEffect(() => {
        if (stream) {
            startRecording();
        }
        
    }, [stream]);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const removeMicrophonePermission = async (stream) => {
        console.log(stream);
        setPermission(false)
        stream.getTracks().forEach(track => {
            track.stop()
            track.enabled = false
        });

        // const audioContext = new AudioContext()
        // audioContext.close()
        // const microphone = audioContext.createMediaStreamSource(stream)
        // microphone.disconnect()   
    }

    const startRecording = async () => {
        setRecordingStatus("recording");
        console.log(stream);
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });

        // const types = [
        //     "video/webm",
        //     "audio/webm",
        //     "video/webm;codecs=vp8",
        //     "video/webm;codecs=daala",
        //     "video/webm;codecs=h264",
        //     "audio/webm;codecs=opus",
        //     "video/mpeg",
        //   ];
          
        //   for (const type of types) {
        //     console.log(
        //       `Is ${type} supported? ${
        //         MediaRecorder.isTypeSupported(type) ? "Maybe!" : "Nope :("
        //       }`,
        //     );
        //   }        

        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        await mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };
      
    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);

            removeMicrophonePermission(mediaRecorder.current.stream);
        };
    };

    const recordAgain = async () => {
        await getMicrophonePermission();
    }

    return (
        <div>
            <main>
                <div className="audio-controls">
                    {/* Initial Recording Controls */}
                    { (!permission && !audio) ? (
                        <button onClick={getMicrophonePermission} type="button"
                            className="record-button"
                        >
                            Start Recording
                        </button>
                    ) : null }
                    {recordingStatus === "recording" ? (
                        <button 
                            onClick={stopRecording} 
                            type="button"
                            className={"record-button" + (recordingStatus === "recording" ? " pulsing" : "")}
                        >
                            Stop Recording
                        </button>
                    ) : null }
                    {/* Retry Recording Controls */}
                    { (audio && recordingStatus === "inactive") && (
                        <button
                            className="record-button"
                            type="button"
                            onClick={recordAgain}
                        >
                            Record again
                        </button>
                    )}
                </div>
                {audio ? (
                    <div className="audio-container">
                        <audio className="recorded-audio-file" src={audio} controls />
                        <a download href={audio}>
                            <img className="download-audio-icon" src={DownloadIcon} />
                        </a>
                    </div>
                ) : null}                
            </main>
        </div>
    )
}
