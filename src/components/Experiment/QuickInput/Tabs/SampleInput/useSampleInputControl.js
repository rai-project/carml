import {useState} from "react";
import {QuickInputType} from "../../quickInputType";
import Task from "../../../../../helpers/Task";

export default function useSampleInputControl(props) {
  const task = Task.getStaticTask(props.task);
  const sampleInputType = (task.useMultiInput ? (Task.getStaticTask(props.task).inputs[props.inputIndex]?.inputType) : props.type)?.toLowerCase();

  const [selectedIndex, setSelectedIndex] = useState([]);

  const isSelected = (input) => sampleInputType === QuickInputType.Image ? selectedIndex.indexOf(input.src) > -1 : selectedIndex.indexOf(input) > -1;
  const isUnselected = (input) => selectedIndex.length >= 0 && sampleInputType === QuickInputType.Image ? selectedIndex.indexOf(input.src) === -1 : selectedIndex.indexOf(input) === -1;
  const selectMultiInput = (selectedValueIndex) => {


    // Note: Currently using both new and old way of handling inputs but should refactor in the future
    let input = sampleInputType === QuickInputType.Image ? 
        props.sampleInputs[props.inputIndex][selectedValueIndex].src : 
        props.sampleInputs[props.inputIndex][selectedValueIndex];

    if (props.multiple) {
      // TODO: This block was directly copied from selectInput
      // and may need to be updated for useMultiInput
      
      const selected = Array.from(selectedIndex);
      let storedIndex = selected.indexOf(input);
      if (storedIndex === -1) {
        selected.push(input);
      } else {
        selected.splice(storedIndex, 1);
      }
      setSelectedIndex(selected);
      if (typeof (props.inputSelected) === 'function')
        props.inputSelected(selected);
    } else {
       setSelectedIndex([input]);
       if (typeof(props.inputSelected) === 'function')
          // Note: props.inputSelected is useQuickInputControl.selectMultiInput
          props.inputSelected(input, props.inputIndex);
    }
  }

  const selectInput = (index) => {
    const input = sampleInputType === QuickInputType.Image ?
        props.sampleInputs[index].src :
      props.sampleInputs[index];
    
    if (props.multiple) {
      const selected = Array.from(selectedIndex);
      let storedIndex = selected.indexOf(input);
      if (storedIndex === -1) {
        selected.push(input);
      } else {
        selected.splice(storedIndex, 1);
      }
      setSelectedIndex(selected);
      if (typeof (props.inputSelected) === 'function')
        props.inputSelected(selected);
    } else {
       setSelectedIndex([input]);
       if (typeof(props.inputSelected) === 'function')
         props.inputSelected(input, 0);
    }
  }

  const {type} = props;
  return {
    selectedIndex, 
    selectInput: !task.useMultiInput ? selectInput : selectMultiInput, 
    isSelected, 
    isUnselected, 
    type,
    sampleInputType
  };

}
