import React from "react";

const Select = ({ name, onChange, options }) => {
  return (
    <select name={name} onChange={onChange}>
      {options.map((o, i) => {
        return (
          <option value={o} key={i}>
            {o}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
