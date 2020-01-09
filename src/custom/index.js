import React, {Component} from 'react';
import {rebase} from "../index";
import { Input, Button } from "reactstrap";
import firebase from 'firebase';

import FileUploader from "react-firebase-file-uploader";

import arrow from '../scss/arrow.jpg';

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


export default class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      category: "",
      reaction: [null, null, null, null], //[{url, type: u/d/m}]
    }
    this.removeImg.bind(this);
  }

  componentDidMount(){

  }
/*
<img
  style={{width: "150px", height: "100px", objectFit: "fill", marginLeft: "1%", marginRight: "1%", marginBottom: "1%", boxShadow: "7px 7px 7px #555", borderRadius: "10px", border: "1px solid #555"}}
  src={url}
  key={url}
  alt={"url"} />
*/

handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

handleProgress = progress => this.setState({ progress });

handleUploadError = error => {
  this.setState({ isUploading: false });
  console.error(error);
};

handleUploadSuccess = filename => {
/*  this.setState({ name: filename, progress: 100, isUploading: false });
  firebase
    .storage()
    .ref("lanwiki-note-pictures")
    .child(filename)
    .getDownloadURL()
    .then(url => {
      this.setState({ images: [...this.state.images, url], names: [...this.state.names, url] });
      this.setState({saving:true});
      rebase.addToCollection('/lanwiki-image-names', {name: filename});
    })*/
};

removeImg(index){

}

  render(){
    let arrows = /*this.state.reaction ? this.state.reaction.structure.match(/-/g).length : */["-"];
/*    if (this.state.reaction) {
      let u = this.state.reaction.structure.match(/m-u/g);
      let d = this.state.reaction.structure.match(/d-m/g);
      arrows -= ( (u !== null ? u.length : 0) + (d !== null ? d.length : 0));
    }*/

    return(
      <section>
        <h1>
          Missing a reaction?
        </h1>
        <h2>
          Add one to our database!
        </h2>

        <div className="reaction-form">
          <div className="row">
            <label className="m-r-10">The name of your reaction:</label>
            <div className="flex">
              <Input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
            </div>
          </div>

          <div className="row m-t-10">
            <label className="m-r-10">Which category does this reaction belong to?</label>
            <div className="flex">
              <Input value={this.state.category} onChange={(e) => this.setState({category: e.target.value})} />
            </div>
          </div>

          <div className="row m-t-10">
            <label className="m-r-10">Now let's create your reaction!</label>
          </div>


          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}


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
                    {index}
                    <Button className="remove-img" onClick={() => this.removeImg(index)}>X</Button>
                        <FileUploader
                          accept="image/*"
                          name="avatar"
                          filename={file => file.name.split('.')[0]}
                          storageRef={firebase.storage().ref("lanwiki-note-pictures")}
                          onUploadStart={this.handleUploadStart}
                          onUploadError={this.handleUploadError}
                          onUploadSuccess={this.handleUploadSuccess}
                          onProgress={this.handleProgress}
                        />
                  </div>
                )
              })
            }
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
            disabled={!this.state.name || !this.state.category}>
            Save!
          </Button>
        </div>

      </section>
    )
  }
}
