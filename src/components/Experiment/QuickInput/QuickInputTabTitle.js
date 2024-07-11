import React from "react";

export function QuickInputTabTitle(props) {
  let { tab, index } = props;

  let className = 'tab-title';
  if (props.tabIsSelected(index)) className += " tab-title--selected";

  return (
    <button key={index}
      className={props.getElement(className)}
      role="tab"
      aria-controls={`${tab.id}-panel`}
      aria-selected={`${props.tabIsSelected(index)}`}
      id={tab.id}
      onClick={() => {
        props.selectTab(index);
        props?.inputPreviewProps?.setURLValidity(false);
        props?.inputPreviewProps?.setSelectedInputSrc(null);
      }}
    >
      {tab.title}
    </button>
  );
}
