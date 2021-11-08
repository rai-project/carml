import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import withSizes from "react-sizes";

import C3SRLogo from "@resources/logo/logo-c3sr.png";
import { ReactComponent as IBMLogo } from "@resources/logo/logo-ibm.svg";
import { ReactComponent as UIUCLogo } from "@resources/logo/logo-uiuc.svg";

const { Footer } = Layout;

//@withSizes(({ width }, { breakpoint }) => ({ isMobile: width < breakpoint }))
class GlobalFooter extends Component {
  render() {
    const { isMobile } = this.props;
    return (
      <Footer
        className="DarkBlue"
        style={{
          verticalAlign: "middle",
          height: "auto",
          padding: "0px",
        }}
      >
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col sm={{ span: 4, offset: 1 }} xs={{ span: 8 }}>
            <a href="https://c3sr.com">
              <img src={C3SRLogo} style={{ height: "3rem", marginLeft: "10%" }} />
            </a>
          </Col>

          {isMobile ? null : (
            <React.Fragment>
              <Col sm={{ span: 2 }} xs={{ span: 4 }}>
                {/* <a href="https://github.com/c3sr" style={{ color: "white" }}>
              GitHub
            </a> */}
              </Col>
              <Col
                sm={{ span: 2 }}
                xs={{ span: 4 }}
                style={{ color: "white", height: "auto" }}
              >
                {/* Terms */}
              </Col>
              <Col sm={{ span: 2 }} xs={{ span: 4 }} style={{ color: "white" }}>
                {/* Privacy */}
              </Col>
              <Col sm={{ span: 2 }} xs={{ span: 4 }} style={{ color: "white" }}>
                {/* Copyright */}
              </Col>
              <Col
                lg={{ span: 2, offset: 6 }}
                sm={{ span: 2, offset: 4 }}
                xs={{ span: 4, offset: 24 }}
                style={{ color: "white" }}
              >
                <a href="https://ibm.com">
                  <IBMLogo style={{ height: "2rem" }} />
                </a>
              </Col>
              <Col sm={{ span: 2 }} xs={{ span: 4 }} style={{ color: "white" }}>
                <a href="http://impact.crhc.illinois.edu">
                  <UIUCLogo style={{ height: "2rem" }} />
                </a>
              </Col>
            </React.Fragment>
          )}
          {/*
        <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a>
        from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a>
         is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        */}
        </Row>
      </Footer>
    );
  }
}


const mapSizesToProps = ({ width }, { breakpoint }) => ({ isMobile: width < breakpoint });

export default withSizes(mapSizesToProps)(GlobalFooter);
