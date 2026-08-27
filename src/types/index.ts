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
  product: string;
  quantity: 1;
  _id: string;
};

export type TOrder = {
  _id: string;
  owner: {
    username: string;
    email: string;
  };
  products: TOrderItem[];
  price: number;
  delivered: boolean;
  address: string;
};
