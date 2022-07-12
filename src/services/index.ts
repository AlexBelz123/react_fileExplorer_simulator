import { api } from '../utils/api';
import { IData } from '../types';

export const fetchFolders = async (): Promise<IData> =>
  (await api.get('/test_json_files')).data;
