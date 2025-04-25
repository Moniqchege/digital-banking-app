import { Account } from "./account.model";

export interface Transfer {
    id: string;
    fromAccount: Account;
    fromAccountName: string;
    toAccount: Account;
    toAccountName: string;
    amount: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: string;
    userId: string;
}