import React, { useEffect, useState, useRef } from "react";
import "../Text/TextOutput.scss";
import "./TextConversationOutputChatContainer.scss";
import useBEMNaming from "../../../../../common/useBEMNaming";
import useTextOutput from "../Text/useTextOutput";
import OutputDuration from "../_Common/components/OutputDuration";
import { textConversation } from "../../../../../helpers/TaskIDs";
import Task from "../../../../../helpers/Task";
import Rating from "../Classification/Rating";

const ROLE = {
    USER: 'user',
    ASSISTANT: 'assistant'
}

export default function TextConversationOutput(props) {
    const { getBlock, getElement } = useBEMNaming("text-conversation-output");
    const { inferenceDuration, output, input, setInput, setInferenceDuration } = useTextOutput(
        props.trial
    );

    const task = Task.getStaticTask(textConversation);

    const [conversation, setConversation] = useState([
        { role: ROLE.USER, content: input },
        { role: ROLE.ASSISTANT, content: output }
    ]);
    const [message, setMessage] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [newInput, setNewInput] = useState('');

    const inputField = useRef(null);  // Not working
    const chatBottomPosition = useRef(null);

    useEffect(() => {
        if (message) {
            setConversation([...conversation, message]);
        }
    }, [message])

    useEffect(() => {
        if (conversation) {
            chatBottomPosition.current.scrollIntoView({ behavior: "smooth" });
            
            if (conversation[conversation.length - 1].role === ROLE.USER) {
                // Send to API
                sendToAPI();
            }
        }
    }, [conversation]);

    useEffect(() => {
        if (!isSending) {
            // NOTE: Currently not working
            if (inputField.current) {
                console.log('focus on input field')
                inputField.current.focus();
            }

        }
    }, [isSending]);  

    const sendToAPI = async () => {
        // Submit to API
        const trialResponse = await props.onSubmit(newInput, conversation);
        const newOutput = trialResponse?.results?.responses[0]?.features[0]?.text ?? "Something went wrong.";

        setMessage({ role: ROLE.ASSISTANT, content: newOutput });

        const newInferenceDuration = trialResponse?.results?.duration_for_inference ?? "0s";
        setInferenceDuration(newInferenceDuration);

        setIsSending(false);
    };

    const sendMessage = () => {
        setMessage({ role: ROLE.USER, content: newInput });
        setIsSending(true);   
        setNewInput('');
    }    


  return (
    <div className={getBlock()}>
      <div className={getElement("results")}>
        <div className={getElement("title-row")}>
          <h3 className={getElement("title-row-title")}>Output</h3>
          <OutputDuration duration={inferenceDuration} />
        </div>
        <p className={getElement("subtitle")}>
            {task.outputText}
        </p>
        <div className={getElement("output-container")}>
            <div className={getElement("chat-container")}>  
                {
                    conversation.map((message, index) => {
                        return (
                            <div 
                                key={index}
                                className={getElement(`chat-${message.role}-message`)}
                            >
                                { message.role === "assistant" && (
                                    <div className="assistant-icon-container">
                                        <div className="assistant-icon">
                                            ML
                                        </div>
                                    </div>

                                )}
                                <div className="speech-bubble">
                                    {message.content}
                                </div>
                            </div>
                        )
                    })
                }
                <div ref={chatBottomPosition} />         
            </div>  
            
        </div>
        <div className={getElement("chat-input-container")}>
            <textarea
                useref={inputField}
                value={newInput}
                onChange={(e) => setNewInput(e.target.value)}
                className={getElement("input-container-text")}
                autoFocus
            ></textarea>

            <div className={getElement("input-submit-row")}>
                <button
                    onClick={sendMessage}
                    className={getElement("input-submit-button")}
                    disabled={isSending}
                >
                    { (!isSending) ?
                        (
                            <span className={getElement("input-submit-button-content")}>
                                Send
                            </span>
                        ) : (
                            <span className={getElement("input-submit-button-content")}>
                                <div className={getElement('spinner-container')}>
                                    <div className={getElement('spinner')}></div>
                                </div>    
                            </span>
                        )
                    }
                </button>
            </div>
        </div>        

        <Rating />
      </div>
    </div>
  );
}
