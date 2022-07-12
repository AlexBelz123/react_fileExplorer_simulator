import React from 'react';
import styled from 'styled-components';
import { TFolder } from '../types';
import FolderImage from '../assets/folder.jpg';

interface FolderProps {
  folder: TFolder;
  folderName: string;
  openFolder: (n: string) => void;
}

const Folder: React.FC<FolderProps> = ({ folder, folderName, openFolder }) => {
  return (
    <StyledFolder onDoubleClick={() => openFolder(folderName)}>
      <StyledImg src={FolderImage} alt={folderName} />
      <div>{folderName}</div>
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

export default Folder;
