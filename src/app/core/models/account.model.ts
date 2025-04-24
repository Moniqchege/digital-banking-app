export interface Account {
    id: string;
    name: string;
    balance: number;
    mask: string;
    type: 'Debit' | 'Savings';
  }