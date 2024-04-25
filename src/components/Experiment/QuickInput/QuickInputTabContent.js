import React from "react";

export function QuickInputTabContent(props) {
  let {index, tab} = props;
  let Component = tab.component || (() => {
    return <div/>
  });
  let className = 'tab';
  if (props.tabIsSelected(index)) className += " tab--selected";

  // Note: Multiple here refers to URL tab allowing multiple uploads
  return (
    <div key={index} className={props.getElement(className)} role="tabpanel" aria-labelledby={`${tab.id}`}
         id={`${tab.id}-panel`}>
      <Component multiple={props.multiple ?? false} addInput={props.addInput} removeInput={props.removeInput}
                 inputSelected={props.selectInput} task={props.model.output.type}
                 values={props.selectedInputs} {...tab.props} />
    </div>
  )
}
