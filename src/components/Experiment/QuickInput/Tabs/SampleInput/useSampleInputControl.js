import {useState} from "react";
import {QuickInputType} from "../../quickInputType";
import Task from "../../../../../helpers/Task";

export default function useSampleInputControl(props) {
  console.log('useSampleInputControl', props)
  const task = Task.getStaticTask(props.task);

  const [selectedIndex, setSelectedIndex] = useState([]);

  const isSelected = (input) => props.type === QuickInputType.Image ? selectedIndex.indexOf(input.src) > -1 : selectedIndex.indexOf(input) > -1;
  const isUnselected = (input) => selectedIndex.length >= 0 && props.type === QuickInputType.Image ? selectedIndex.indexOf(input.src) === -1 : selectedIndex.indexOf(input) === -1;

  const selectInput = (index) => {
    let input = '';
    if (task.useMultiInput) {
      input = props.type === QuickInputType.Image ? 
        props.sampleInputs[props.inputIndex][index].src : 
        props.sampleInputs[props.inputIndex][index];
    } else {
      input = props.type === QuickInputType.Image ?
          props.sampleInputs[index].src :
          props.sampleInputs[index];
    }

      // const input = props.type === QuickInputType.Image ?
      //     props.sampleInputs[index].src :
      //     props.sampleInputs[index];

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

  return {selectedIndex, selectInput, isSelected, isUnselected, type};
}
