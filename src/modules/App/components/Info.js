import React from "react";
import PropTypes from "prop-types";

const Info = ({ isPlaying }) => {
  if (isPlaying) {
    return (
      <div className="info-section">
        <p className="lead text-left">What's all this then?</p>
        <p className="text-justify">
          The music is randomly generated within certain musical constraints, the seed for the currently playing song is shown above. This can be
          shared and entered again to recreate the exact combination of random parameters used to generate this song. Try experimenting by entering
          your own seed, it can be any text, word, or phrase!
        </p>
        <p className="text-left">
          All the code, and a bit more info, can be found on GitHub here:{" "}
          <a href="https://github.com/wheelibin/synaesthesia">https://github.com/wheelibin/synaesthesia</a>
        </p>
      </div>
    );
  }
  return null;
};

Info.propTypes = {
  isPlaying: PropTypes.bool.isRequired
};

export default Info;
