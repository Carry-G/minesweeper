import React from 'react';
import Cell from "../Cell/Cell";
import './Row.css'
const Row = (props) => {
  const cells = props.cells.map((data,index) => (
      <Cell
        key={index}
        data={data}
        open={props.open}
        flag={props.flag}
        mouseUp={props.mouseUp}
        mouseDown={props.mouseDown}
      />
  ));
  return (
    <div className='row'>
      {cells}
    </div>
  );
};

export default Row;