import React from 'react';
import styled from 'styled-components';
import { FileExplorerContext } from '../containers';
import { useCookie } from '../hooks/useCookie';
import { EStatus, TOrder, IOrders, TFolder, IFile, IData } from '../types';
import {
  sortByNumberComparator,
  sortByStringComparator,
} from '../utils/helpers';
import Panel from './Panel';
import Folder from './Folder';
import File from './File';

const initialOrderState: IOrders = {
  name: 'asc',
  atime: 'asc',
  size: 'asc',
};

const FileExplorer = () => {
  const { data, status, error } = React.useContext(FileExplorerContext);
  const [activeFolder, setActiveFolder] = React.useState<TFolder | null>(null);
  const [orders, setOrders] = useCookie<IOrders>('orders', initialOrderState);

  const sortByKey = (key: keyof IFile, order: TOrder) => {
    setOrders((prevOrders: IOrders) => ({ ...prevOrders, [key]: order }));

    const sortedFiles = (activeFolder as TFolder).sort((a, b) => {
      let item1 = a[key as keyof IFile];
      let item2 = b[key as keyof IFile];

      if (typeof item1 === 'string' && typeof item2 === 'string') {
        return sortByStringComparator(item1, item2, order);
      }
      item1 = +item1; // default sort by number
      item2 = +item2;
      return sortByNumberComparator(item1, item2, order);
    });

    setActiveFolder(sortedFiles);
  };

  const openFolder = (name: string) => {
    setActiveFolder(data?.files[name] as TFolder);
  };

  const goBack = () => {
    setActiveFolder(null);
  };

  return (
    <StyledFileContainer>
      <Panel
        goBack={goBack}
        sortByKey={sortByKey}
        orders={orders}
        disabled={!Boolean(activeFolder)}
      />
      {status === EStatus.IDLE ||
        (status === EStatus.PENDING && <div>Loading...</div>)}
      {status === EStatus.REJECTED && <div>{error?.message}</div>}
      <StyledFolderContainer>
        {status === EStatus.RESOLVED &&
          !activeFolder &&
          Object.keys((data as IData).files).map((key) => (
            <Folder key={key} folderName={key} openFolder={openFolder} />
          ))}
        {activeFolder !== null &&
          activeFolder.map((f) => <File key={f.mtime} file={f} />)}
      </StyledFolderContainer>
    </StyledFileContainer>
  );
};

const StyledFileContainer = styled.div`
  width: 80%;
  background-color: #fff;
  border: 1px solid #000;
  margin: 0 auto;
`;

const StyledFolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default FileExplorer;
