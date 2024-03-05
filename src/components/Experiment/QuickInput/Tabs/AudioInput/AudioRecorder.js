import React from "react";
import { useState, useRef, useEffect } from "react";

import MicrophoneIcon from "../../../../../resources/icons/icon-microphone-white.png"
import DownloadIcon from "../../../../../resources/icons/icon-download.png"

import "./AudioRecorder.scss";
import useUploadInputControl from "../UploadInput/useUploadInputControl";
import { Dashboard } from "@uppy/react";

const mimeType = "audio/webm";

export default function AudioRecorder(props) {
    // TODO: still need to handle setSelectedInput and enable runModel button
    // console.log(props)

    const {uppy} = useUploadInputControl(props);

    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);   


    const [audioBlob, setAudioBlob] = useState(null);  
    const [uppyFileId, setUppyFileId] = useState(null);
    
    
    useEffect(() => {
        if (stream) {
            startRecording();
        }
        
    }, [stream]);

    useEffect(() => {
        if (audioBlob) {
            uploadAudio();
        }
    }, [audioBlob]);

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
        setPermission(false)
        stream.getTracks().forEach(track => {
            track.stop()
            track.enabled = false
        });
    }

    const startRecording = async () => {
        setRecordingStatus("recording");

        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType }); 

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
            const blob = new Blob(audioChunks, { type: mimeType });
            setAudioBlob(blob);

            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(blob);
            setAudio(audioUrl);
            setAudioChunks([]);

            // Remove microphone permissions
            removeMicrophonePermission(mediaRecorder.current.stream);
        };
    };

    const recordAgain = async () => {
        uppy.removeFile(uppyFileId)
        await getMicrophonePermission();
    }

    const uploadAudio = async () => {
        const uppyFile = uppy.addFile({
            name: `temp-audio-${Date.now()}.webm`,
            type: mimeType,
            data: audioBlob,
            source: 'Local'
        });

        // console.log('uppyFile: ', uppyFile)
        setUppyFileId(uppyFile)

        // TODO: Can/do we want to automatically upload the file?
        // const result = await uppy.upload(uppyFile);
        // console.log(result)

        // TODO: props.setSelectedInput so that we can props.runFile
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
                            <img className="record-audio-icon" src={MicrophoneIcon} />
                            Start Recording
                        </button>
                    ) : null }
                    {recordingStatus === "recording" ? (
                        <button 
                            onClick={stopRecording} 
                            type="button"
                            className={"record-button" + (recordingStatus === "recording" ? " pulsing" : "")}
                        >
                            <img className="record-audio-icon" src={MicrophoneIcon} />
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
                            <img className="record-audio-icon" src={MicrophoneIcon} />
                            Record again
                        </button>
                    )}
                    
                    {/* Uppy Dashboard (move below audio) */}
                    { (audio && recordingStatus === "inactive") && (
                        <Dashboard 
                            uppy={uppy} 
                            width={"100%"} 
                            height={"50%"} 
                        />
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
