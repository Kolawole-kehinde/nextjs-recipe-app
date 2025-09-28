export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  payment: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}
