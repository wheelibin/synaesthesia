import React from "react";
import PropTypes from "prop-types";
import SongInfo from "./SongInfo";
import GenerationOptions from "./GenerationOptions";
const Song = ({ isPlaying, generatedSettings, seed, onRandomise, onSeedChange, currentImage }) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div
          className="border border-white rounded"
          style={{
            marginTop: 20,
            padding: 0,
            height: 492,
            backgroundImage: `url('${currentImage}')`,
            transition: "background-image 2s ease-in-out",
            backgroundSize: "cover"
          }}
        >
          {/* <img
            style={{ position: "absolute", left: 0 }}
            src="https://picsum.photos/1148/492/?random"
            className="img-fluid rounded border border-white"
          /> */}
          <SongInfo isPlaying={isPlaying} generatedSettings={generatedSettings} />

          <div className="row>">
            <div className="col-md-6 offset-md-3 border rounded" style={{ backgroundColor: "rgba(0,0,0, 0.5)", marginTop: 100 }}>
              <GenerationOptions isPlaying={isPlaying} seed={seed} onRandomise={onRandomise} onSeedChange={onSeedChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
