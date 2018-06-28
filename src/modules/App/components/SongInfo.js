import React from "react";
import PropTypes from "prop-types";

const SongInfo = ({ isPlaying, generatedSettings }) => {
  if (generatedSettings && isPlaying) {
    return (
      <div
        className="row"
        style={{
          // backgroundColor: "rgba(0,0,0, 0.5)",
          marginLeft: 0,
          marginRight: 0,
          marginTop: "2em",
          borderTopLeftRadius: "0.5em",
          borderTopRightRadius: "0.5em"
        }}
      >
        <div className="col-md-5 offset-md-1">
          <p style={{ marginBottom: 0 }}>Key</p>
          <h4>{generatedSettings.key}</h4>
        </div>

        <div className="col-md-5">
          <p style={{ marginBottom: 0 }}>Chord Progression</p>
          <h4>{generatedSettings.chordProgressionNotes}</h4>
        </div>
      </div>
    );
  }
  return null;
};

SongInfo.propTypes = {
  isPlaying: PropTypes.bool,
  generatedSettings: PropTypes.object
};

export default SongInfo;
