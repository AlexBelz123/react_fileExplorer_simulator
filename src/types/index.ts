export interface IFile {
  name: string;
  type: string;
  size: number;
  atime: number;
  mtime: number;
  dev: number;
}

export interface IFolder {
  files: IFile[];
}

export enum EStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}
