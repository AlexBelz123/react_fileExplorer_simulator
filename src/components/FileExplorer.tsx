import React from 'react';
import styled from 'styled-components';
import { FileExplorerContext } from '../containers';
import { EStatus } from '../types';

const FileExplorer = () => {
  const { data, status, error } = React.useContext(FileExplorerContext);

  return (
    <StyledFileContainer>
      {status === EStatus.IDLE ||
        (status === EStatus.PENDING && <div>Loading...</div>)}
      {status === EStatus.REJECTED && <div>{error?.message}</div>}
      {status === EStatus.RESOLVED && <div>Loaded</div>}
    </StyledFileContainer>
  );
};

const StyledFileContainer = styled.div`
  width: 80%;
  background-color: #fff;
  border: 1px solid #000;
  margin: 0 auto;
`;

export default FileExplorer;
