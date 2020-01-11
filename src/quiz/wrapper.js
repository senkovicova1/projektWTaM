import React, { Component } from 'react';
import {Button, Progress } from "reactstrap";
import Dustbin from './bin';
import Box from './box';
import ItemTypes from './constants';

import arrow from '../scss/arrow.jpg';

export default class Wrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      reaction: null,
      images: [],
      spaces: [],

      answerStatus: 0,

      endQuiz: false,
      qTotalQuestions: 0,
      qAnsweredQuestions: 0,
      qCorrectQuestions: 0,
    }
    this.handleDrop.bind(this);
    this.setData.bind(this);
    this.setData(props);
  }

  UNSAFE_componentWillReceiveProps(props){
    if (props.reaction.id !== this.props.reaction.id ||
      props.reactionImages.length !== this.props.reactionImages.length){
      this.setData(props);
    } if (props.answerStatus !== this.props.answerStatus){
      this.setState({
        answerStatus: props.answerStatus,
      })
    }
  }

  handleDrop(index, item){
    this.props.setReactionAnswer(index, item.id);

    let sp = this.state.spaces.map(space => {
      if (space.id !== index){
        return (space);
      } else {
        let newSpace = {...space, lastDroppedItem: item};
        return (newSpace)
      }
    });
    this.setState({
      spaces: sp,
    });
  }

  setData(data){
    let sp = data.reaction.result.split("-").map((i, index) =>
            {
               let ldi = null;
               if (data.filled[index] !== 0){
                 ldi = data.reactionImages.find(img => img.id === i);
               }
              return ({
                 id: index,
                 accepts: [ItemTypes.IMAGE],
                 type: data.reaction.structure.split("-")[index],
                 correctItem: i,
                 lastDroppedItem: ldi})
            });

    this.setState({
      reaction: data.reaction,
      images: data.reactionImages,
      spaces: sp,
      answerStatus: data.answerStatus,
    })
  }

  render(){
    if (this.state.endQuiz){
      return(
        <div className="main">
          <h1>
            Quiz finished!
          </h1>
          <div>
            <div>
              <h2>Total number of questions: <strong>{this.state.qTotalQuestions}</strong></h2>
              <h2>Questions you answered: <strong>{this.state.qAnsweredQuestions}</strong></h2>
              <h2>Correct answers: <strong>{this.state.qCorrectQuestions}</strong></h2>
            </div>
            <Progress multi>
              <Progress bar color="info" max={this.state.qTotalQuestions} value={this.state.qTotalQuestions - this.state.qAnsweredQuestions}>Total</Progress>
              <Progress bar color="warning" max={this.state.qTotalQuestions} value={this.state.qAnsweredQuestions - this.state.qCorrectQuestions}>Answered</Progress>
              <Progress bar color="success" max={this.state.qTotalQuestions} value={this.state.qCorrectQuestions}>Correct</Progress>
            </Progress>
          </div>
          <Button
            color="warning ml-auto mr-auto"
            style={{marginTop: "30px"}}
            onClick={() => {
              this.setState({
                endQuiz: false,
              }, () => this.props.createQuestion(true))
            }}
            >
            Do quiz again!
          </Button>
        </div>
      );
    }
    let arrows = [];
    if (this.state.reaction && this.state.reaction.structure.length > 1){
      arrows = this.state.reaction ? this.state.reaction.structure.match(/-/g).length : 0;
      if (this.state.reaction) {
        let u = this.state.reaction.structure.match(/m-u/g);
        let d = this.state.reaction.structure.match(/d-m/g);
        arrows -= ( (u !== null ? u.length : 0) + (d !== null ? d.length : 0));
      }
      arrows = Array(arrows).fill(0);
    }
    return(
      <div className="main">
      <div className="dustbin">
        <div className="rel" style={{position: "relative", paddingBottom:"300px"}}>
        {
          this.state.spaces.map(({id, type, lastDroppedItem, correctItem, accepts}, index) => (
            <Dustbin
              key={id}
              id={id}
              accepts={accepts}
              type={type}
              lastDroppedItem={lastDroppedItem}
              onDrop={item => this.handleDrop(id, item)}
              structure={this.state.reaction.structure}
              goodAnswer={lastDroppedItem && this.state.answerStatus !== 0 ? (correctItem === lastDroppedItem.id ? 1 : -1) : 0}
            />
          ))
        }
        {
          arrows.map((a, index) =>
            {
              let l = 170 + 150*(index*2) + 20*index*2;
              return (
                <div key={index} style={{ position: "absolute", left: l, top: '100px'}}>
                  <img src={arrow} alt="img" height="40px" width="150px" style={{display: "block",  marginLeft: "auto",  marginRight: "auto", borderRadius: "10px", border: "0px solid #555"}}/>
                </div>
              )
            }
          )
        }
        </div>
      </div>

      <div className="button-row">
        <Button
          color="info"
          onClick={() => {
              let qData = this.props.endQuiz();
              this.setState({
                qTotalQuestions: qData[0],
                qAnsweredQuestions: qData[1],
                qCorrectQuestions: qData[2],
                endQuiz: true,
              })
            }
          }
          >
          End quiz
        </Button>
        <Button
          color="success ml-auto"
          disabled={this.state.spaces.filter(sp => sp.lastDroppedItem === null).length > 0}
          onClick={() => this.props.checkAnswer()}
          >
          Check!
        </Button>
        <Button
          color="warning ml-auto"
          onClick={() =>
            {
              console.log(this.props.counter);
              console.log(this.props.selectedOption);

              if (this.props.counter === this.props.selectedOption){
                let qData = this.props.endQuiz();
                this.setState({
                    qTotalQuestions: qData[0],
                    qAnsweredQuestions: qData[1],
                    qCorrectQuestions: qData[2],
                    endQuiz: true,
                  })
              }
              else{
                this.props.createQuestion(false)
              }
            }
          }
          >
          New Question
        </Button>
      </div>

        <div className="boxes">
          {
             this.state.images.map((val, index) =>
                 <Box
                   url={val.url}
                   id={val.id}
                   type={ItemTypes.IMAGE}
                   isDropped={false}
                   key={val.id}
                 />
              )
            }
        </div>
      </div>
    )
  }
}
