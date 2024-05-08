import React from "react";

export function QuickMultiInputTabContent(props) {
  let {tabIndex, tab} = props;
  let Component = tab.component || (() => {
    return <div/>
  });
  let className = 'tab';
  if (props.tabIsSelected(tabIndex)) className += " tab--selected";

  return (
    <div 
        key={tabIndex} 
        className={props.getElement(className)} 
        role="tabpanel" 
        aria-labelledby={`${tab.id}`}
        id={`${tab.id}-panel-${props.inputIndex}`}>
        {/* Note: 'multiple' below refers to URL tab allowing multiple urls for a single input */}
        <Component 
            multiple={props.multiple ?? false} 
            addInput={props.addInput} 
            removeInput={props.removeInput}
            inputSelected={props.selectInput} 
            task={props.model.output.type}
            values={props.selectedInputs} {...tab.props} 
            inputIndex={props.inputIndex}
            input={props.input}
        />
    </div>
  )
}
