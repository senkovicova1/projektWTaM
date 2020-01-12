import React, { Component } from 'react'
import {Button} from "reactstrap";
import Select from 'react-select';

const selectStyle = {
	control: base => ({
		...base,
		minHeight: 30,
		backgroundColor: 'white',
		borderRadius: 0
	}),
	dropdownIndicator: base => ({
		...base,
		padding: 4,
	}),
	clearIndicator: base => ({
		...base,
		padding: 4,
	}),
	multiValue: base => ({
		...base,
		backgroundColor: 'white',
		borderRadius: 0
	}),
	valueContainer: base => ({
		...base,
		padding: '0px 6px',
		borderRadius: 0
	}),
	input: base => ({
		...base,
		margin: 0,
		padding: 0,
		backgroundColor: 'inherit',
		borderRadius: 0
	}),
	indicatorSeparator: base => ({
		...base,
		width: 0,
	}),
};

const STORAGES = [{label: "Syntheses from organic chemistry", value: "organicChemistrySynthesis"},
                  {label: "Balancing chemical reactions", value: "balancing"},
                  {label: "Chemical compounds", value: "compounds"},]

export default class QuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {category: {label: "Syntheses from organic chemistry", value: "organicChemistrySynthesis"},selectedOption: 5};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);

  }
  handleChange(c){
    this.setState({
      category: c,
    })
  }


  handleSubmit(event) {
    this.props.startQuiz(this.state);
  }
  handleOptionChange(event) {
    this.setState({selectedOption: event.target.value});
  }

  render() {
    return (
      <form className="choose-form">
        <h1>Choose the number of questions and category:</h1>
        <div className="options">
          <div className="form-check">
            <label>
              <input
                type="radio"
                name="react-tips"
                value={5}
                checked={parseInt(this.state.selectedOption) === 5}
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
                checked={parseInt(this.state.selectedOption) === 10}
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
                checked={parseInt(this.state.selectedOption) === 20}
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
                checked={parseInt(this.state.selectedOption) === 10000}
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              Infinity mode
            </label>
          </div>
        </div>
        <label>
          <h2>Pick the wanted category:</h2>
          {/*<Select value={this.state.value} onChange={this.handleChange}>
            <option value="results">Organic chemistry</option>
            <option value="balancing">Balancing equations</option>
            <option value="compounds">Chemical compounds</option>
          </Select>*/}
          <Select
            className="flex"

            value={this.state.category}
            onChange={(c) => this.handleChange(c)}
            options={STORAGES}
            style={selectStyle}
            />
        </label>

        <Button color="success" onClick={() => this.handleSubmit()}>Start quiz</Button>
      </form>
    );
  }
}
