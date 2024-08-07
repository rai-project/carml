import React from 'react';
import './PendingOutput.scss';
import useBEMNaming from "../../../../../common/useBEMNaming";
import { textConversation } from '../../../../../helpers/TaskIDs';

const defaultProps = {
    className: 'pending-output'
};

export default function PendingOutput(givenProps) {
    const props = {...defaultProps, ...givenProps};
    const {getBlock, getElement} = useBEMNaming(props.className);

    return (
        <div className={getBlock()}>
            <h3 className={getElement('title')}>Output</h3>
            <div className={getElement('subtitle')}>Fetching results...</div>
            {props.unsupportedModel &&
                <div className={getElement('subtitle')}>Warning: unsupported model</div>
            }
            { props.outputType !== textConversation ?
                (
                    <div className={getElement('spinner-container')}>
                        <div className={getElement('spinner')} />
                        <p className={getElement("spinner-text")}>
                            This could take a few minutes...
                        </p>
                    </div>
                ) : (
                    <div className={getElement('ellipsis-container')}>
                        <div className={getElement('ellipsis-speech-bubble')} >
                            <div className={getElement('ellipsis')} />
                        </div>
                        <p className={getElement("ellipsis-text")}>
                            This could take a few minutes...
                        </p>
                    </div>
                )
            }
        </div>
    );
}