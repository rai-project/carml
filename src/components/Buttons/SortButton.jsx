import React, {useState} from "react";
import {ReactComponent as SortBars} from "../../resources/icons/sort-bars.svg";
import {SortDirection} from "../ModelList/useModelListWithFilters";

export default function SortButton(props) {
    const [optionsHidden, setOptionsHidden] = useState(true);

    const preventFocus = (e) => {
        e.preventDefault();
    }

    const onOptionClick = (value) => {
        if (!!props.setSortDirection) {
            props.setSortDirection(value);
        }
        document.activeElement.blur();
        setOptionsHidden(true);
    }

    return (
        <div className="sort-button">
            <button className="sort-button__button" onClick={() => setOptionsHidden(false)}
                    onFocus={() => setOptionsHidden(false)}
                    onBlur={() => setOptionsHidden(true)}>
                <SortBars className="sort-button__icon"/>
                Sort by
            </button>
            <div className="sort-button__option-box" hidden={optionsHidden}>
                <input className="sort-button__radio" type="radio" id="name-ascend" name="sort-option"
                       value={SortDirection.ASC}
                       defaultChecked={props.sortDirection === SortDirection.ASC}/>
                <label className="sort-button__option" htmlFor="name-ascend" onMouseDown={preventFocus}
                       onClick={() => onOptionClick(SortDirection.ASC)}>Name ascending</label>
                <input className="sort-button__radio" type="radio" id="name-descend" name="sort-option"
                       value={SortDirection.DESC}
                       defaultChecked={props.sortDirection === SortDirection.DESC}
                />
                <label className="sort-button__option" htmlFor="name-descend" onMouseDown={preventFocus}
                       onClick={() => onOptionClick(SortDirection.DESC)}>Name descending</label>
            </div>
        </div>
    );
}
