import React, { Component } from 'react'
import Wrapper from "./wrapper";

export default class Testing extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: this.props.results,
      images: this.props.images,

      reaction: null,
      reactionImages: [],
      reactionAnswer: [],
      answerStatus: 0, //0-este neodpovedal, 1-odpvoedal spravne, -1-odpovedal nespravne

      counter: 0,
      correctAns: 0,
      answeredAns: 0,
      end: false,

      lastId: null,
      selectedOption: this.props.selectedOption,
      value: this.props.value,
    }
    this.createQuestion.bind(this);
    this.checkAnswer.bind(this);
    this.endQuiz.bind(this);
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setState({
      results: props.results,
      images: props.images,
      answerStatus: 0, //0-este neodpovedal, 1-odpvoedal spravne, -1-odpovedal nespravne
      counter: 0,
      correctAns: 0,
      answeredAns: 0,
      end: false,
      selectedOption: props.selectedOption,
      value: props.value,
    }, () => this.createQuestion(false))
  }

  createQuestion(newQuiz){
    let id = Math.floor(Math.random() * 10);
    while (id === this.state.lastId){
      id = Math.floor(Math.random() * 10);
    }

    let res = this.state.results[id].result.split("-");
    let fakeRes = [];
    for (var i = 0; i < res.length; i++) {
      let n = (Math.floor(Math.random() * 60) + 1).toString();
      while (res.includes(n) || fakeRes.includes(n)){
        n = (Math.floor(Math.random() * 60) + 1).toString();
      }
      fakeRes.push(n.toString());
    }
    let imgs = [...this.state.images.filter(img => (res.includes(img.id) || fakeRes.includes(img.id)))];

    let ans = Array(res.length).fill(0);
    let filled = Math.floor(Math.random() * res.length)-2;
    for (var j = 0; j < filled; j++) {
      let img = Math.floor(Math.random() * res.length);
      ans[img] = parseInt(res[img]);
    }

    this.setState({
      reaction: this.state.results[id],
      reactionImages: imgs,
      reactionAnswer: ans,
      counter: (newQuiz ? 1 : this.state.counter + 1),
      correctAns: (newQuiz ? 0 : this.state.correctAns),
      answeredAns: (newQuiz ? 0 : this.state.answeredAns),
      end: false,
      answerStatus: 0,
      lastId: id,
    })
  }

  checkAnswer(){
    let ans = this.state.reactionAnswer.join("-");
    if (ans === this.state.reaction.result){
      this.setState({
        answerStatus: 1,
        answeredAns: this.state.answeredAns + 1,
        correctAns: this.state.correctAns + 1,
      })
    } else {
      this.setState({
        answerStatus: -1,
        answeredAns: this.state.answeredAns + 1,
      })
    }
  }

  endQuiz(){
    this.setState({
      end: true,
    })
    return [this.state.counter, this.state.answeredAns, this.state.correctAns];
  }

  render(){
    return(
      <React.Fragment>
        {this.state.reaction &&
          !this.state.end &&
          <h1>
            {`Question no. ${this.state.counter}`}
          </h1>
        }

        {this.state.reaction &&
          !this.state.end &&
          <h1>
          {`Fill in the missing parts of the ${this.state.reaction.name}`}
          </h1>
        }
          <div className="wrapper">
            {this.state.reaction &&
              this.state.reactionImages &&
             this.state.reactionImages.length > 0 &&
              <Wrapper counter = {this.state.counter}
                selectedOption = {this.state.selectedOption}
                reaction={this.state.reaction}
                reactionImages={this.state.reactionImages}
                filled={this.state.reactionAnswer}
                setReactionAnswer={(index, imgId) => {
                      let newAnswer = [...this.state.reactionAnswer];
                      newAnswer.splice(index, 1, imgId);
                      this.setState({
                        reactionAnswer: newAnswer,
                      })
                    }
                  }
                answerStatus={this.state.answerStatus}
                createQuestion={(e) => this.createQuestion(e)}
                endQuiz={() => this.endQuiz()}
                checkAnswer={() => this.checkAnswer()}
                />
            }
          </div>

      </React.Fragment>
    )
  }
}
