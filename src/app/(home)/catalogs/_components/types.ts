import { Catalog, Order } from '@/app/utils/types';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Catalog;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Catalog) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
