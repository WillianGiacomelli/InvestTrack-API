import { InvestmentCategoryResponse } from "../../../models/investment/category/InvestmentCategoryResponse";
import prisma from "../../../database";
import { InvestmentTransactionResponse } from "../../../models/investment/transaction/InvestmentTransactionResponse";

class InvestmentTransactionService {
    public async getTransactionsByWalletId(walletId: number): Promise<InvestmentTransactionResponse[] | []> {
        const transactions = await prisma.transaction.findMany(
            {
                where: {
                    walletId
                },
                include:{
                    investment: true
                }
            }
        );

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
            value: transaction.value,
            investment: transaction.investment, 
        }));
    }
    
    public async removeTransaction(transactionId: number): Promise<InvestmentTransactionResponse> {
        console.log(transactionId);
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId
            }
        })

        if(!transaction){
            throw new Error("Transação não encontrada");
        }

        const transactionRemoved = await prisma.transaction.delete({
            where: {
                id: transaction.id
            }
        });

        const investment = await prisma.investment.findUnique({
            where: {
                id: transaction.investmentId
            }
        })

        if(!investment){
            throw new Error("Investimento relacionado não encontrado");
        }

        const investmentRemoved = await prisma.investment.delete({
            where: {
                id: investment.id
            }
        })

        return {
            id: transaction.id,
            transactionDate: transaction.transactionDate,
            investmentId: transaction.investmentId,
            walletId: transaction.walletId,
            amount: transaction.amount,
            totalValue: transaction.amount * transaction.value,
            modalityId: transaction.modalityId,
            value: transaction.value,
        };
    }
}

export default InvestmentTransactionService;