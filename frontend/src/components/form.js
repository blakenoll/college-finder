import React, { useState } from "react";
import Select from "./select";
import styled from "styled-components";

const Form = ({ className }) => {
  const [name, setName] = useState("College Search");
  const [size, setSize] = useState();
  const [submitted, setSubmitted] = useState(false);

  const sizes = ["500 - 1000", "1001 - 5000", "5000+"];

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(!submitted);
  }

  return (
    <div className={className}>
      <h1>{name}</h1>
      <form onSubmit={handleSubmit}>
        <label>size:</label>
        <Select
          name="size"
          onChange={e => setSize(e.target.value)}
          options={sizes}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const StyledName = styled(Form)`
  color: #0c2340;
  font-size: 1rem;
`;

export default StyledName;
