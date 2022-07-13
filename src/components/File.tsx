import React from 'react';
import styled from 'styled-components';
import { IFile } from '../types';
import FileImage from '../assets/file.png';

interface FileProps {
  file: IFile;
}

const File: React.FC<FileProps> = ({ file }) => {
  const [show, setShow] = React.useState(false);
  const timer = React.useRef<any>();

  const onMouseEnter = () => {
    timer.current = setTimeout(() => setShow(true), 700);
  };

  const onMouseLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    setShow(false);
  };

  return (
    <StyledFile
      onDoubleClick={() => alert('Write some logic (:')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StyledImg src={FileImage} alt={file.name} />
      <StyledTextWrapper>{file.name}</StyledTextWrapper>
      <StyledInfo show={show}>
        <StyledTextWrapper>
          <span>Type:</span> <span>{file.name}</span>
        </StyledTextWrapper>
        <StyledTextWrapper>Size: {file.size}</StyledTextWrapper>
        <StyledTextWrapper>
          Date: {new Date(file.atime).toISOString()}
        </StyledTextWrapper>
      </StyledInfo>
    </StyledFile>
  );
};

const StyledFile = styled.div`
  position: relative;
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

const StyledInfo = styled.div<{ show: boolean }>`
  display: ${(props) => (!props.show ? 'none' : 'block')};
  position: absolute;
  background-color: #fff;
  top: 30;
  left: 0;
  z-index: 10;
  padding: 5px;
  border: 1px solid grey;
`;

const StyledTextWrapper = styled.div`
  display: flex;
`;

export default File;
