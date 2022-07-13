import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function useCookie<G>(
  key: string,
  defaultValue: string | G | any = '', // fix
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): any {
  const initialState = () => {
    const lsItem = cookies.get(key);
    if (lsItem) return lsItem;
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  };

  const [value, setValue] = React.useState<G>(initialState);
  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      cookies.remove(key);
    }
    prevKeyRef.current = key;

    cookies.set(key, serialize(value));
  }, [key, serialize, value]);

  return [value, setValue] as const;
}
