import prisma from "../../../database";
import { InvestmentBrokerResponse } from "../../../models/investment/broker/InvestmentBrokerResponse";

class InvestmentBrokerService {
    public async getBrokers(): Promise<InvestmentBrokerResponse[] | []> {

        const brokers = await prisma.broker.findMany();

        if (!brokers) {
            return [];
        }

        return brokers.map(broker => ({
            id: broker.id,
            name: broker.name
        }));
    }
}

export default InvestmentBrokerService;