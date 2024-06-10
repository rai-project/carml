import React from "react";
import useBEMNaming from "../../../../../common/useBEMNaming";
import {colors} from "../_Common/utils/Colors";
import "./SemanticSegmentationTable.scss";
import TableNoRows from "../_Common/components/TableNoRows";

export default function SemanticSegmentationTable(props) {
  const {getBlock, getElement} = useBEMNaming("semantic-segmentation-table");

  const renderRow = (label) => {
    const color = colors[label.index % colors.length].background;

    return (
            <div onMouseLeave={() => props.hover.leave()} onMouseEnter={() => props.hover.enter(label.index + 1)}
                key={`label-${label.index}`}
                className={getElement("row")}>
              <div className={getElement("row-middle")}>
                <input name={`row-input-${label.label}`} type={"checkbox"}
                  className={getElement("row-input-hidden")}
                  defaultChecked={1}
                />
                <div style={{backgroundColor: color, borderColor: color}}
                  className={getElement(`row-input`)}
                />
                <label className={getElement("row-input-label")}
                  htmlFor={`row-input-${label.label}`}>{label.label}</label>
              </div>
              <div className={getElement("row-right")}></div>
            </div>
      )
  }

  const getRows = () => {
    if (props.labels.length === 0)
      return <TableNoRows/>

    return props.labels.map(renderRow);
  }


  return <div className={getBlock()}>
    <div className={getElement("header-row")}>

      <p className={getElement("header-row-item row-middle")}>
        Categories Recognized
      </p>
      <p></p>
    </div>
    {getRows()}
  </div>
}
