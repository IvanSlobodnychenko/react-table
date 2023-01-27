import { useMemo } from "react";

const sortString = (data, order, key) => {
  if (order) {
    return [...data].sort((a, b) => a[key]?.localeCompare(b[key]));
  } else {
    return [...data].sort((a, b) => b[key]?.localeCompare(a[key]));
  }
}

const sortNumbers = (data, order, key) => {
  if (order) {
    return [...data].sort((a, b) => b[key] - a[key]);
  } else {
    return [...data].sort((a, b) => a[key] - b[key]);
  }
}

export const useSortedData = (data, order, key) => {
  const sortedData = useMemo(() => {
    if (key) {
      if (typeof data[0][key] === 'string') {
        return sortString(data, order, key);
      } else {
        return sortNumbers(data, order, key);
      }
    }

    return data;
  }, [data, order, key])

  return sortedData;
}
