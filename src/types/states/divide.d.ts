export interface DivideReducerState {
  title: string | null;
  items: ItemDivide[] | null;
}

export type ItemDivide = {
  itemName: string;
  price: string;
  qty: string;
  totalPrice: number;
};

export type DivideReducerAction = { type: 'SET_DIVIDE_ITEMS'; title: string; items: ItemDivide[] };
