import React from 'react';
import Select from 'react-select';
import classes from './DropDown.module.css';


const DropDown = props => (
    <Select className={classes.DropDown} options={props.options} onChange={props.onChange} defaultValue={props.default} />
  );

export default DropDown;