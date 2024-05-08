import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faCog, faLeaf } from '@fortawesome/free-solid-svg-icons';

const Box = styled.div`
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
  max-height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 9rem;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  ${({ checked }) => !checked && `
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  `}
  
  ${({ checked }) => checked && `
    transform: scale(1.1);
  `}
`;

const SkillBox = ({ iconName, borderColor, text, checked }) => {

  let icon;
  switch (iconName) {
    case 'computer':
      icon = faDesktop;
      break;
    case 'gear':
      icon = faCog;
      break;
    case 'leaf':
      icon = faLeaf;
      break;
    default:
      icon = null;
  }

  return (
    <Box style={{backgroundColor: checked ? borderColor  : "white" , border: `3px solid ${borderColor }`, color: `${checked ? "white" : borderColor}` }} checked={checked}>
      {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: '24px' }} />}
      <span style={{ color: checked?  "white": 'black', fontWeight: 'bold' }}>{text}</span>
    </Box>
  );
}

export default SkillBox;
