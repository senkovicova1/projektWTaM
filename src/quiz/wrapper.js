import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from './bin';
import Box from './box';
import ItemTypes from './constants';

export default class Wrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      reaction: null,
      images: [],
      spaces: [],

      answerStatus: 0,
    }
    this.handleDrop.bind(this);
    this.setData.bind(this);
    this.setData(props);
  }

  UNSAFE_componentWillReceiveProps(props){
    if (props.reaction.id != this.props.reaction.id ||
      props.reactionImages.length != this.props.reactionImages.length){
      this.setData(props);
    } if (props.answerStatus != this.props.answerStatus){
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
              return ({
                 id: index,
                 accepts: [ItemTypes.IMAGE],
                 type: data.reaction.structure.split("-")[index],
                 correctItem: i,
                 lastDroppedItem: null})
            });

    this.setState({
      reaction: data.reaction,
      images: data.reactionImages,
      spaces: sp,
      answerStatus: data.answerStatus,
    })
  }

  render(){
    console.log(this.state.answerStatus);
    return(
      <div>
        <div>
          <Container style={{width: "750px"}}>
           {
             this.state.images.map((_, index) =>
               {
                 if(index%4 !== 0) return null;
                 return (
                   <Row key={index}>
                     {
                       [...this.state.images]
                       .splice(index, index+4)
                       .map((val) =>
                           <Box
                             url={val.url}
                             id={val.id}
                             type={ItemTypes.IMAGE}
                             isDropped={false}
                             key={val.id}
                           />
                       )
                     }
                   </Row>
                 );
               }
             )
           }
         </Container>

        </div>

        <div style={{marginTop: "100px"  }}>
          <div style={{position: "relative" }}>
             {this.state.spaces.map(({id, type, lastDroppedItem, correctItem, accepts}, index) => (
              <Dustbin
                key={id}
                id={id}
                accepts={accepts}
                type={type}
                lastDroppedItem={lastDroppedItem}
                onDrop={item => this.handleDrop(id, item)}
                structure={this.state.reaction.structure}
                goodAnswer={lastDroppedItem && this.state.answerStatus != 0 ? (correctItem === lastDroppedItem.id ? 1 : -1) : 0}
              />
            ))
          }
          </div>
        </div>


      </div>
    )
  }
}
