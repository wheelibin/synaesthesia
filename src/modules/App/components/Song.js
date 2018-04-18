import React from "react";
import PropTypes from "prop-types";
import SongInfo from "./SongInfo";
import GenerationOptions from "./GenerationOptions";
const Song = ({ isPlaying, generatedSettings, seed, onRandomise, onSeedChange, currentImage }) => {
  //console.log(currentImage);

  return (
    <div className="row">
      <div className="col-sm-12">
        <div
          className="border border-white"
          style={{
            borderRadius: "0.5em",
            marginTop: 50,
            padding: 0,
            height: 492,
            backgroundColor: "transparent",
            backgroundImage: `url('${currentImage}')`,
            transition: "background-image 2s ease-in",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <SongInfo isPlaying={isPlaying} generatedSettings={generatedSettings} />
          <div style={{ flex: "auto", backgroundColor: "transparent" }} />
          <div className="row>">
            <GenerationOptions isPlaying={isPlaying} seed={seed} onRandomise={onRandomise} onSeedChange={onSeedChange} />
          </div>
        </div>
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
