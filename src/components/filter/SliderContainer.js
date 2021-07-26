import React from "react";
import Slider from "@material-ui/core/Slider";
import "./SliderContainer.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const PrettoSlider = withStyles({
  root: {
    color: "#2B7A78",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const SliderContainer = (props) => {
  const { value, handleChange, name, min, max } = props;
  return (
    <div className="slider-container">
      <div className="slider-name">{name}</div>
      <div className="slider">
        <PrettoSlider
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
