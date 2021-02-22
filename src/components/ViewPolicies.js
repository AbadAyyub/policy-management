import React, { Component } from "react";
import Table from "react-bootstrap/Table";

import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";

import axios from "axios";

import ReactDOMServer from "react-dom/server";

class ViewPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: [],
    };
  }

  componentDidMount() {
    let userId = this.props.userid;
    console.log("userid", userId);
    axios
      .get(`http://localhost:3001/policies/?userid=${userId}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          policies: [...res.data],
        });
      });
  }

  printDocument = () => {
    const input = document.getElementById("divToPrint");
    //const divLayOut = '<div id="divToPrint" className="mt4 printLayOut"></div>';
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);

      // pdf.output('dataurlnewwindow');

      //pdf.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
      pdf.save("download.pdf");
    });
  };

  render() {
    return (
      <div>
        <div className="mb5">
          <button className="btn btn-primary" onClick={this.printDocument}>
            Download Policy Info
          </button>
        </div>
        <div id="divToPrint" className="mt4 printLayOut">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Policy Type</th>
                <th>Policy Amount</th>
                <th>Date of Active</th>
                <th>Duration of Policy</th>
              </tr>
            </thead>

            <tbody>
              {this.state.policies.map((policy, index) => (
                <tr key={index}>
                  <td>{policy.policytype}</td>
                  <td>{policy.policyamount}</td>
                  <td>{policy.effectivedate}</td>
                  <td>{policy.policyduration}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ViewPolicy;
