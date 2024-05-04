import {useEffect, useState} from "react";
import {QuickInputType} from "../../quickInputType";
import Task from "../../../../../helpers/Task";

export default function useSampleInputControl(props) {
  // console.log('useSampleInputControl', props)

  const task = Task.getStaticTask(props.task);

  const [selectedIndex, setSelectedIndex] = useState([]);

  const isSelected = (input) => props.type === QuickInputType.Image ? selectedIndex.indexOf(input.src) > -1 : selectedIndex.indexOf(input) > -1;
  const isUnselected = (input) => selectedIndex.length >= 0 && props.type === QuickInputType.Image ? selectedIndex.indexOf(input.src) === -1 : selectedIndex.indexOf(input) === -1;

  useEffect(() => {
    // const selected = Array.from(selectedIndex);  // This is the array of selected image urls
    // console.log('selected', selected);
  }, [selectedIndex])

  const selectMultiInput = (selectedValueIndex) => {
    // Currently using both new and old way of handling inputs but should refactor in the future
    let input = props.type === QuickInputType.Image ? 
        props.sampleInputs[props.inputIndex][selectedValueIndex].src : 
        props.sampleInputs[props.inputIndex][selectedValueIndex];

    // console.log('sampleInputControl multiInput index', selectedValueIndex)
    // console.log('props.inputIndex', props.inputIndex)
    // NEXT: How to get more than one thing in the array at a time
    
    // Everything below here is directly copied
    const selected = Array.from(selectedIndex);  // This is the array of selected image urls
    
    // Don't need storedIndex?
    // let storedIndex = selected.indexOf(input);  // This is always -1
    // console.log('storedIndex', storedIndex);


    if (props.multiple) {
      // TODO: This was directly copied from selectInput and needs to be 
      // updated for useMultiInput
      
      // const selected = Array.from(selectedIndex);
      // let storedIndex = selected.indexOf(input);
      // if (storedIndex === -1) {
      //   selected.push(input);
      // } else {
      //   selected.splice(storedIndex, 1);
      // }
      // setSelectedIndex(selected);
      // if (typeof (props.inputSelected) === 'function')
      //   props.inputSelected(selected);
    } else {
       setSelectedIndex([input]);
       if (typeof(props.inputSelected) === 'function')
          // Always setting index to 0
          // Note: props.inputSelected is useQuickInputControl.selectMultiInput
          props.inputSelected(input, props.inputIndex);
    }
  }

  const selectInput = (index) => {
    const input = props.type === QuickInputType.Image ?
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
    type};
}
