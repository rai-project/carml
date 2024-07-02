import TextGuidedImageToImageOutput from "./TextGuidedImageToImageOutput";
import { TestTextGuidedImageToImage } from "./testData/testTextGuidedImageToImageOutput";

export default {
    title: "Experiments/Quick Output/Text Guided Image to Image",
    component: TextGuidedImageToImageOutput
}
  
const Template = (args) => <TextGuidedImageToImageOutput {...args}/>
  
export const Default = Template.bind({});
  
Default.args = {trial: TestTextGuidedImageToImage};
  