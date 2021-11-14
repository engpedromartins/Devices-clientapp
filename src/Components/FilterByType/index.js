import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { MenuProps, useStyles, options } from "./utils";

function FilterTypeOfDevice({ filterByType, updateValue }) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

  //when change the value this function send de value by props
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    filterByType(value)
  };

  useEffect(() => {
    setSelected([])
  }, [updateValue])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="filter-type">Filter by Type</InputLabel>
      <Select
        labelId="filter-type"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FilterTypeOfDevice;