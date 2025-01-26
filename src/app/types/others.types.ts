export type SortType = {
  key: string;
  direction: string;
};

export type TableHeaderType = {
  title: string;
  dbName: string | undefined;
  sortable: boolean | undefined;
  editable: boolean | undefined;
  deletable: boolean | undefined;
  colSpan: number | undefined;
  width: string | undefined;
};
