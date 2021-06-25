import React from "react";
import Slider from "@material-ui/core/Slider";

const SliderContainer = (props) => {
  const { value, handleChange, name } = props;
  return (
    <div className="slider-container">
      <div className="slider-name">{name}</div>
      <div className="slider">
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </div>
    </div>
  );
};

export default SliderContainer;
