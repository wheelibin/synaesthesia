import React from "react";
import PropTypes from "prop-types";

const Songs = ({ onSongSelection, song }) => {
  return (
    <div className="btn-group" role="group" aria-label="...">
      <button data-song={1} type="button" className={`btn btn-outline-light active-song-${song === 1}`} onClick={onSongSelection}>
        Funky Down-Tempo
      </button>
      <button data-song={2} type="button" className={`btn btn-outline-light active-song-${song === 2}`} onClick={onSongSelection}>
        Ambient Drone
      </button>
    </div>
  );
};

Songs.propTypes = {
  onSongSelection: PropTypes.func.isRequired,
  song: PropTypes.number
};

export default Songs;
