import React from "react";
import PropTypes from "prop-types";
import SongInfo from "./SongInfo";
import GenerationOptions from "./GenerationOptions";

const Song = ({ isPlaying, generatedSettings, seed, onRandomise, onSeedChange }) => {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2 col-sm-12 song border rounded">
        <SongInfo isPlaying={isPlaying} generatedSettings={generatedSettings} />
        <GenerationOptions isPlaying={isPlaying} seed={seed} onRandomise={onRandomise} onSeedChange={onSeedChange} />
      </div>
    </div>
  );
};

Song.propTypes = {
  isPlaying: PropTypes.bool,
  generatedSettings: PropTypes.object,
  seed: PropTypes.string.isRequired,
  onRandomise: PropTypes.func.isRequired,
  onSeedChange: PropTypes.func.isRequired,
  currentImage: PropTypes.string
};

export default Song;
