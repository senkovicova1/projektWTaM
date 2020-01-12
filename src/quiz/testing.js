import React, { Component } from 'react'
import {rebase} from "../index";
import { connect } from "react-redux";
import Wrapper from "./wrapper";

class Testing extends Component {
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

  createQuestion(newQuiz){
    let id = Math.floor(Math.random() * 10);
    while (id === this.state.lastId){
      id = Math.floor(Math.random() * 10);
    }

    let res = this.state.results[id].result.split("-");
    //fakeResTotalCount depends on quiz type:
    //organicChemistry : res.length
    //balancing equations : res.length is only 2, fakeResTotalCount = 6
    //chemical compounds : res.length = 1, fakeResTotalCount = 6
    let fakeResTotalCount = res.length;
    if (res.length <= 2){
      fakeResTotalCount = 6;
    }

    let fakeRes = [];

    //counts -> number of images for given category in DB
    //as we dont have category name, its done based on length of result
    let counts = 0;
    if (parseInt(res.length) === 1){
      counts = this.state.counts['compounds'];
    }
    else if (parseInt(res.length) === 2) {
      counts = this.state.counts['balancing'];
    }
    else {
      counts = this.state.counts['organicChemistrySynthesis'];
    }


    for (var i = 0; i < fakeResTotalCount; i++) {
      let n = (Math.floor(Math.random() * counts) + 1).toString();
      while (res.includes(n) || fakeRes.includes(n)){
        n = (Math.floor(Math.random() * counts) + 1).toString();
      }
      fakeRes.push(n.toString());
    }
    let imgs = [...this.state.images.filter(img => (res.includes(img.id) || fakeRes.includes(img.id)))];

    let ans = Array(res.length).fill(0);
    //chemical compounds
    let filled = 0;
    //balancing equations
    if (parseInt(res.length) === 2){
      filled = 1;
    }
    //organic chemistry synthesis
    else if (res.length > 2) {
      filled = Math.floor(Math.random() * res.length)-2;
    }
    for (var j = 0; j < filled; j++) {
      let img = Math.floor(Math.random() * res.length);
      ans[img] = parseInt(res[img]);
    }
    let textToShow = `Fill in the missing parts of the ${this.state.results[id].name}`;
    if (parseInt(res.length) === 2){
      textToShow = `Balance the following chemical equation using the smallest possible coefficients`;
    }
    else if (parseInt(res.length) === 1){
      textToShow = `Choose correct formula of compound ${this.state.results[id].name}`;
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
      textToShow: textToShow
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
    rebase.get(`users/${this.props.user.uid}`, {
    context: this,
  }).then(userdata => {
      console.log(userdata);
      let body = {
        username: userdata.username,
        balancingQ: (userdata.balancingQ ? userdata.balancingQ : 0)  + (this.state.value === "balancing" ? this.state.counter : 0),
        balancingA: (userdata.balancingA ? userdata.balancingA : 0)  + (this.state.value === "balancing" ? this.state.correctAns : 0),
        compoundsQ: (userdata.compoundsQ ? userdata.compoundsQ : 0)  + (this.state.value === "compounds" ? this.state.counter : 0),
        compoundsA: (userdata.compoundsA ? userdata.compoundsA : 0)  + (this.state.value === "compounds" ? this.state.correctAns : 0),
        organicChemistrySynthesisQ: (userdata.organicChemistrySynthesisQ ? userdata.organicChemistrySynthesisQ : 0)  + (this.state.value === "organicChemistrySynthesis" ? this.state.counter : 0),
        organicChemistrySynthesisA: (userdata.organicChemistrySynthesisA ? userdata.organicChemistrySynthesisA : 0)  + (this.state.value === "organicChemistrySynthesis" ? this.state.correctAns : 0),
      }
      rebase.updateDoc(`users/${this.props.user.uid}`, body)
      .then(() => {
        this.setState({
          end: true,
        })
      }).catch(err => {
      console.log(err);
    });
    }).catch(err => {
      console.log(err);
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
        }        {this.state.reaction &&
          !this.state.end &&
          <h1>
          {this.state.textToShow}
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


const mapStateToProps = (store) => {
  const {user, loggedIn} = store;
  return {user, loggedIn};
};

export default connect(mapStateToProps, {})(Testing);
