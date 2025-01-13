import prisma from "../../database";
import moment from 'moment';
import { InvestmentRequest } from "../../models/investment/Investment";


class InvestmentService  {
    async postInvestment({ 
        ticker,
        amount,
        buyingPrice,
        lastTransaction,
        walletId ,
        categoryId ,
        brokerId}): Promise<InvestmentRequest> {
        
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
                ticker,
                amount: +amount,
                buyingPrice: Number(buyingPrice.replace(",", ".")),
                lastTransaction: datetimeTransaction,
                walletId: Number(walletId),
                categoryId ,
                brokerId
            }
        });

    

        return investment;
    }
}

export default InvestmentService;