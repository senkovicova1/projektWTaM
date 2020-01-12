import React, {Component} from 'react';
import {rebase} from "../index";
import { Input, Button, Alert  } from "reactstrap";
import firebase from 'firebase';
import Select from 'react-select';

import { connect } from "react-redux";

import FileUploader from "react-firebase-file-uploader";

import arrow from '../scss/arrow.jpg';

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

const style = {
  position: "absolute",
  height: "100px",
  width: '150px',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  borderRadius: "10px",
  boxShadow: "7px 7px 7px #555 inset",
  color: 'white',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  objectFit: "fill"
}

const y = 0;


class AddReaction extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      category: null,
      reaction: [null, null, null, null], //[{url, type: u/d/m}],

      isUploading: false,
      counts: null,

      saved: false,
    }
    this.submit.bind(this);

    this.removeImg.bind(this);
    this.changedCategory.bind(this);
    this.handleUploadStart.bind(this);
    this.handleProgress.bind(this);
    this.handleUploadError.bind(this);
    this.handleUploadSuccess.bind(this);
  }

  componentDidMount(){
    rebase.get("counts", {
      context: this,
    }).then(data => {
      this.setState({
        counts: {...data[0], temp: 0},
      });
    }).catch(err => {
    });
  }

  submit(){
    let body = {
      name: this.state.name,
      result: this.state.reaction.map((r, index) => (r !== null ? (parseInt(this.state.counts[this.state.category.value]) + 1 + index).toString() : null)).filter(x => x).join("-"),
      structure: this.state.reaction.map((r, index) => (r !== null ? ((index-1) % 3 === 0 ? "u" : ((index-2) % 3 === 0 ? "d" : "m" )) : null)).filter(x => x).join("-"),
    }

		if (this.state.category.value === 'balancing'){
			body["show"] = body.result.split("-")[0];
			body["question"] = 'Balance the following chemical equation using the smallest possible coefficients. A "blank" coefficient is equivalent to "1".';
		}

    let newCounts = {...this.state.counts};
    newCounts[this.state.category.value] = this.state.counts[this.state.category.value] + this.state.reaction.length;

    rebase.addToCollection((this.state.category.value !== "organicChemistrySynthesis" ? this.state.category.value : "results"), body)
    .then((reaction) => {
      rebase.updateDoc('counts/MszjsdeErfZclNryTGgA', newCounts)
        .then(() => {
							this.setState({
								saved: true,
								name: "",
								category: null,
								reaction: [null, null, null, null],

								isUploading: false,
								counts: newCounts,
							})
        }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
    console.log(err);
  });

  }

  handleUploadStart(index){
    this.setState({ isUploading: true });
  }
  handleProgress(index){
  }
  handleUploadError(index, error){
    this.setState({ isUploading: false });
    console.error(error);
  }
  handleUploadSuccess(index, filename){
    this.setState({ isUploading: false });
    firebase
      .storage()
      .ref(this.state.category.value)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        let newReaction = [...this.state.reaction];
        newReaction[index] = url;
        this.setState({
          reaction: newReaction,
        })
      })
  }

  removeImg(index){
    let newReaction = [...this.state.reaction];
    newReaction[index] = null;
    this.setState({
      reaction: newReaction,
    })
  }

  changedCategory(c){
    this.setState({
      category: c,
      reaction: [null, null, null, null],
    })
  }

  enlargeReaction(){
    let newReaction = [...this.state.reaction, null, null, null];
    this.setState({
      reaction: newReaction,
    })
  }

  render(){
		if (!this.props.loggedIn) {
			return(<div></div>)
		}

    let arrows = Array.from({length: Math.floor((this.state.reaction.length - 1)/3)}, (v, i) => "-");

    let len = this.state.reaction.length;
    const positionLeft = 170 * ((len - 1) - (Math.floor((len-2)/3)));

    return(
      <div className="custom">
        <h1>
          Missing a reaction?
        </h1>
        <h2>
          Add one to our database!
        </h2>

        <Alert color="info" className="flex w-100 m-t-20" isOpen={this.state.saved} toggle={() => this.setState({saved: false})}>
              Your reaction was successfully saved!
        </Alert>

        <div className="reaction-form">
          <div className="row">
            <label className="m-r-10">The name of your reaction:</label>
            <div className="flex">
              <Input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
            </div>
          </div>

          <div className="row m-t-10 select">
            <label className="m-r-10">Which category does this reaction belong to?</label>
            <Select
              className="flex"
              value={this.state.category}
              onChange={(c) => this.changedCategory(c)}
              options={STORAGES}
              style={selectStyle}
              />
          </div>
          {this.state.category === null &&
            <div className="row">
              <label className="note">*Note: Changing category later will reset the reaction.</label>
              <label className="error">You can't add compounds unless the category is chosen!</label>
            </div>
          }

          {this.state.category !== null &&
            <div className="row">
              <label className="note">*Note: Changing category later will reset the reaction.</label>
            </div>
          }

          <div className="row m-t-10">
            <label className="m-r-10">Now let's create your reaction!</label>
          </div>

          <div className="row">
            <label className="note">*Note: You don't have to fill in parts above and below the arrow, if your reaction lack those.</label>
            <label className="note">If you accidentally enlarge your reaction, you can simply leave the ends epmty.</label>
          </div>

					<div className="row">
            <label className="note">Reactants should be placed above the arrow and the conditions should go below.</label>
          </div>


          <div className="dustbin m-t-20">
            <div className="rel" style={{position: "relative", paddingBottom:"300px"}}>
            {
              this.state.reaction.map((r, index) => {
                let diff = 0;
                if (index >= 3) {
                  if ((index-1) % 3 === 0){
                   diff += (1* ((index-1)/3));
              } else if ((index-2) % 3 === 0){
                    diff += (1* ((index-2)/3));
                  } else {
                    diff += 1 + (1* ((index-3)/3));
                  }
                }
                const typeStyle = {
                  "m": {
                    left:  150*(index - diff) + 20*(index - diff)  + "px",
                    top: 100 + y +"px",
                  },
                  "u": {
                    left: 150*(index - diff) + 20*(index - diff)  + "px",
                    top: y +"px",
                  },
                  "d": {
                    left: 150*(index - diff-1) + 20*(index - diff-1)  + "px",
                    top: 170 + y +"px"
                  },
                }
                let type = ((index-1) % 3 === 0 ? "u" : ((index-2) % 3 === 0 ? "d" : "m"))
                return (
                  <div style={{ ...style, backgroundColor: "#FFF", border: "1px solid #555", ...typeStyle[type],  }}>
                    {r !== null &&
                      <img
                        style={{width: "150px", height: "100px", objectFit: "fill", borderRadius: "10px", border: "1px solid #555"}}
                        src={r}
                        key={r}
                        alt={"url"} />}
                    {r !== null &&
                      <Button className="remove-img" onClick={() => this.removeImg(index)}>X</Button>}
                    {r === null &&
                     this.state.category !== null &&
                      <FileUploader
                        accept="image/*"
                        name="avatar"
                        filename={file => (parseInt(this.state.counts[this.state.category.value]) + 1 + index)}
                        storageRef={firebase.storage().ref(this.state.category.value)}
                        onUploadStart={() => this.handleUploadStart(index)}
                        onUploadError={(error) => this.handleUploadError(index, error)}
                        onUploadSuccess={(filename) => this.handleUploadSuccess(index, filename)}
                        onProgress={() => this.handleProgress(index)}
                      />}
                  </div>
                )
              })
            }
            <Button className="enlarge-reaction" style={{ position: "absolute", top: '100px', left: `${positionLeft}px`}} onClick={() => this.enlargeReaction()}>+</Button>

            {
              arrows.map((a, index) =>
                {
                  let l = 170 + 150*(index*2) + 20*index*2;
                  return (
                    <div key={index} style={{ position: "absolute", left: l, top: '130px'}}>
                      <img src={arrow} alt="img" height="40px" width="150px" style={{display: "block",  marginLeft: "auto",  marginRight: "auto", borderRadius: "10px", border: "0px solid #555"}}/>
                    </div>
                  )
                }
              )
            }
            </div>
          </div>

          <Button
            color="success"
            disabled={!this.state.name ||
							!this.state.category ||
							(
								((this.state.reaction.some((r, index) => (index -1) % 3 === 0 && r !== null) ||
									this.state.reaction.some((r, index) => (index -2) % 3 === 0 && r !== null)) &&
									this.state.reaction.some((r, index) => index % 3 === 0 && r === null)
								)
								||
							 !(this.state.reaction[0] !== null && this.state.reaction.filter((r,index) => index !== 0).every((r, index) => r === null))
							)
						}
            onClick={() => this.submit()}>
            Save!
          </Button>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (store) => {
  const { loggedIn} = store;
  return { loggedIn};
};

export default connect(mapStateToProps, {})(AddReaction);
