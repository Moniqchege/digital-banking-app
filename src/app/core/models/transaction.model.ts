
export interface Account {
    id: string;
    appwriteItemId: string;
    name: string;
  }
  
  export interface Transaction {
    id: string;
    name: string;
    date: string;
    amount: number;
    type: string;
    paymentChannel: string;
    category: string;
  }
  