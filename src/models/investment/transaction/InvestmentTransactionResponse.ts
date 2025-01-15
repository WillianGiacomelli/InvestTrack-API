import { InvestmentResponse } from '../InvestmentResponse';
import { Investment } from './../../../../node_modules/.prisma/client/index.d';
export class InvestmentTransactionResponse{
    id: number;
    transactionDate: Date;
    value: number;
    amount: number;
    modalityId: number;
    totalValue: number;
    investmentId: number;
    walletId: number;
    Investment: InvestmentResponse[];
}