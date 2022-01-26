import React, { Component } from "react";
import Konva from "konva";
import { Stage, Layer, Image, Label, Text, Tag, Rect } from "react-konva";
import { filter, split, capitalize } from "lodash";
import { Row, Col, Table } from "antd";
import PercentageStep from "./PercentageStep";
import Imagejs from "image-js";
import yeast from "yeast";

const colors = [
  "#e84a27", // UI Orange
  "#33a02c", // Green
  "#e22f2f", // Red
  "#6a3d9a", // Purple
  "#1f78b4", // Light Blue
  "#b15928", // Brown
  "#1a263a", // UI Dark Blue
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
  var color = new Array(4)
  for (var i = 0; i < 3; i++) {
    color[i] = getRandomInt(225);
  }
  color[3] = 255;
  return color;
}

class BBoxLabel extends Component {
  render() {
    return (
      <React.Fragment>
        <Label x={this.props.x} y={this.props.y - 14}>
          <Tag fill={this.props.color} />
          <Text text={this.props.text} fill="white" fontSize={14} />
        </Label>
      </React.Fragment>
    );
  }
}

class Mask extends Component {
  constructor(props) {
    super(props);
    this.imageWidth = props.width;
    this.imageHeight = props.height;
    this.color = props.color;
    this.floatmask = props.instance_segment.float_mask;
    this.instanceWidth = props.instance_segment.width;
    this.instanceHeight = props.instance_segment.height;
    this.maskImage = new Array(this.floatmask.length * 4);
  }

  convertFloatMaskToImage() {
    var white = [255, 255, 255, 0];
    for (let i = 0; i < this.floatmask.length; i++) {
      var color = this.floatmask[i] >= 0.5 ? this.color : white;
      this.maskImage[i*4] = color[0];
      this.maskImage[i*4+1] = color[1];
      this.maskImage[i*4+2] = color[2];
      this.maskImage[i*4+3] = color[3];
    }
  }

  render() {
    this.convertFloatMaskToImage();
    var img = new Imagejs(this.instanceWidth, this.instanceHeight, this.maskImage, {kind: "RGBA"})
    var image = new window.Image();
    image.src = img.toDataURL();
    var x1 = Math.round(this.props.instance_segment.xmin * this.imageWidth);
    var x2 = Math.round(this.props.instance_segment.xmax * this.imageWidth);
    var y1 = Math.round(this.props.instance_segment.ymin * this.imageHeight);
    var y2 = Math.round(this.props.instance_segment.ymax * this.imageHeight);
    return(
      <Image
        key={yeast()}
        id={this.props.id}
        image={image}
        x={x1}
        y={y1}
        width={x2-x1}
        height={y2-y1}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      />
    )
  }
}

export default class InstanceSegmentationResult extends Component {
  constructor(props) {
    super(props);
    var filteredFeatures = filter(props.features, function(o) {
      return o.probability >= 0.95;
    });
    var maskColors = [];
    for (var i = 0; i < filteredFeatures.length; i++) {
      maskColors.push(getRandomColor())
    }
    this.state = {
      image: null,
      width: (window.innerWidth - 380)/2,
      height: null,
      mouseOn: null,
      filterValue: 0.95,
      filteredFeatures: filteredFeatures,
      maskColors: maskColors,
    };
  }

  componentDidMount() {
    this.loadImage();
  }

