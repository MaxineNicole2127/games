import O from "./components/O";
import X from "./components/X";
import Line from "./components/Line";
import Modal from "./components/Modal";
import {useState, useEffect} from 'react';
import Little_O from "./components/Little_O";
import Little_X from "./components/little_x";

const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [modalPurpose, setModalPurpose] = useState("Choose_Player");
  const [playerOne, setPlayerOne] = useState({name: "Player 1", "XO": "X"});
  const [playerTwo, setPlayerTwo] = useState({name: "Player 2", "XO": "O"});
  console.log("Player 1: ", playerOne);
  const [turn, setTurn] = useState("X");
  //const [winner, setWinner] = useState("");
  const [turnName, setTurnName] = useState(playerOne.name);

  useEffect(() => {
    setTurn(playerOne.XO);
    setTurnName(playerOne.name);
  }, [playerOne]);
  
  // console.log(turnName, turn);

  const [board, setBoard] = useState([
                              ['', '', ''],
                              ['', '', ''],
                              ['', '', '']
                            ]);
  const [winner, setWinner] = useState(null);

  const handleClick = (XO, rowIndex, colIndex) => {
    if(board[rowIndex][colIndex] !== '' || winner) {
      return;
    } else {
      if(XO == 'X') {
        board[rowIndex][colIndex] = 'X';
        setTurn('O');
        setTurnName((playerOne.XO === 'O') ? playerOne.name : playerTwo.name);
      } else if(XO == 'O') {
        board[rowIndex][colIndex] = 'O';
        setTurn('X');
        setTurnName((playerOne.XO === 'X') ? playerOne.name : playerTwo.name);
      }
    }

    checkWinner(rowIndex, colIndex);
    if(winner){
      console.log(winner);
    }
  }

  const checkWinner = (rowIndex, colIndex) => {
    let r = Math.abs(rowIndex);
    let c = Math.abs(colIndex);

    let winning = board[r][c];
    let orientation = "vertical"; // slanting-left, slanting-right, horizontal
    let starting = 0;
    let winnerName = turnName;


    if(r == c) { // [1][1] || [2][2] || [0][0]
      if(board[r][c] === board[(r+1)%3][(c+1)%3] && board[(r+1)%3][(c+1)%3] === board[(r+2)%3][(c+2)%3]){
        console.log("WON! SLANTED LEFT");
        orientation = "slanted-left";
        starting = 0;

        setWinner({
          'winning': winning,
          'winnerName' : winnerName,
          'orientation' : orientation,
          'starting': starting
        });

        return;
      }


    }

    //console.log(board[(Math.abs(r-1))%3][c]);
    else if(Math.abs(r-c) == 2 || (r == 1 && c == 1)) {
      if(board[1][1] === board[0][2] && board[0][2] === board[2][0]) {
        console.log("WON! SLANTED-RIGHT");
        orientation = "slanted-right";
        starting = 2;

        setWinner({
          'winning': winning,
          'winnerName' : winnerName,
          'orientation' : orientation,
          'starting': starting
        });

        return;
      }


    }

    if(board[r][c] === board[(r+1)%3][c] &&  board[(r+1)%3][c] === board[(r+2)%3][c]){
      console.log("WON! VERTICAL");
      orientation = "vertical";
      starting = c;

      setWinner({
        'winning': winning,
        'winnerName' : winnerName,
        'orientation' : orientation,
        'starting': starting
      });

      return;

    } else if(board[r][c] === board[r][(c+1)%3] && board[r][(c+1)%3] === board[r][(c+2)%3]) {
      console.log("WON! HORIZONTAL");
      orientation = "horizontal";
      starting = r;

      setWinner({
        'winning': winning,
        'winnerName' : winnerName,
        'orientation' : orientation,
        'starting': starting
      });

      return;
    }
    else {
      return;
    }
  }

  if(winner){
    console.log(winner);
  }





  // console.log("playerOne: ", playerOne.name, playerOne.XO);
  // console.log("playerTwo: ", playerTwo.name, playerTwo.XO);
  return (
    <div className="game">
      {showModal && <Modal purpose={modalPurpose} setShowModal={setShowModal} setPlayerOne={setPlayerOne} setPlayerTwo={setPlayerTwo}/>}
      <h1 className="title">Tic-Tac-Toe</h1>

      <table>
        {/* {!winner && <Line/>} */}
        {winner && <Line activate={true} starting={winner.starting} orientation={winner.orientation}/>}
        {
          board.map((row, rowIndex) => (
            <tr className="row" key={rowIndex}>
              {
                row.map((col, colIndex) => (
                  
                    <td className={(winner || col !== '') ? "col disabled" : (turn === "X") ? "col blue" : "col red"} key={colIndex} onClick={()=>handleClick(turn, rowIndex, colIndex)}>
                      {
                        col === 'X' ? <X/> : col === 'O' ? <O/> : ""
                      }
                    </td>
                  
                ))
              }
            </tr>
          ))
        }
      </table>

      <div className="update-message">
        {(!winner && !showModal) &&
          <div className="turn-message">
            {(turn === 'X') && <Little_X/>}
            {(turn === 'O') && <Little_O/>}
            
            <p>{turnName}'s turn</p>
          </div>
        }

        {(winner && !showModal) &&
          <div className="winner-message">
            {(winner.winning === 'X') && <Little_X/>}
            {(winner.winning === 'O') && <Little_O/>}
            
            <p>{winner.winnerName}'s wins!</p>
          </div>
        }
      </div>
    </div>
  )
}

export default App;