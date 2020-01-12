import React, {Component} from 'react';
import Testing from "./testing";
import {rebase} from "../index";
import firebase from 'firebase';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QuizForm from "./setparams"

export default class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      images: [],
      data: false,
      value: null,
      selectedOption: null,
    }
    this.startQuiz.bind(this);
    this.getData.bind(this);
  }

  startQuiz(info) {
    console.log(info.category.value);
    this.setState({data: !this.state.data, value:info.category.value, selectedOption:info.selectedOption}, ()=>this.getData());
  }

  getData(){
    console.log(this.state.value);
    rebase.get(this.state.value === "organicChemistrySynthesis" ? "results" : this.state.value, {
      context: this,
      withIds: true,
    }).then(data => {
      let storage = firebase.storage().ref();
      let j = 0;
      rebase.get("counts", {
        context: this,
      }).then(count => {
        console.log(count);
        console.log(count[0][this.state.value]);
         j = count[0][this.state.value];
         console.log(j);

         //"https://firebasestorage.googleapis.com/v0/b/awesometeamone-8ab5b.appspot.com/o/default%2F7.jpg?alt=media&token=b8f0423a-f33c-476f-9caa-b3e30b8ab094"
         //gs://awesometeamone-8ab5b.appspot.com/organicChemistrySynthesis/1.jpg
         for (var i = 1; i <= j; i++) {
           storage.child(`${this.state.value}/${i}.jpg`).getDownloadURL().then((url) => {
             console.log(url);
             let index = 0;
             let end = url.indexOf(".jpg?alt=media&");
             let start = url.indexOf(`${this.state.value}%2F`)+(this.state.value === "organicChemistrySynthesis" ? 28 : 12  );;
             index = url.slice(start, end);
             console.log(index);
             this.setState({images: this.state.images.concat([{url: url, id: index}])});
           }).catch(err => {
             console.log(err);
           });
         };

         this.setState({
           results: data,
         }, () => {});
         
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      //handle error
    });
  }

  render(){
    return(
      <section className="quiz">
      {
        this.state.data &&
        <DndProvider backend={HTML5Backend}>
          <Testing results={this.state.results} images={this.state.images} value={this.state.value} selectedOption={this.state.selectedOption}/>
        </DndProvider>
      }
      {
        !this.state.data &&
          <QuizForm startQuiz={(e) => this.startQuiz(e)}/>
      }
      </section>
    )
  }
}
