import React, { useState, useEffect } from "react";
import styled from "styled-components";
import languages from "../../utils/languages.json";

const Container = styled.div`
  ${({ color }) => `color: ${color};`}
  ${({ padding }) => `padding: ${padding};`}
`;

const Select = styled.select`
  ${({ width }) => `width: ${width};`}
  background-color: #fafafa;
  border-width: 0px 0px 0px 0px;
  border-radius: 5px 5px 5px 5px;
  padding: 3px;
  color: #3d4459;
  margin: 5px 0px;
`;

const LanguageDropDown = ({
  value,
  onSelect,
  displayValue = "code",
  width = "auto",
  labelColor = "white",
  label = "Current Language:",
  padding = ".5rem 1rem",
}) => {
  const handleSelectChange = (e) => {
    onSelect(languages[e.target.value]);
  };
  return (
    <Container color={labelColor} padding={padding}>
      <span>
        {label}{" "}
        <Select
          width={width}
          value={languages.indexOf(value)}
          onChange={handleSelectChange}
        >
          {languages.map((lang, idx) => (
            <option key={idx} value={idx}>
              {lang[displayValue]}
            </option>
          ))}
        </Select>
      </span>
    </Container>
  );
};

export default LanguageDropDown;
