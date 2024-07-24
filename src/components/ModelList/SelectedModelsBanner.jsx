import React from "react";
import Button from "../Buttons/Button"
import {ReactComponent as MenuToggle} from "../../resources/icons/menu-toggle.svg";
import './_SelectedModelsBanner.scss';
import useBEMNaming from "../../common/useBEMNaming";
import {useSelectedModelBannerControl} from "./UseSelectedModelBannerControl";
import SelectedModelCard from "./SelectedModelCard";

const defaultProps = {
    className: "selected-models-banner",
    selectedModels: [],
    deselectModel: () => {
    },
    clearModels: () => {
    },
    runModels: () => {
    },
};

const modifiers = {
    'toggle-icon': {
        open: (state) => state.open,
    },
    list: {
        open: (state) => state.open,
    },
    controls: {
        open: (state) => state.open,
    }
};

export default function SelectedModelsBanner(givenProps) {
    const props = ({...defaultProps, ...givenProps});
    const {getBlock, getElement} = useBEMNaming(props.className, modifiers);

    const {open, toggleOpen} = useSelectedModelBannerControl(props);

    const getRemoveButton = () => {
        if (props.selectedModels.length > 0) {
            return (
                <button className={getElement('remove')} onClick={props.clearModels}>
                    Remove all
                </button>
            );
        }
    }

    const getModelCards = () => {
        let modelKey = 0;

        return props.selectedModels.map(model => <SelectedModelCard key={modelKey++} model={model} remove={() => {
            if (props.deselectModel)
                props.deselectModel(model);
        }}/>)
    }


    return (
        <div className={getBlock()}>
            <div className={getElement(`controls controls--${open}`)}>
                <div className={getElement("toggle-col", {open})}>
                    <button className={getElement('toggle')} onClick={() => toggleOpen()}>
                        <MenuToggle className={getElement(`toggle-icon toggle-icon--${open}`)}/>
                        <span className={getElement("hide-text")}>
              {open ? "Hide" : "Show"}
            </span>
                    </button>
                </div>
                <div className={getElement("controls-col")}>

            <span className={getElement('toggle-text')}>
              Models added: <span className={getElement("red-circle")}>{props.selectedModels.length}</span>
            </span>
                    {getRemoveButton()}
                    <div className={getElement('run')}>
                        <Button content="Run models to compare" isPrimary={false} isSmall={true}
                                onClick={() => props.runModels(props.selectedModels)}/>
                    </div>
                </div>
            </div>
            <div className={getElement(`list ${open && "list--open"}`)}>
                {getModelCards()}
            </div>
        </div>
    );
}
