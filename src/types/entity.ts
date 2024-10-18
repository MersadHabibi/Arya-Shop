export type TBrand = { Code: number; image: string; Name: string };

export type TOrderStatus =
  | "New"
  | "Accepted"
  | "Preparing"
  | "OutCompany"
  | "InPostOffice"
  | "OnShipping"
  | "Arrive"
  | "Canceled";

export type TOrder = {
  products: {
    product: {
      Name: string;
      Code: number;
      galleries: { image: string } | null;
    };
    quantity: number;
    price: number;
    amount: number;
  }[];
  code: string;
  address_full_name: string;
  address_phone: string;
  address_state: string;
  address_city: string;
  address_address: string;
  address_post_code: string;
  post_way: { id: number; way: string; price: number };
  pay_way: string;
  total: number;
  amount: number;
  status: TOrderStatus;
  create_at: Date;
  update_at: Date;
};

export type TAddress = {
  id: number;
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
  galleries: { image: string } | null;
  price: number;
  Name: string;
  Code: number;
  quantity: number;
  favorite: boolean;
  description?: string;
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
  product: { Name: string; Code: number; galleries: { image: string } };
  amount: number;
  quantity: number;
  id: number;
};
