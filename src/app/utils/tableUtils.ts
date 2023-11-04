import { Order } from '@/app/utils/types';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// TODO: Add sort by date
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  if (!array || array.length === 0) {
    return [];
  }
  return array.slice().sort(comparator);
}
