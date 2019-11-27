import React, { useState, useCallback, useEffect } from 'react';
import {Row, Col} from "reactstrap";
import { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from './bin';
import Box from './box';
import ItemTypes from './constants';
import update from 'immutability-helper';

const Container = (props) => {

  const [spaces, setSpaces] = useState(props.reaction.result.split("-").map((i, index) =>
    {
      return ({
         id: index,
         accepts: [ItemTypes.IMAGE],
         type: props.reaction.structure.split("-")[index],
         lastDroppedItem: null})
    }
  ))

  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ])

  const [boxes] = useState([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
  ])

  const [droppedBoxNames, setDroppedBoxNames] = useState([])

  function isDropped(id) {
    return droppedBoxNames.indexOf(id) > -1
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { url } = item
      setDroppedBoxNames(
        update(droppedBoxNames, url ? { $push: [url] } : { $push: [] }),
      )
      setSpaces(
        update(spaces, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      )

      props.setReactionAnswer(index, item.id)

      setDustbins(
        update(spaces, {
          [index]: {
            droppedImg: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, spaces],
  )

/**/

  function createSpaces() {
    const structure = props.reaction.structure.split("-")
    let table = []

    // Outer loop to create parent
    for (var i = 0; i < structure.length; i++) {
      let s = null;
      if (structure[i] === "m"){
        s = (<Col key={i} style={{height: "170px",flexGrow:"0.1", paddingTop: "70px"}}>
                <Dustbin
                  key={structure[i].id}
                  id={structure[i].id}
                  accepts={structure[i].accepts}
                  type={structure[i].type}
                  lastDroppedItem={structure[i].lastDroppedItem}
                  onDrop={item => handleDrop(structure[i].id, item)}
                  structure={props.reaction.structure}
                />
            </Col>)
      }
      else if (structure[i] === "u" && structure[i+1] === "d"){
        s = (<Col key={i} style={{flexGrow:"0.1"}}>
                <Row key={i}>
                  <Dustbin
                    key={structure[i].id}
                    id={structure[i].id}
                    accepts={structure[i].accepts}
                    type={structure[i].type}
                    lastDroppedItem={structure[i].lastDroppedItem}
                    onDrop={item => handleDrop(structure[i].id, item)}
                    structure={props.reaction.structure}
                  />
                </Row>
                <Row>
                  ->
                </Row>
                <Row key={i+1}>
                  <Dustbin
                    key={structure[i+1].id}
                    id={structure[i+1].id}
                    accepts={structure[i+1].accepts}
                    type={structure[i+1].type}
                    lastDroppedItem={structure[i+1].lastDroppedItem}
                    onDrop={item => handleDrop(structure[i+1].id, item)}
                    structure={props.reaction.structure}
                  />
                </Row>
              </Col>);
          i += 1;
      }
      table.push(s)
    }
    return table
  }
/*  <Row style={{height: "250px"}}>
  {
    createSpaces()
  }
</Row>*/

  console.log("--------PINOVINA--------");
  console.log(props.reaction);
  console.log(props.reactionImages);

  return (
    <div>

      <div >
        {props.reactionImages.map(val =>
                <Box
                  url={val.url}
                  id={val.id}
                  type={ItemTypes.IMAGE}
                  isDropped={isDropped(val.id)}
                  key={val.id}
                />
        )}
      </div>

      <div style={{marginTop: "100px"  }}>
        <div style={{position: "relative" }}>
           {spaces.map(({id, type, lastDroppedItem, accepts}, index) => (
            <Dustbin
              key={id}
              id={id}
              accepts={accepts}
              type={type}
              lastDroppedItem={lastDroppedItem}
              onDrop={item => handleDrop(id, item)}
              structure={props.reaction.structure}
            />
          ))
        }
        </div>
      </div>
    </div>
  )
}
export default Container
