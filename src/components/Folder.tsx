import React from 'react';
import { TFolder } from '../types';

interface FolderProps {
  folder: TFolder;
  folderName: string;
}

const Folder: React.FC<FolderProps> = ({ folder, folderName }) => {
  return <div>Folder</div>;
};

export default Folder;
