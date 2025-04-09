import { createContext } from 'react';

export const TableHeadContext = createContext<{ headers: string[] }>({ headers: [] });