import {useState} from 'react';

const Modal = ({ purpose, setShowModal, setPlayerOne, setPlayerTwo }) => {
    if(purpose == "Choose_Player"){

        const [player1, setPlayer1] = useState("");
        const [player2, setPlayer2] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            let player1_XO = (Math.floor(Math.random() * 2) === 0) ? "X" : "O";
            let player2_XO = (player1_XO === 'X') ? "O" : "X";
            console.log(player1_XO, player2_XO);
            
            setPlayerOne({name: player1, "XO": player1_XO});
            setPlayerTwo({name: player2, "XO": player2_XO});
            
            if(player1 === "")
                player1 = "Player 1";
            if(player2 === "")
                player2 = "Player 2";
            setShowModal(false);
            setPlayer1("");
            setPlayer2("");
        }

        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <h1>Welcome, Players!</h1>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="input-group">
                            <p className="instruction">Enter Player 1: </p>
                            <input type="text" autofocus required onChange={(e) => setPlayer1(e.target.value)} value={player1} id="player-1" />
                        </div>
                        <div className="input-group">
                            <p className="instruction">Enter Player 2: </p>
                            <input type="text" name="" onChange={(e) => setPlayer2(e.target.value)} value={player2}id="player-2" />
                        </div>
                        <input type="submit" value="Play!" required className='play-button'/>
                    </form>
                </div>
            </div>
        )

    }
}

export default Modal;