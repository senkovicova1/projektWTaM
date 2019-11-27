import React from 'react'
import { DropTarget } from 'react-dnd'

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


export const Dustbin = ({
  key,
  id,
  type,
  lastDroppedItem,
  goodAnswer,
  isOver,
  canDrop,
  connectDropTarget,
  structure,
}) => {

  const diff = (structure.substr(0, id*2-1).match(/d/g) || []).length - (structure.substr(0, id*2+1).match(/m-m/g) || []).length;

  const typeStyle = {
    "m": {
      left:  150*(id-diff) + 20*(id-diff)  + "px",
      top: "70px",
    },
    "u": {
      left: 150*(id-diff) + 20*(id-diff)  + "px",
    },
    "d": {
      left: 150*(id-diff-1) + 20*(id-diff-1)  + "px",
      top: "140px"
    },
  }
/*
  console.log("---------------");
  console.log(id);
  console.log(diff);
*/
  const isActive = isOver && canDrop

  let backgroundColor = '#FFF'

  if (isActive) {
    backgroundColor = '#900C3F'
  } else if (canDrop) {
    backgroundColor = '#8BF1E6'
  }

  let border = "1px solid #555"
  if (goodAnswer === 1){
    border = "5px solid green"
  } else if (goodAnswer === -1){
    border = "5px solid red"
  }

  return connectDropTarget(
    <div style={{ ...style, backgroundColor, border, ...typeStyle[type] }}>
      {isActive
        ? 'Release to drop'
        : ""}

      {lastDroppedItem && (
        <img src={lastDroppedItem.url} height="100px" width="150px" style={{display: "block",  marginLeft: "auto",  marginRight: "auto", borderRadius: "10px", border: "1px solid #555"}}/>
      )}
    </div>,
  )
}

export default DropTarget(
  props => props.accepts,
  {
    drop(props, monitor) {
      props.onDrop(monitor.getItem())
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin)
