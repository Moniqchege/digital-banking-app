export interface Address {
  city: string;
  state: string;
  pincode: string;
  addressLine: string;
}

export interface User {
  userId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNo?: string;
  password: string;
  confirmPassword: string;
  userAddress?: Address;
  role?: 'CUSTOMER' | 'ADMIN';
  token?: string;
}
