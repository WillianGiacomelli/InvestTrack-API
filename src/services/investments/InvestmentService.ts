import prisma from "../../database";
import moment from 'moment';
import { InvestmentResponse } from "../../models/investment/InvestmentResponse";
import { InvestmentRequest } from "../../models/investment/InvestmentRequest";


class InvestmentService  {
    public async postInvestment({ 
        ticker,
        amount,
        buyingPrice,
        lastTransaction,
        walletId ,
        categoryId ,
        brokerId}: InvestmentRequest): Promise<InvestmentResponse> {
        
        if(!ticker || !amount || !buyingPrice || !lastTransaction || !walletId || !categoryId || !brokerId){
            throw new Error("Estão faltando informações");
        }
        
        const datetimeString = moment({
            year: lastTransaction.year,
            month: lastTransaction.month - 1,
            day: lastTransaction.day,
          }).startOf('day').format('YYYY-MM-DD HH:mm:ss');

        const datetimeTransaction = new Date(datetimeString);

        const investment = await prisma.investment.create({
            data:{
                ticker: ticker,
                amount: +amount,
                buyingPrice: Number(buyingPrice.replace(",", ".")),
                lastTransaction: datetimeTransaction,
                walletId: Number(walletId),
                categoryId: Number(categoryId),
                brokerId: Number(brokerId)
            }
        });

        const transaction = await prisma.transaction.create({
            data:{
                transactionDate: datetimeTransaction,
                investmentId: investment.id,
                walletId: Number(walletId),
                amount: +amount,
                modalityId: 1, 
                value: Number(buyingPrice.replace(",", ".")),
            }
        });

        return investment;
    }

    public async getInvestments(walletId: number): Promise<InvestmentResponse[]> {

        const investments = await prisma.investment.findMany({
            where:{
                walletId,
            }
        });

        return investments;
    }

    public async getInvestmentById(investmentId: number): Promise<InvestmentResponse> {

        const investment = await prisma.investment.findUnique({
            where:{
                id: investmentId,
            }
        });

        return investment;
    }

    public async updateInvestment({ 
        investmentId,
        ticker,
        amount,
        buyingPrice,
        lastTransaction,
        walletId ,
        categoryId ,
        brokerId}): Promise<InvestmentResponse> {
        
        if(!investmentId || !ticker || !amount || !buyingPrice || !lastTransaction || !walletId || !categoryId || !brokerId){
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
                id: investmentId,
            },
            data:{
                ticker: ticker,
                amount: +amount,
                buyingPrice: Number(buyingPrice.replace(",", ".")),
                lastTransaction: datetimeTransaction,
                walletId: Number(walletId),
                categoryId: Number(categoryId),
                brokerId: Number(brokerId)
            }
        });

        return investment;
    }

    public async deleteInvestment(investmentId: number): Promise<InvestmentResponse> {

        const investment = await prisma.investment.delete({
            where:{
                id: investmentId,
            }
        });

        return investment;
    }
}

export default InvestmentService;