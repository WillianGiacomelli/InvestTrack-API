import { InvestmentCategoryResponse } from "../../../models/investment/category/InvestmentCategoryResponse";
import prisma from "../../../database";

class InvestmentCategoryService {
    public async getCategories(): Promise<InvestmentCategoryResponse[] | []> {

        const category = await prisma.category.findMany();

        if (!category) {
            return [];
        }

        return category.map(cat => ({
            id: cat.id,
            name: cat.name
        }));
    }
}

export default InvestmentCategoryService;