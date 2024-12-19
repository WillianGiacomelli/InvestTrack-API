require('dotenv').config();

class QuotesService {
    public async getStockQuotes() {
        const API_BASE_URL: string = process.env.BRAPI_URL;
        const API_URL: string = `${API_BASE_URL}/quote/list?type=stock&sortBy=change&sortOrder=asc&limit=30`;

        try{
            const response = await fetch(API_URL,{
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

            const stocks = data.stocks.filter((stock: any) => !stock.stock.endsWith('F')).slice(0, 10);
            return stocks;
        } catch (error) {
            throw new Error(`Não foi possível buscar os dados da Brapi ${error.message}`);
        }
    }
}

export default QuotesService;