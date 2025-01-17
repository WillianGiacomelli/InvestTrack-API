require('dotenv').config();

class QuotesService {
    private BRAPI_API_BASE_URL: string = process.env.BRAPI_URL;
    private COIN_MARKET_CAP_API_BASE_URL: string = process.env.COIN_MARKET_CAP_URL;
    public async getStockQuotes() {
        const higherStockQuoteVariation = await this.getHigherStockQuoteVariation();
        const lowerStockQuoteVariation = await this.getLowerStockQuoteVariation();
        const lowerFundQuoteVariation = await this.getLowerFundQuoteVariation();
        const higherFundQuoteVariation = await this.getHigherFundQuoteVariation();
        const cryptoQuotes = await this.getCryptoQuotes();


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
            },
            cryptos: cryptoQuotes.slice(0, 20)
        };
    }

    private getHigherStockQuoteVariation() {
        const API_URL: string = `${this.BRAPI_API_BASE_URL}/quote/list?type=stock&sortBy=change&sortOrder=desc`;

        return this.fetchQuotes(API_URL);
    }

    private getLowerStockQuoteVariation() {
        const API_URL: string = `${this.BRAPI_API_BASE_URL}/quote/list?type=stock&sortBy=change&sortOrder=asc`;

        return this.fetchQuotes(API_URL);
    }

    private getHigherFundQuoteVariation() {
        const API_URL: string = `${this.BRAPI_API_BASE_URL}/quote/list?type=fund&sortBy=change&sortOrder=desc`;

        return this.fetchQuotes(API_URL);
    }

    private getLowerFundQuoteVariation() {
        const API_URL: string = `${this.BRAPI_API_BASE_URL}/quote/list?type=fund&sortBy=change&sortOrder=asc`;

        return this.fetchQuotes(API_URL);
    }

    private async getCryptoQuotes() {
        const API_URL: string = `${this.COIN_MARKET_CAP_API_BASE_URL}/v1/cryptocurrency/listings/latest?convert=BRL`;

        return this.fetchCryptoQuotes(API_URL);
    }

    public async getStocksQuotes() {
        const API_URL: string = `${this.BRAPI_API_BASE_URL}/quote/list`;

        console.log(API_URL);

        return this.fetchQuotes(API_URL);
    }

    private async fetchQuotes(url: string) : Promise<any> {
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

    private async fetchCryptoQuotes(url: string) : Promise<any> {
        try{
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_TOKEN
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            if(!data.data){
                throw new Error('Dados não encontrados');
            }

            const crypto = data.data;
                            
            const sortedByHighMarketCap = crypto.sort((a, b) => b.quote.BRL.market_cap - a.quote.BRL.market_cap);;
                                                                            
            return sortedByHighMarketCap;
        } catch (error) {
            throw new Error(`Não foi possível buscar os dados da CoinMarketCap ${error.message}`);
        }
    }
}

export default QuotesService;