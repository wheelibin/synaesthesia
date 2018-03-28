import React from "react";
import PropTypes from "prop-types";

const GenerationOptions = ({ isPlaying, seed, onRandomise, onSeedChange }) => {
  if (isPlaying) {
    return (
      <div className="generation-options border-top">
        <div className="row">
          <div className="col-sm-12 text-center">
            <form className="form">
              <div className="form-group">
                <label htmlFor="seed">Seed (try entering your own)</label>
                <input
                  type="text"
                  className="form-control form-control-lg text-center seed-input"
                  id="seed"
                  onChange={onSeedChange}
                  placeholder="A word or phrase to generate music from"
                  value={seed}
                  disabled={!isPlaying}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seed">Or generate a random seed</label>
                <button type="button" disabled={!isPlaying} className="btn btn-outline-light btn-lg btn-block" onClick={onRandomise}>
                  Randomise!
                </button>
              </div>
            </form>
            <p className="text-justify">
              The music is randomly generated within certain musical constraints, the seed for the currently playing song is shown above. This can be
              shared and entered again to recreate the exact combination of random parameters used to generate this song. Try experimenting by
              entering your own seed, it can be any text string - why not see what your name sounds like? :-)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

GenerationOptions.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  seed: PropTypes.string.isRequired,
  onRandomise: PropTypes.func.isRequired,
  onSeedChange: PropTypes.func.isRequired
};

export default GenerationOptions;
