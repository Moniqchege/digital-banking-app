export interface Transaction {
  name: string;
  date: string;
  type: 'Deposit' | 'Withdrawal';
  status: 'Completed' | 'Pending';
  amount: number;
  category: 'Deposit' | 'Withdraw';
}
