import { TOrder } from '../types';

export const sortByNumberComparator = (
  first: number,
  second: number,
  order: TOrder
) => (order === 'asc' ? first - second : second - first);

export const sortByStringComparator = (
  first: string,
  second: string,
  order: TOrder
) =>
  order === 'asc' ? first.localeCompare(second) : second.localeCompare(first);
