import { InvestmentCategoryResponse } from "../../../models/investment/category/InvestmentCategoryResponse";
import prisma from "../../../database";

class InvestmentCategoryService {
    public async getTransactionsByWalletId(walletId: number): Promise<any> {

        const transactions = await prisma.transaction.findMany();

        if (!transactions) {
            return [];
        }

        return transactions.map(transaction => ({
            id: transaction.id,
            transactionDate: transaction.transactionDate,
            investmentId: transaction.investmentId,
            walletId: transaction.walletId,
            amount: transaction.amount,
            modalityId: transaction.modalityId,
            value: transaction.value
        }));
    }
}

export default InvestmentCategoryService;