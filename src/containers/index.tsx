import React from 'react';
import { fetchFolders } from '../services';
import { EStatus, IData } from '../types';

const initialState: IState = {
  status: EStatus.IDLE,
  data: null,
  error: null,
};

// I chose to use context insted of passing props
export const FileExplorerContext = React.createContext(initialState);

interface FileExplorerContainerProps {
  children: React.ReactNode;
}

interface IState {
  status: EStatus;
  data: IData | null;
  error: Error | null;
}

type TAction =
  | { type: EStatus.PENDING }
  | { type: EStatus.RESOLVED; data: IData }
  | { type: EStatus.REJECTED; error: Error };

function asyncReducer(_state: IState, action: TAction): IState {
  switch (action.type) {
    case EStatus.PENDING: {
      return { status: EStatus.PENDING, data: null, error: null };
    }
    case EStatus.RESOLVED: {
      return { status: EStatus.RESOLVED, data: action.data, error: null };
    }
    case EStatus.REJECTED: {
      return { status: EStatus.REJECTED, data: null, error: action.error };
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
  const [state, dispatch] = React.useReducer(asyncReducer, initialState);

  React.useEffect(() => {
    dispatch({ type: EStatus.PENDING });
    fetchFolders().then(
      (data) => {
        dispatch({ type: EStatus.RESOLVED, data });
      },
      (error) => {
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
