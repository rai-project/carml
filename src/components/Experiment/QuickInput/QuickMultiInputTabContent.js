import React from "react";

export function QuickMultiInputTabContent(props) {
    console.log('QuickMultiInputTabContent props', props)
    // console.log(props.input)

  let {index, tab} = props;
  let Component = tab.component || (() => {
    return <div/>
  });
  let className = 'tab';
  if (props.tabIsSelected(index)) className += " tab--selected";

  return (
    <div 
        key={index} 
        className={props.getElement(className)} 
        role="tabpanel" 
        aria-labelledby={`${tab.id}`}
        id={`${tab.id}-panel`}>
        {/* Note: 'multiple' below refers to URL tab allowing multiple uploads */}
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
