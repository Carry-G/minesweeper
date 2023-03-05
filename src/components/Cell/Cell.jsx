import React from 'react';
import './Cell.css'
import boom from './image/boom_icon_155935.png'
import flag from './image/flag-map-marker-1_icon-icons.com_56727.png'

const Cell = (props) => {
  let classes = 'cell ';
  let span = null;
  if(props.data.isOpen){
    classes += ' open';
    if(props.data.count!==0){
      span =  props.data.count
    }
  }
  if(props.data.hasMine && props.data.isOpen){
    span = <img src={boom} alt='boom'/>
  }
  if(props.data.hasFlag && !props.data.isOpen){
    span =  <img src={flag} alt='flag'/>
  }

  const renderCell = () =>{
    return (<div className={classes}
               onContextMenu={e => {
                 e.preventDefault();
               }}
               onClick={()=>props.open(props.data)}
                 onContextMenuCapture={()=>props.flag(props.data)}
                 onMouseDown={()=>props.mouseUp()}
                 onMouseUp={()=>props.mouseDown()}
    >{span}</div>)
  }
  return renderCell()
};

export default Cell;