/* eslint-disable*/
import p5 from "p5";
import React, { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { generate } from "shortid";

export default function (id = generate()) {
  let canvas: any = null;

  function P5Wrapper({ sketch = (p: any) => {}, state = {}, dispatch = () => {} }) {
    const sketchContainer = useRef(null);

    useEffect(() => {
      canvas = new p5(sketch, sketchContainer.current);
      canvas.state = state;
      canvas.dispatch = dispatch;

      return () => {
        canvas.remove();
      };
    }, [dispatch, sketch, state]);

    return <div ref={sketchContainer} className="section"></div>;
  }

  P5Wrapper.propTypes = {
    state: PropTypes.object,
    sketch: PropTypes.func,
  };

  P5Wrapper.defaultProps = {
    state: {},
    sketch: () => {},
  };

  return memo(P5Wrapper, (_, nextProps) => {
    canvas.state = { ...nextProps.state };

    return true;
  });
}
