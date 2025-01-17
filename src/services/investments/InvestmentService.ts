import prisma from "../../database";
import moment from 'moment';
import { InvestmentResponse } from "../../models/investment/InvestmentResponse";
import { InvestmentRequest } from "../../models/investment/InvestmentRequest";
import QuotesService from "../quotes/QuotesService";


class InvestmentService  {
    private _quotesService: QuotesService;

    constructor(
        quotesService = new QuotesService()
    ){
        this._quotesService = quotesService;
    }

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
                amount: +amount,
                modalityId: 1, 
                value: Number(buyingPrice.replace(",", ".")),
            }
        });

        return investment;
    }

    public async getInvestments(walletId: number): Promise<any> {

        const investments = await prisma.investment.findMany({
            where:{
                walletId,
            }
        });

        const transactions = await prisma.transaction.findMany({
            where:{
                investmentId: {
                    in: investments.map(investment => investment.id)
                }
            }
        })

        const isAnyStockInvestment = investments.some(investment => investment.categoryId == 1);

        if(isAnyStockInvestment){
            const stockInvestments = investments.filter(investment => { 
                return investment.categoryId == 1 
            });

            const tickers = Array.from(new Set(stockInvestments.map(investment => investment.ticker)));

            const quotes = await this._quotesService.getStocksQuotes();
            let quotesFiltered = quotes.filter(quote => tickers.includes(quote.stock));
            
            const investmentsWithQuotes = stockInvestments.map(investment => {
                const quote = quotesFiltered.find(quote => quote.stock === investment.ticker);
                if(quote){
                    return {
                        ...investment,
                        currentPrice: quote.close,
                        percentVariation: ((quote.close - investment.buyingPrice) / investment.buyingPrice) * 100,
                        paid: investment.amount * investment.buyingPrice,
                        currentTotalValue: investment.amount * quote.close,
                        totalVariation: (investment.amount * quote.close) - (investment.amount * investment.buyingPrice),
                    }
                }
            });

            let paid = 0;
            let currentTotalValue = 0;
            let totalVariation = 0;

            investmentsWithQuotes.forEach(investment => {
                paid += investment.paid;
                currentTotalValue += investment.currentTotalValue;
                totalVariation += investment.totalVariation;
            });

            const investmentsOverview = {
                paid,
                currentTotalValue,
                totalVariation,
                percentTotalVariation: ((currentTotalValue - paid) / paid) * 100,
            };

            return {
                dashboard:investmentsOverview,
                investments: investmentsWithQuotes
            }

        }

        
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