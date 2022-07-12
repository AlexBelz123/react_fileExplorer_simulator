import React from 'react';
import styled from 'styled-components';
import { FileExplorerContext } from '../containers';
import { EStatus } from '../types';
import Panel from './Panel';
import Folder from './Folder';
import File from './File';

const sortByNumberComparator = (first: number, second: number, order: TOrder) =>
  order === 'asc' ? first - second : second - first;

// ------------------------------------------

type TOrder = 'asc' | 'desc';
interface IOrders {
  name: TOrder;
  date: TOrder;
  size: TOrder;
}

const FileExplorer = () => {
  const { data, status, error } = React.useContext(FileExplorerContext);
  const [activeFolder, setActiveFolder] = React.useState(null);
  const [orders, setOrders] = React.useState<IOrders>({
    // take from cookie (fix)
    name: 'asc',
    date: 'asc',
    size: 'asc',
  });

  // sort by string fix
  const sortByKey = (key: string, order: TOrder) => {
    setOrders((prevOrders) => ({ ...prevOrders, [key]: order }));
    // @ts-ignore
    setActiveFolder((prev) => [
      // @ts-ignore
      ...prev?.sort((a, b) => sortByNumberComparator(a[key], b[key], order)),
    ]);
  };

  const openFolder = (name: string) => {
    // @ts-ignore
    setActiveFolder(data?.files[`${name}`]);
  };

  const goBack = () => {
    setActiveFolder(null);
  };

  //   make button disabled when mapping folders
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
