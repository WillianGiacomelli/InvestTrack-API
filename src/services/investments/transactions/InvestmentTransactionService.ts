import { InvestmentCategoryResponse } from "../../../models/investment/category/InvestmentCategoryResponse";
import prisma from "../../../database";
import { InvestmentTransactionResponse } from "../../../models/investment/transaction/InvestmentTransactionResponse";

class InvestmentTransactionService {
    public async getTransactionsByWalletId(walletId: number): Promise<InvestmentTransactionResponse[] | []> {
        console.log("walletId por parametro", walletId);
        const transactions = await prisma.transaction.findMany(
            {
                where: {
                    walletId
                }
            }
        );

        console.log("transactions", transactions);

        if (!transactions) {
            return [];
        }

        return transactions.map(transaction => ({
            id: transaction.id,
            transactionDate: transaction.transactionDate,
            investmentId: transaction.investmentId,
            walletId: transaction.walletId,
            amount: transaction.amount,
            totalValue: transaction.amount * transaction.value,
            modalityId: transaction.modalityId,
            value: transaction.value
        }));
    }
}

export default InvestmentTransactionService;