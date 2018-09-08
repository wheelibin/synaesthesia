import React from "react";
import PropTypes from "prop-types";

const Info = ({ isPlaying }) => {
  if (isPlaying) {
    return (
      <div className="info-section">
        <p className="lead text-center">What&#39;s all this then?</p>
        <p className="text-center">
          All the music is randomly generated, within certain musical constraints, using the excellent{" "}
          <a href="https://tonejs.github.io/" target="new">
            Tone.js
          </a>. The random generation algorithm is seeded with the seed shown above, this can be changed to anything you like, and entering the same
          seed with always produce the same randomly generated song.
        </p>
        <p className="text-center">
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
