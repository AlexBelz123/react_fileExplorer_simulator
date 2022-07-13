export interface IFile {
  name: string;
  type: string;
  size: number;
  atime: number;
  mtime: number;
  dev: number;
}

export type TFolder = IFile[];

export interface IData {
  files: {
    [key: string]: TFolder;
  };
}

export enum EStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export type TOrder = 'asc' | 'desc';
export interface IOrders {
  name: TOrder;
  atime: TOrder;
  size: TOrder;
}
