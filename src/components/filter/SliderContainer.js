import React from "react";
import Slider from "@material-ui/core/Slider";
import "./SliderContainer.css";
const SliderContainer = (props) => {
  const { value, handleChange, name, min, max } = props;
  return (
    <div className="slider-container">
      <div className="slider-name">{name}</div>
      <div className="slider">
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={min}
          max={max}
          step={0.1}
        />
      </div>
    </div>
  );
};

export default SliderContainer;
