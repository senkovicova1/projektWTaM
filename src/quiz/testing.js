import React, { Component } from 'react'
import Wrapper from "./wrapper";
import { Button } from 'reactstrap';

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
    }
    this.setReactionAnswer.bind(this);
    this.createQuestion.bind(this);
    this.checkAnswer.bind(this);
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setState({
      results: props.results,
      images: props.images,
    }, () => this.createQuestion())
  }

  createQuestion(){
    let id = Math.floor(Math.random() * 2);

    let res = this.state.results[id].result.split("-");
    let imgs = [...this.state.images]; //kym mame len dve reakcie, nahraju sa vsetkz obrazky

    this.setState({
      reaction: this.state.results[id],
      reactionImages: imgs,
      reactionAnswer: Array(res.length).fill(0),
      counter: this.state.counter + 1,
    })
  }

  setReactionAnswer(index, imgId){
    let newAnswer = [...this.state.reactionAnswer];
    newAnswer.splice(index, 1, imgId);
    this.setState({
      reactionAnswer: newAnswer,
    }, () => this.checkAnswer())
  }

  checkAnswer(){
    let ans = this.state.reactionAnswer.join("-");
    if (ans.length != this.state.reaction.result.length ||
        this.state.reactionAnswer[0] === 0 ||
        this.state.reactionAnswer[0].indexOf("-0") > -1){
          console.log("returned");
      return;
    }
    if (ans === this.state.reaction.result){
      this.setState({
        answerStatus: 1,
      })
    } else {
      this.setState({
        answerStatus: -1,
      })
    }
  }


  render(){
    console.log("ANSWER " + this.state.answerStatus);
    return(
      <React.Fragment>
        {this.state.reaction &&
          <h1>
            Fill in the missing parts of the {this.state.reaction.name}
          </h1>
        }
        {this.state.reaction &&
          this.state.reactionImages &&
         this.state.reactionImages.length > 0 &&
          <Wrapper
            reaction={this.state.reaction}
            reactionImages={this.state.reactionImages}
            setReactionAnswer={(index, imgId) => {
                  let newAnswer = [...this.state.reactionAnswer];
                  newAnswer.splice(index, 1, imgId);
                  this.setState({
                    reactionAnswer: newAnswer,
                  }, () => this.checkAnswer())
                }
              }
            answerStatus={this.state.answerStatus}
            />
        }
        <div>
        </div>

        <Button
          color="warning"
          onClick={() => this.createQuestion()}
          >
          New Question
        </Button>
      </React.Fragment>
    )
  }
}
/*
{false && <div>
  <img style={{width: '100%', height: '200px', marginTop: '10px' , objectFit: 'cover', overflow: 'hidden'}}
    src={url}
    key={index}
    alt={url} />
</div> }*/
