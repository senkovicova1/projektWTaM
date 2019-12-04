import React from 'react';
import { DragSource } from 'react-dnd';
const style = {
  width: "150px",
  height: "150px",
  cursor: 'move',
  backgroundColor: 'cyan',
  objectFit: "cover",
}
export const Box = ({ url, id, isDropped, isDragging, connectDragSource }) => {
  return connectDragSource(
    <img
      style={{width: "150px", height: "100px", objectFit: "fill", marginLeft: "4%", marginRight: "4%", marginBottom: "2%", boxShadow: "7px 7px 7px #555", borderRadius: "10px", border: "1px solid #555"}}
      src={url}
      key={url}
      alt={"url"} />,
  )
}
export default DragSource(
  props => props.type,
  {
    beginDrag: props => ({ url: props.url, id: props.id }),
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box)
