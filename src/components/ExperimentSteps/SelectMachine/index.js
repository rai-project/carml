import React, { Component } from "react";
import { Layout, Col, Row } from "antd";
import { isArray, find, upperCase, uniqBy } from "lodash";
import yeast from "yeast";
import { withRouter } from "react-router-dom";
import SelectableCard from "../SelectableCard/index";
import { FrameworkAgents } from "../../../swagger";
import { ExperimentContext } from "../../../context/ExperimentContext";
import ExperimentContentTitle from "../ExperimentContentTitle";

const { Content } = Layout;

class SelectMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if (this.props.context.machineManifests === null) {
      try {
        // todo: need to filter based on what is selected
        const req = await FrameworkAgents({
          frameworkName: "*",
          frameworkVersion: "*"
        });
        this.props.context.setMachineManifests(req.agents);
      } catch (err) {
        console.error(err);
      }
    }
  }

  render() {
    const machineManifests = uniqBy(
      this.props.context.machineManifests,
      e => e.hostname
    );
    if (!isArray(machineManifests)) {
      return <div />;
    }
    return (
      <Layout>
        <Content>
          <ExperimentContentTitle text="Select the machine" />

          <div style={{width: "90%", margin: "auto"}}>
            <Row gutter={16}>
              {machineManifests.map((item, index) => {
                let { gpuinfo } = item;
                try {
                  gpuinfo = JSON.parse(gpuinfo);
                } catch (e) {
                  gpuinfo = null;
                }
                return (
                  <Col key={yeast()} sm={8} xs={24} style={{ padding: "10px" }}>
                    <SelectableCard
                      title={upperCase(item.architecture)}
                      content={
                        <>
                          <ul>
                            <li>
                              <b>Hostname:</b> {item.hostname}
                            </li>
                            <li>
                              <b>GPU:</b>{" "}
                              {gpuinfo ? gpuinfo.gpus[0].product_name : null}
                            </li>
                          </ul>
                        </>
                      }
                      tooltip={false}
                      onClick={() =>
                        this.props.context.addMachine(item.architecture)
                      }
                      selected={find(
                        this.props.context.machines,
                        e => e.name === item.architecture
                      )}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(props => (
  <ExperimentContext.Consumer>
    {context => <SelectMachine {...props} context={context} />}
  </ExperimentContext.Consumer>
));
