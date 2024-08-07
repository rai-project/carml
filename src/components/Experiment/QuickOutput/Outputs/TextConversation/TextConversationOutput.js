import React, { useEffect, useState, useRef, useCallback } from "react";
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

  console.log('TextConversationOutput props', props);

  const task = Task.getStaticTask(textConversation);

  const [conversation, setConversation] = useState([
    { role: ROLE.USER, content: input },
    { role: ROLE.ASSISTANT, content: output }
  ]);
  const [message, setMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [newInput, setNewInput] = useState('');

  const inputField = useRef(null);
  const chatBottomPosition = useRef(null);

  useEffect(() => {
    if (message) {
      setConversation([...conversation, message]);
    }
  }, [message]);

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
      setNewInput('');
      if (inputField.current) {
        inputField.current.focus();
      }
    }
  }, [isSending]);

  const sendToAPI = useCallback(async () => {
    // Submit to API
    if (typeof props.onSubmit === 'function') {
      const trialResponse = await props.onSubmit(newInput, conversation);
      const newOutput = trialResponse?.results?.responses[0]?.features[0]?.text ?? "Something went wrong.";

      setMessage({ role: ROLE.ASSISTANT, content: newOutput });

      const newInferenceDuration = trialResponse?.results?.duration_for_inference ?? "0s";
      setInferenceDuration(newInferenceDuration);

      setIsSending(false);
    } else {
      console.error('props.onSubmit is not a function');
      setIsSending(false);
    }
  }, [newInput, conversation, props]);

  const sendMessage = () => {
    setMessage({ role: ROLE.USER, content: newInput });
    setIsSending(true);
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
                    {message.role === ROLE.ASSISTANT && (
                      <div className="chat-profile-icon assistant-icon">
                        ML
                      </div>
                    )}
                    <div className="speech-bubble">
                      {message.content}
                    </div>
                    {message.role === ROLE.USER && (
                      <div className="chat-profile-icon user-icon">
                        U
                      </div>
                    )}
                  </div>
                )
              })
            }
            <div ref={chatBottomPosition} />
          </div>
        </div>
        <div className={getElement("chat-input-container")}>
          <textarea
            ref={inputField}
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
              {(!isSending) ?
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
