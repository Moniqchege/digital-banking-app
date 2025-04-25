export interface Account {
    id: string;
    userId: string;
    name: string;
    balance: number;
    mask: string;
    type: 'Debit' | 'Savings';
    frozen: boolean;
  }