export type TAddress = {
  title: string;
  zipcode: string;
  address: string;
  city: string;
  state: string;
  plate: number;
  unit: number;
  call_number: string;
  reciever_name: string;
  description: string;
};

export type Category = {
  image: null | string;
  Code: number;
  Name: string;
  classes?: Omit<Category, "classes">[];
};

export type Product = {
  galleries: { image: string }[] | null;
  price: number;
  Name: string;
  Code: number;
  quantity: number;
  favorite: boolean,
};

export type Profile = {
  name: string;
  email: string;
  phone_number: string;
  national_code: string;
  birthday_date: Date;
};

export type Brand = {
  Code: number;
  Name: string;
};

export type Comment = {
  user: {
    name: string;
  };
  title: string;
  text: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
};

export type SelectValue = {
  value: string;
  display: string;
};

export type CartResponse = {
  carts: CartResponseItem[];
  total_price: number;
};

export type CartResponseItem = {
  product: { Name: string; Code: number };
  amount: number;
  quantity: number;
  id: number;
};
