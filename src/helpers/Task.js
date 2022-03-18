export default class Task {
  static classification = new Task('Classification', 'This model is trained to recognize a single object in an image');
  static boundingbox = new Task('Object Detection', '[insert object detection description here]');
  static semanticsegment = new Task('Semantic Segmentation', '[insert semantic segmentation description here]');
  static instancesegment = new Task('Instance Segmentation', '[insert instance segmentation description here]');
  static image = new Task('Image Enhancement', '[insert image enhancement description here]');

  constructor(taskName, taskDescription) {
    this.name = taskName;
    this.description = taskDescription;
  }
}