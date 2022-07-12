import React from 'react';
import { fetchFolders } from '../services';
import { EStatus, IFolder } from '../types';

const initialState: IState = {
  status: EStatus.IDLE,
  data: null,
  error: null,
};

export const FileExplorerContext = React.createContext(initialState);

interface FileExplorerContainerProps {
  children: React.ReactNode;
}

interface IState {
  status: EStatus;
  data: IFolder | null;
  error: Error | null;
}

type TAction =
  | { type: EStatus.PENDING }
  | { type: EStatus.RESOLVED; data: IFolder }
  | { type: EStatus.REJECTED; error: Error };

function asyncReducer(_state: IState, action: TAction) {
  switch (action.type) {
    case EStatus.PENDING: {
      return { status: 'pending', data: null, error: null };
    }
    case EStatus.RESOLVED: {
      return { status: 'resolved', data: action.data, error: null };
    }
    case EStatus.REJECTED: {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      const unhandaledAction: { type: string } = action;
      throw new Error(`Unhandled action type: ${unhandaledAction.type}`);
    }
  }
}

const FileExplorerContainer: React.FC<FileExplorerContainerProps> = ({
  children,
}) => {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(asyncReducer, initialState);

  React.useEffect(() => {
    // @ts-ignore
    dispatch({ type: EStatus.PENDING });
    fetchFolders().then(
      (data) => {
        // @ts-ignore
        dispatch({ type: EStatus.RESOLVED, data });
      },
      (error) => {
        // @ts-ignore
        dispatch({ type: EStatus.REJECTED, error });
      }
    );
  }, []);

  return (
    <FileExplorerContext.Provider value={{ ...state }}>
      {children}
    </FileExplorerContext.Provider>
  );
};

export default FileExplorerContainer;
