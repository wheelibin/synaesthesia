import React from "react";
import PropTypes from "prop-types";

const Songs = ({ onSongSelection, song }) => {
  return (
    <div className="btn-group" role="group" aria-label="...">
      <button data-song={1} type="button" className="btn btn-outline-light" onClick={onSongSelection}>
        Funky Down-Tempo
      </button>
      <button data-song={2} type="button" className="btn btn-outline-light" onClick={onSongSelection}>
        Ambient Drone
      </button>
    </div>
    // <div className="card-deck">
    //   <div className={`card border-white funky-down-tempo ${song === 1 ? "funky-down-tempo--" : ""}`}>
    //     <div className="card-body">
    //       <h5 className="card-title">Funky Down Tempo</h5>
    //       <p className="card-text">A funky, down tempo little ditty, with a chord progression, bass line, and drums</p>
    //     </div>
    //     <div className="card-footer border-0">
    //       <button data-song={1} type="button" className="btn btn-outline-light btn-block" onClick={onSongSelection}>
    //         Play
    //       </button>
    //     </div>
    //   </div>
    //   <div className={`card border-white evolving-drone ${song === 2 ? "evolving-drone--" : ""}`}>
    //     <div className="card-body">
    //       <h5 className="card-title">Evolving Drone</h5>
    //       <p className="card-text">An evolving drone with lots of modulation</p>
    //     </div>
    //     <div className="card-footer border-0">
    //       <button data-song={2} type="button" className="btn btn-outline-light btn-block" onClick={onSongSelection}>
    //         Play
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

Songs.propTypes = {
  onSongSelection: PropTypes.func.isRequired,
  song: PropTypes.number
};

export default Songs;
