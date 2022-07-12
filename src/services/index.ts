import { api } from '../utils/api';
import { IFolder } from '../types';

export const fetchFolders = async (): Promise<IFolder> =>
  (await api.get('/test_json_files')).data;
