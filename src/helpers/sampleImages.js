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
  ],
  [
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
  ]
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
  },
  {
    title: "automatic-speech-recognition-input(2).flac",
    src: "https://xlab1.netlify.app/automatic-speech-recognition-input.flac"
  },
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
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  ]
];
export const SampleTextGuidedImagetoImageInputs = [
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
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  ]
];