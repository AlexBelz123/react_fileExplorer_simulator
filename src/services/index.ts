import { api } from '../utils/api';
import { IData } from '../types';

// extract requests here to use them anywhere in future
export const fetchFolders = async (): Promise<IData> =>
  (await api.get('/test_json_files')).data;
