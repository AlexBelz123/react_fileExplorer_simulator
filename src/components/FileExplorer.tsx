import React from 'react';
import styled from 'styled-components';
import { FileExplorerContext } from '../containers';
import useCookie from '../hooks/useCookie';
import { EStatus, TOrder, IOrders, TFolder } from '../types';
import {
  sortByNumberComparator,
  sortByStringComparator,
} from '../utils/helpers';
import Panel from './Panel';
import Folder from './Folder';
import File from './File';

const initialOrderState = (): IOrders => ({
  name: 'asc',
  atime: 'asc',
  size: 'asc',
});

const FileExplorer = () => {
  const { data, status, error } = React.useContext(FileExplorerContext);
  const [activeFolder, setActiveFolder] = React.useState<TFolder | null>(null);
  const [orders, setOrders] = useCookie<IOrders>('orders', initialOrderState);
  const sortByKey = (key: string, order: TOrder) => {
    // @ts-ignore
    setOrders((prevOrders) => ({ ...prevOrders, [key]: order }));
    // @ts-ignore
    setActiveFolder((prev) => [
      // @ts-ignore
      ...prev?.sort((a, b) => {
        if (typeof a[key] === 'string') {
          return sortByStringComparator(a[key], b[key], order);
        }

        return sortByNumberComparator(a[key], b[key], order);
      }),
    ]);
  };

  const openFolder = (name: string) => {
    // @ts-ignore
    setActiveFolder(data?.files[`${name}`]);
  };

  const goBack = () => {
    setActiveFolder(null);
  };

  React.useEffect(() => {
    if (data && activeFolder) {
      sortByKey('name', orders.name);
      sortByKey('size', orders.size);
      sortByKey('atime', orders.atime);
    }
  }, [data]);

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
          // @ts-ignore
          Object.entries(data?.files).map(([key, value]) => (
            <Folder
              key={key}
              folder={value}
              folderName={key}
              openFolder={openFolder}
            />
          ))}
        {Boolean(activeFolder) &&
          // @ts-ignore
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
