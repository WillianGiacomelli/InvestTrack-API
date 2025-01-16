import { InvestmentCategoryResponse } from "../../../models/investment/category/InvestmentCategoryResponse";
import prisma from "../../../database";
import { InvestmentTransactionResponse } from "../../../models/investment/transaction/InvestmentTransactionResponse";
import moment from "moment";

class InvestmentTransactionService {
    public async getTransactionsByWalletId(walletId: number): Promise<InvestmentTransactionResponse[] | []> {
        const investments = await prisma.investment.findMany(
            {
                where: {
                    walletId: walletId
                }
            }
        );

        if (!investments) {
            return [];
        }

        const investmentIds = investments.map(investment => investment.id);

        const transactions = await prisma.transaction.findMany({
            where: {
                investmentId: {
                    in: investmentIds
                }
            },
            include: {
                investment: true
            }
        });

        return transactions.map(transaction => ({
            id: transaction.id,
            transactionDate: transaction.transactionDate,
            investmentId: transaction.investmentId,
            amount: transaction.amount,
            totalValue: transaction.amount * transaction.value,
            modalityId: transaction.modalityId,
            value: transaction.value,
            investment: transaction.investment, 
        }));
    }
    
    public async removeTransaction(transactionId: number): Promise<InvestmentTransactionResponse> {
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

    public async putTransaction({ticker,
        id,
        investmentId,
        amount,
        buyingPrice,
        lastTransaction,
        walletId ,
        categoryId ,
        brokerId}): Promise<InvestmentTransactionResponse> {
            if(!ticker || !amount || !buyingPrice || !lastTransaction || !walletId || !categoryId || !brokerId){
                        throw new Error("Estão faltando informações");
            }
                    
            const datetimeString = moment({
                year: lastTransaction.year,
                month: lastTransaction.month - 1,
                day: lastTransaction.day,
                }).startOf('day').format('YYYY-MM-DD HH:mm:ss');

            const datetimeTransaction = new Date(datetimeString);

            const investment = await prisma.investment.update({
                where:{
                    id: investmentId
                },
                data:{
                    ticker: ticker,
                    amount: +amount,
                    buyingPrice: Number(buyingPrice),
                    lastTransaction: datetimeTransaction,
                    walletId: Number(walletId),
                    categoryId: Number(categoryId),
                    brokerId: Number(brokerId)
                }
            });
            
            const transaction = await prisma.transaction.update({
                where:{
                    id: id
                },
                data:{
                    transactionDate: datetimeTransaction,
                    investmentId: investment.id,
                    amount: +amount,
                    modalityId: 1, 
                    value: Number(buyingPrice),
                }
            });

            return {
                id: transaction.id,
                transactionDate: transaction.transactionDate,
                investmentId: transaction.investmentId,
                amount: transaction.amount,
                totalValue: transaction.amount * transaction.value,
                modalityId: transaction.modalityId,
                value: transaction.value,
            };
        }

}


export default InvestmentTransactionService;