  componentWillUnmount() {
    this.state.image.removeEventListener("load", this.handleLoad);
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    var image = new window.Image();
    image.src = this.props.imgUrl;
    image.addEventListener("load", this.handleLoad);
    this.setState({ image: image })
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      height: (this.state.width / this.state.image.width) * this.state.image.height,
    });
    console.log(this.state.width);
    console.log(this.state.height);
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.state.imageNode.getLayer().batchDraw();
  };

  probabilityToPercentage(probability) {
    return (probability * 100).toFixed(0) + "%";
  }

  handleMouseEnter = e => {
    console.log(e);
    if (e.currentTarget.attrs.id !== this.state.mouseOn) {
      this.setState({ mouseOn: e.currentTarget.attrs.id });
    }
  };

  handleMouseLeave = e => {
    console.log("Mouse Leave");
    this.setState({ mouseOn: null });
  };

  renderBBox() {
    if (this.state.height === null) {
      return null;
    }

    var colorMap = {};
    var currentColorIndex = 0;
    var mouseOn = this.state.mouseOn;
    return this.state.filteredFeatures.map((data, index) => {
      var bbox = data["instance_segment"];
      var x1 = Math.round(bbox.xmin * this.state.width);
      var x2 = Math.round(bbox.xmax * this.state.width);
      var y1 = Math.round(bbox.ymin * this.state.height);
      var y2 = Math.round(bbox.ymax * this.state.height);
      var text = bbox.label + ": " + this.probabilityToPercentage(data.probability);
      if (!(bbox.index in colorMap)) {
        colorMap[bbox.index] = colors[currentColorIndex];
        currentColorIndex++;
      }
      var color = colorMap[bbox.index];
      return (
        <React.Fragment key={yeast()}>
          <Rect
            id={index}
            x={x1}
            y={y1}
            width={x2 - x1}
            height={y2 - y1}
            fillEnabled="false"
            stroke={color}
            strokeWidth={5}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
          {mouseOn === index && <BBoxLabel x={x1} y={y1} text={text} color={color} />}
        </React.Fragment>
      );
    });
  }

  renderInstanceMask() {
    var width = this.state.width;
    var height = this.state.height;
    var maskColors = this.state.maskColors;
    return this.state.filteredFeatures.map((data, index) => {
      return(
        <Mask
          key={index}
          id={index}
          instance_segment={data["instance_segment"]}
          width={width}
          height={height}
          color={maskColors[index]}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      )
    })
  }

  renderTable() {
    const columns = [{
      title: 'Class Index',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: 'Class Label',
      dataIndex: 'label',
      key: 'label',
    }, {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
    }];

    function processLabel(label) {
      label = split(label, " ", 2)
      return capitalize(label[1])
    }

    var dataSource = this.state.filteredFeatures.map((d, index) => {
      return (
        {
          key: index,
          index: d.instance_segment.index,
          label: processLabel(d.instance_segment.label),
          probability: d.probability,
        }
      )
    })

    return(
      <Table
        style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}
        pagination={false}
        size={"small"}
        dataSource={dataSource}
        columns={columns}
        onRow={(record, index) => {
          return {
            onMouseEnter: (event) => {this.setState({mouseOn: index})},  // 鼠标移入行
            onMouseLeave: (event) => {this.setState({mouseOn: null})}
          }
        }}
        rowSelection={{selectedRowKeys: [this.state.mouseOn]}}
      />
    )
  }

  handleChangeFilter = (value) => {
    console.log(this.props.features)
    var filteredFeatures = filter(this.props.features, function(o) {
      return o.probability >= value;
    });
    var maskColors = this.state.maskColors;
    for (var i = maskColors.length; i < filteredFeatures.length; i++) {
      maskColors.push(getRandomColor())
    }
    this.setState({
      filterValue: value,
      filteredFeatures: filteredFeatures,
      maskColors: maskColors
    })
  }

  render() {
    if (this.state.height === null) {
      return null;
    }

    var filterValue = this.state.filterValue;

    return (
      <React.Fragment>
        <PercentageStep
          min={50}
          max={100}
          default={filterValue}
          onChange={this.handleChangeFilter}
        />
        <Row style={{marginTop: "20px"}}>
          <Col span={12}>
            <Stage width={this.state.width} height={this.state.height}>
              <Layer listening={false}>
                {/* For Local Test */}
                {/* <URLImage src="https://i.imgur.com/rZuyMXF.jpg" x={100} y={50} features={this.props.features}/> */}
                <Image
                  image={this.state.image}
                  x={0}
                  y={0}
                  width={this.state.width}
                  height={this.state.height}
                />
                {this.renderBBox()}
              </Layer>
              <Layer opacity={0.7}>
                {this.renderInstanceMask()}
              </Layer>
            </Stage>
          </Col>
          <Col span={12}>
            {this.renderTable()}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
