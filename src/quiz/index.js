import React, {Component} from 'react';
import Testing from "./testing";
import {rebase} from "../index";
import firebase from 'firebase';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      images: [],
    }
  }

  componentDidMount(){
    rebase.get("results", {
      context: this,
      withIds: true,
    }).then(data => {
      let storage = firebase.storage().ref();
      //"https://firebasestorage.googleapis.com/v0/b/awesometeamone-8ab5b.appspot.com/o/default%2F7.jpg?alt=media&token=b8f0423a-f33c-476f-9caa-b3e30b8ab094"
      for (var i = 1; i <= 67; i++) {
        storage.child(`default/${i}.jpg`).getDownloadURL().then((url) => {
          let index = 0;
          let end = url.indexOf(".jpg?alt=media&");
          let start = url.indexOf("default%2F")+10;
          index = url.slice(start, end);
          this.setState({images: this.state.images.concat([{url: url, id: index}])});
        })
      };

      this.setState({
        results: data,
      }, () => {});
    }).catch(err => {
      //handle error
    });
  }

  render(){
    return(
      <section className="quiz">
          <DndProvider backend={HTML5Backend}>
            <Testing results={this.state.results} images={this.state.images}/>
          </DndProvider>
      </section>
    )
  }
}
