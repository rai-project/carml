import StyleTransferContent from "../resources/taskSample/styleTransferContent.jpg";
import StyleTransferStyle from "../resources/taskSample/styleTransferStyle.jpg";
import Chairs from "../resources/taskSample/imageTo3D1.png";
// import Drums from "../resources/taskSample/imageTo3D2.png";

export const SampleImageEnhancementInputs = [
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/license-plate.png",
    alt: "car with license plate",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/forest-mountaings.png",
    alt: "mountain with a forest",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/yellow-bird.png",
    alt: "yellow bird",
  },
];
export const SampleSegmentationInputs = [
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/bicycle.png",
    alt: "bicycle",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/plane.png",
    alt: "airplane",
  },

  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/cats-dogs.png",
    alt: "cat and dog",
  },
];

export const SampleImageClassificationInputs = [
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/birdy.png",
    alt: "bird",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
    alt: "cat",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/crabby.png",
    alt: "crab",
  },
];

export const SampleObjectDetectionInputs = [
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/obj-1.jpg",
    alt: "people sitting around a table",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/obj-2.jpg",
    alt: "storefront of a restaurant",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/obj-3.jpg",
    alt: "crosswalk",
  },
];

export const SampleInstanceSegmentationInputs = [
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/person-dog.jpg",
    alt: "person with a dog",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/puppies.jpg",
    alt: "puppies",
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/plane-blue.jpg",
    alt: "airplane",
  },
];

export const SampleStyleTransferInputs = [
  [
    {
      src: StyleTransferContent,
      alt: "yellow dog",
    },
  ],
  [
    {
      src: StyleTransferStyle,
      alt: "painting"
    },
  ]
];

export const SampleImageTo3DInputs = [
  [
    {
      src: Chairs,
      alt: "chairs",
    },
    // {
    //   src: Drums,
    //   alt: "drums",
    // },           
  ],
];

export const SampleTextInputs = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
];

export const SampleTextToCodeInputs = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
];

export const SampleAudioToTextInputs = [
  {
    title: "automatic-speech-recognition-input.flac",
    src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac"
  }
];

export const SampleTextConversationInputs = [
  "Show me a recipe for pizza",
  "What is the weather tomorrow?",
  "What is the meaning of life?",
];
export const SampleVisualQuestionAnsweringInputs = [
  [{
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/birdy.png",
    alt: "bird"
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
    alt: "cat"
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/crabby.png",
    alt: "crab"
  }
  ],
  [
    "What is the color of the bird?",
    "What is the animal in the image?",
    "Where is the crab?"
  ]
];
export const SampleTextGuidedImageToImageInputs = [
  [{
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/birdy.png",
    alt: "bird"
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
    alt: "cat"
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/crabby.png",
    alt: "crab"
  }
  ],
  [
    "Replace the background with a beach.",
    "Make the animal look like a cartoon.",
    "Make the image look like a painting."
  ]
];
export const SampleDocumentQuestionAnsweringInputs = [
  [{
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/birdy.png",
    description: "Bird"
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
    description: "Cat"
  },
  {
    src: "https://xlab1.netlify.app/samples/PDF/invoice.pdf",
    description: "Sample Invoice"
  }
  ],
  [
    "What is the color of the bird?",
    "What is the animal in the image?",
    "What is the total amount in the invoice?"
  ]
];

export const SampleTextToImageInputs = [
  "Cat and dog playing",
  "Flower in a garden",
  "Sunset on a beach"
];
export const SampleTextToVideoInputs = [
  "Cat and dog playing",
  "Flower in a garden",
  "Sunset on a beach"
];

export const SampleImageToTextInputs = [
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/birdy.png",
    alt: "bird"
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/kitty.png",
    alt: "cat"
  },
  {
    src: "https://s3.amazonaws.com/uploads.staging.mlmodelscope.org/crabby.png",
    alt: "crab"
  }
];

export const SampleTextTo3DInputs = [
  "a cool drum set"
];

export const SampleTextClassificationInputs = [
  "The weather is very pleasant today.",
  "The ending of the movie was sad.",
  "There is a car parked there."
];

export const SampleAudioToAudioInputs = [
  {
    title: "audio1.flac",
    src: "https://xlab1.netlify.app/audio-to-audio-input.flac"

  },
  {
    title: "audio2.flac",
    src: "https://xlab1.netlify.app/audio-to-audio-input.flac"

  },
  {
    title: "audio3.flac",
    src: "https://xlab1.netlify.app/audio-to-audio-input.flac"

  },
];
export const SampleAudioClassificationInputs = [
  {
    title: "audio1.flac",
    src: "https://xlab1.netlify.app/audio-classification-input.flac"

  },
];
export const SampleTextToAudio = [
  "Waves at a beach",
  "Traffic noise",
  "Roar of a tiger"
];
