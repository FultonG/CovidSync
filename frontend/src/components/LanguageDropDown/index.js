import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import languages from '../../utils/languages.json';
import {Input} from '../Form';

const Container = styled.div`
  color: white;
  padding: .5rem 1rem;
`;

const Select = styled.select`
  background-color: #fafafa;
  border-width: 0px 0px 0px 0px;
  border-radius: 5px 5px 5px 5px;
  padding: 3px;
  color: #3d4459;
  margin: 5px 0px;
`;

const LanguageDropDown = ({value, onSelect}) => {
  const handleSelectChange = (e) => {
    onSelect(languages[e.target.value])
  }
  return (
    <Container>
      <span>Current Language: <Select value={languages.indexOf(value)} onChange={handleSelectChange}>{languages.map((lang, idx) => <option key={idx} value={idx}>{lang.code}</option>)}</Select></span>
    </Container>
  )
}

export default LanguageDropDown;