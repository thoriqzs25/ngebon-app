import { UserDocument } from '../collection/usersCollection';

export interface DivideReducerState {
  title: string | null;
  items: ItemDivide[] | null;
  assignedFriends: AssignFriend[] | null;
}

export type ItemDivide = {
  itemName: string;
  price: string;
  qty: string;
  // pricePerUser?: number;
  parts?: number;
  fullParts: number;
  totalPrice: number;
};

export type DivideReducerAction =
  | { type: 'SET_DIVIDE_ITEMS'; title: string; items: ItemDivide[] }
  | { type: 'SET_ASSIGNED_FRIENDS'; friends: AssignFriend[] };

export type AssignFriend = {
  user: UserDocument;
  selectedItem: ItemParts[];
};

type ItemParts = {
  itemIdx: number;
  parts: number;
};

export type AssignItems = {
  item: {
    qty: string;
    price: string;
    itemName: string;
    fullParts: number;
    totalPrice: number;
  };
  userArr: UserDocument[];
};
