require('dotenv').config();

class QuotesService {
    private API_BASE_URL: string = process.env.BRAPI_URL;
    public async getStockQuotes() {
        const higherStockQuoteVariation = await this.getHigherStockQuoteVariation();
        const lowerStockQuoteVariation = await this.getLowerStockQuoteVariation();
        const lowerFundQuoteVariation = await this.getLowerFundQuoteVariation();
        const higherFundQuoteVariation = await this.getHigherFundQuoteVariation();


        const higherStocks = higherStockQuoteVariation
            .filter((stock: any) => !stock.stock.endsWith('F'))
            .slice(0, 5);
  
        const lowerStocks = lowerStockQuoteVariation
            .filter((stock: any) => !stock.stock.endsWith('F'))
            .slice(0, 5);

        const higherFunds = higherFundQuoteVariation
            .filter((stock: any) => stock.stock.endsWith('F'))
            .slice(0, 5);

        const lowerFunds = lowerFundQuoteVariation
            .filter((stock: any) => stock.stock.endsWith('F'))
            .slice(0, 5);
  
        const minStockLength = Math.min(higherStocks.length, lowerStocks.length);
        const minFundLength = Math.min(higherFunds.length, lowerFunds.length);
  
        return {
            stocks:{
                higher: higherStocks.slice(0, minStockLength),
                lower: lowerStocks.slice(0, minStockLength),
            },
            funds:{
                higher: higherFunds.slice(0, minFundLength),
                lower: lowerFunds.slice(0, minFundLength),
            }
        };
    }

    private getHigherStockQuoteVariation() {
        const API_URL: string = `${this.API_BASE_URL}/quote/list?type=stock&sortBy=change&sortOrder=desc`;

        return this.getQuotes(API_URL);
    }

    private getLowerStockQuoteVariation() {
        const API_URL: string = `${this.API_BASE_URL}/quote/list?type=stock&sortBy=change&sortOrder=asc`;

        return this.getQuotes(API_URL);
    }

    private getHigherFundQuoteVariation() {
        const API_URL: string = `${this.API_BASE_URL}/quote/list?type=fund&sortBy=change&sortOrder=desc`;

        return this.getQuotes(API_URL);
    }

    private getLowerFundQuoteVariation() {
        const API_URL: string = `${this.API_BASE_URL}/quote/list?type=fund&sortBy=change&sortOrder=asc`;

        return this.getQuotes(API_URL);
    }

    private async getQuotes(url: string) : Promise<any> {
        try{
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.BRAPI_TOKEN}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            if(!data.stocks){
                throw new Error('Dados não encontrados');
            }

            const stocks = data.stocks;
                                                                        ;
                                                                            
            return stocks;
        } catch (error) {
            throw new Error(`Não foi possível buscar os dados da Brapi ${error.message}`);
        }
    }
}

export default QuotesService;