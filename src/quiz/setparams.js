import React, { Component } from 'react'
import Wrapper from "./wrapper";
import {Button} from "reactstrap";

export default class QuizForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "results", selectedOption: 5};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('Your favorite flavor is: ' + this.state.value + '         you chose: ' + this.state.selectedOption);
    //event.preventDefault();
    console.log(this.state);
    this.props.startQuiz(this.state);
  }
  handleOptionChange(event) {
    console.log(event.target.value);
    this.setState({selectedOption: event.target.value});
  }

  render() {
    console.log(this.state.selectedOption);
    return (
      <form>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value={5}
              checked={this.state.selectedOption == 5}
              onChange={this.handleOptionChange}
              className="form-check-input"
            />
            5 Questions
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value={10}
              checked={this.state.selectedOption == 10}
              onChange={this.handleOptionChange}
              className="form-check-input"
            />
            10 Questions
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value={20}
              checked={this.state.selectedOption == 20}
              onChange={this.handleOptionChange}
              className="form-check-input"
            />
            20 Questions
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value={10000}
              checked={this.state.selectedOption == 10000}
              onChange={this.handleOptionChange}
              className="form-check-input"
            />
            Infinity mode
          </label>
        </div>
        <label>
          Pick the wanted category:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="results">Organic chemistry</option>
            <option value="balancing">Balancing equations</option>
            <option value="compounds">Chemical compounds</option>
          </select>
        </label>

        <Button onClick={() => this.handleSubmit()}>Start quiz</Button>
      </form>
    );
  }
}
