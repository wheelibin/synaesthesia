import React from "react";

const Songs = ({ onSongSelection, song }) => {
  return (
    <div className="card-deck">
      <div className={`card border-white funky-down-tempo ${song === 1 ? "funky-down-tempo--active" : ""}`}>
        <div className="card-body">
          <h5 className="card-title">Funky Down Tempo</h5>
          <p className="card-text">A funky, down tempo little ditty, with a chord progression, bass line, and drums</p>
        </div>
        <div className="card-footer border-0">
          <button data-song={1} type="button" className="btn btn-outline-light btn-block" onClick={onSongSelection}>
            Play
          </button>
        </div>
      </div>
      <div className={`card border-white evolving-drone ${song === 2 ? "evolving-drone--active" : ""}`}>
        <div className="card-body">
          <h5 className="card-title">Evolving Drone</h5>
          <p className="card-text">An evolving drone with lots of modulation</p>
        </div>
        <div className="card-footer border-0">
          <button data-song={2} type="button" className="btn btn-outline-light btn-block" onClick={onSongSelection}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Songs;
