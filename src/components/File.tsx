import React from 'react';
import styled from 'styled-components';
import { IFile } from '../types';

interface FileProps {
  file: IFile;
}

const File: React.FC<FileProps> = ({ file }) => {
  return <StyledWrapper>{file.name}</StyledWrapper>;
};

const StyledWrapper = styled.div`
  width: 100px;
  height: 250px;
  background-color: aqua;
`;

export default File;
