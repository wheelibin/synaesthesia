import React from "react";
import PropTypes from "prop-types";

const NowPlayingSection = ({ isPlaying, generatedSettings }) => {
  if (generatedSettings && isPlaying) {
    return (
      <section className="now-playing-section">
        <div className="row">
          <div className="col-md-12">
            <h5>Key</h5>
            <p className="now-playing">{generatedSettings.key}</p>
          </div>

          <div className="col-md-12">
            <h5>Chord Progression</h5>
            <p className="now-playing-chords">{generatedSettings.chordProgressionNotes}</p>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

NowPlayingSection.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  generatedSettings: PropTypes.object
};

export default NowPlayingSection;
