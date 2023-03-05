import React from 'react';
import './BoardHead.css'
import smile from './image/smiling_emoji_icon_246083.png'
import worried from './image/worried_emoji_icon_246079.png'
import cool from './image/cool_emoji_icon_246091.png'
import  surprised from './image/surprised_emoji_icon_246081.png'

const BoardHead = (props) => {
  const minutes = Math.floor(props.time/60);
  const seconds = props.time - minutes * 60 || 0 ;

  const  formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const times = `${minutes}:${formattedSeconds}`
  let status ;
    switch (props.status) {
      case('winner'):
        status = <img src={cool} alt='cool'/>;
        break
      case ('running'):
        status = <img src={smile} alt='smile'/>;
        break
      case('waiting'):
        status = <img src={surprised} alt='surprised'/>;
        break
      case('ended'):
        status = <img src={worried} alt='worried'/>;
        break
    }


  return (
    <div className='board-head'>
      <div className='flag-count'>{props.flagsUsed}</div>
      <button className='reset' onClick={()=>props.reset()}>{status}</button>
      <div className='timer' onClick={props.reset}>{times}</div>
    </div>
  );
};

export default BoardHead;