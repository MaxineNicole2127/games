const Player = (props) => {
    const { name, score } = props;
    return(
        <div className="player-section">
            <div className="score">
                <h1>{score}</h1>
            </div>
            <div className="player-name">
                <little_o/>
                <p>{name}</p>
            </div>
        </div>
    )
}

export default Player;