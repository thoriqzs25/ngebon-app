import { ItemDivide } from '@src/types/states/divide';

export const setDivideItems = ({ title, items }: { title?: string | null; items?: ItemDivide[] | null }) => ({
  type: 'SET_DIVIDE_ITEMS',
  title: title,
  items: items,
});
