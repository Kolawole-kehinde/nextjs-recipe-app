export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  payment: "card" | "paypal" | "cod";
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}