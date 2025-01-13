export class InvestmentRequest {
    ticker!: string;
    amount!: string;
    buyingPrice!: string;
    lastTransaction!: {
        year: number;
        month: number;
        day: number;
    };
    walletId!: number;
    categoryId!: number;
    brokerId!: number;
  }