import React, {Component} from 'react';
import Row from "../Row/Row";
import './Board.css'

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: this.creatBoard(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.creatBoard(nextProps)
      });
    }
  }

  creatBoard = (props) => {
    const board = [];

    for(let i=0; i < props.rows; i++) {
      board.push([]);

      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }
      for(let i=0; i< props.mines; i++){
        const randomRow = Math.floor(Math.random()*props.rows)
        const randomCol = Math.floor(Math.random()*props.columns)

        const cell = board[randomRow][randomCol]

        if(cell.hasMine){
          i--;
        }else{
          cell.hasMine = true;
        }
    }
      return board;
  }

  flag = cell => {
    if (this.props.status === "ended") {
      return;
    }
    let rows = this.state.rows;

    cell.hasFlag = !cell.hasFlag;
    this.setState({ rows });
    this.props.changeFlagAmount(cell.hasFlag ? 1 : -1);
  };

  open = cell =>{
    if (this.props.status === "ended") {
      return;
    }
    const rows = this.state.rows;

    const current = rows[cell.y][cell.x]
    const numberOfMines = this.findMines(cell)
    if(current.hasMine ){
      if(this.props.openCells===0){
        const newRows = this.creatBoard(this.props);
        this.setState({rows:newRows},()=> this.open(cell))
      }
      current.isOpen = true;
      this.setState({rows});
      console.log(current)
      this.props.endGame()
    }
    else {if (!cell.hasFlag && !current.isOpen) {
        this.props.openCellClick();

        current.isOpen = true;
        current.count = numberOfMines

        this.setState({rows});

        if(!current.hasMine && numberOfMines===0){
          this.findAroundCell(cell)
        }
      }
    }
  }


  findMines = cell =>{
    let minesInProximity =  0;
    for(let row = -1; row <=1; row++){
      for(let col = -1; col <=1; col++){
        if(cell.y + row >=0 && cell.x+col>=0){
          if(
            cell.y + row < this.state.rows.length &&
            cell.y + col < this.state.rows[0].length
          ){
            if(this.state.rows[cell.y+row][cell.y + col].hasMine &&
            !(row===0 && col===0)
            ){
              minesInProximity++;
            }
          }
        }
      }
    }
    return minesInProximity
  };

  findAroundCell = cell =>{
    const rows = this.state.rows;

    for(let row = -1; row <=1; row++){
      for(let col = -1; col <=1; col++) {
        if(cell.y + row >=0 && cell.x+col>=0){
          if(
            cell.y + row < rows.length &&
            cell.y + col < rows[0].length
          ){
            if(!rows[cell.y+row][cell.y + col].hasMine &&
              !rows[cell.y+row][cell.y + col].isOpen){
              this.open(rows[cell.y+row][cell.y + col]);
            }
          }
        }
      }
    }
  }
  render() {
    const rows = this.state.rows.map((cells,index) => {
      return (
        <Row
          flag={this.flag}
          cells={cells}
          key={index}
          open={this.open}
          mouseUp={this.props.mouseUp}
          mouseDown={this.props.mouseDown}
        />
      )
    })
    return (
      <div className='board'>
        {rows}
      </div>
    );
  }
}

export default Board;