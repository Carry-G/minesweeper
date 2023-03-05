import React from 'react';
import Board from "../Board/Board";
import './App.css'
import BoardHead from "../BoardHead/BoardHead";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gameStatus:'running',
      rows: 16,
      columns: 16,
      flags: 40,
      mines: 40,
      time:0,
      openCells:0,
    }
    // this.baseState = this.state;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameStatus === "running") {
      this.checkForWinner();
    }
  }

  checkForWinner = () => {
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "winner"
      })
      console.log('You win')
    }
  }

  // componentWillMount(){
  //   this.updateTimer()
  // }

  timerStart (){
    this.timerID = setInterval(
    () => this.updateTimer(),
    1000
    )

}
  updateTimer() {
    this.setState((state) => {
      return {
        time: state.time + 1
      };
    });
  }

  reset = () => {
    this.setState({
      gameStatus:'running',
      rows: 16,
      columns: 16,
      flags: 40,
      mines: 40,
      time:0,
      openCells:0,
    })
    clearInterval(this.timerID);
  };

  endGame = () => {
    this.setState({
      gameStatus: "ended"
    });
    clearInterval(this.timerID);
  };
  changeFlagAmount = amount => {
    this.setState({ flags: this.state.flags - amount });
  };
  handelCellClick = () =>{
    if(this.state.openCells === 0 && this.state.gameStatus !== 'running' ){
      this.setState({
        status:'running'
      });
    }
    this.setState(prevState=>{
      return { openCells:prevState.openCells+1}
    })
    if(this.state.openCells === 0 ){
      this.timerStart ()
    }
  }
  mouseDown = () =>{
    this.setState({
      gameStatus: "running"
    });
  }

  mouseUp = () =>{
    this.setState({
      gameStatus: "waiting"
    });
  }

  render() {
    return (
      <div className='minesweeper'>
        <BoardHead
          time={this.state.time}
          mines={this.state.mines}
          flagsUsed={this.state.flags}
          reset={this.reset}
          status={this.state.gameStatus}
        >
        </BoardHead>
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          openCellClick={this.handelCellClick}
          endGame={this.endGame}
          status={this.state.gameStatus}
          changeFlagAmount={this.changeFlagAmount}
          mouseUp={this.mouseUp}
          mouseDown={this.mouseDown}
          timerStart={this.timerStart}/>
      </div>
    );
  }
};
