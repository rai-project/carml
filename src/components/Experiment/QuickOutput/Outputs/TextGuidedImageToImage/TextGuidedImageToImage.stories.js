import QuickOutput from "../../QuickOutput";
import TextGuidedImageToImageOutput from "./TextGuidedImageToImageOutput";
import { TestTextGuidedImageToImage } from "./testData/testTextGuidedImageToImageOutput";

export default {
    title: "Experiments/Quick Output/Text Guided Image to Image",
    component: TextGuidedImageToImageOutput
};

const Template = (args) => <QuickOutput {...args} />;

export const Default = Template.bind({});

Default.args = { trialOutput: TestTextGuidedImageToImage, hideHeader: true, };