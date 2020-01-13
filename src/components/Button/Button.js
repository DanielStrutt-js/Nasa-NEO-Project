import React from "react";
import classes from './Button.module.css'

const ToggleButton = props => (
  
   
    <button className={classes.Button} onClick={props.clicked} value={props.value} >{props.value?"Switch to table":"Switch to chart"} </button>
    
);
  

export default ToggleButton;