import React from 'react';
import styled from 'styled-components';
import { IFile } from '../types';
import FileImage from '../assets/file.png';

interface FileProps {
  file: IFile;
}

const File: React.FC<FileProps> = ({ file }) => {
  return (
    <StyledFolder onDoubleClick={() => alert('Write some logic (:')}>
      <StyledImg src={FileImage} alt={file.name} />
      <div>{file.name}</div>
    </StyledFolder>
  );
};

const StyledFolder = styled.div`
  margin: 20px 10px;
  width: 75px;
  padding: 10px;
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
  cursor: pointer;
`;
const StyledImg = styled.img`
  width: 100%;
  object-fit: contain;
  filter: contrast(2); // to remove background
`;

export default File;
