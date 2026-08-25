export type TProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  rating: number;
  thumbnail: string;
  images: string[];
};

export type TCartItem = TProduct & {
  quantity: number;
};

export type TPaymentFormState = {
  isSuccess: boolean;
  error: null | string;
};
