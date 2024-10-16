/* eslint typescript-sort-keys/interface: error */
import type { ReactNode } from 'react'
import type { Item, MenuItem, PageItem } from 'nextra/normalize-pages'
import { PrivateInfo } from '../../src/types';

export type SearchResult = {
  children: ReactNode
  id: string
  prefix?: ReactNode
  route: string
}

// Extends the PageItem and MenuItem with the `private` property
export type ExtendedPageItem = { private?: PrivateInfo } & PageItem;
export type ExtendedMenuItem = { private?: PrivateInfo } & MenuItem;
export type ExtendedItem = { private?: PrivateInfo } & Item;

