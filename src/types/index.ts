export type TProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  thumbnail: string;
  images: string[];
};

export type TCartItem = TProduct & {
  quantity: number;
};

export type TLoginFormState = {
  error: null | string;
  isAdmin: boolean;
};

export type TPaymentFormState = {
  isSuccess: boolean;
  error: null | string;
};

export type TOrderItem = {
  _id: string;
  product: string;
  quantity: number;
};

export type TOrder = {
  _id: string;
  owner: {
    username: string;
    email: string;
  };
  products: TOrderItem[] | TCartItem[];
  price: number;
  delivered: boolean;
  address: string;
};
