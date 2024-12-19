import prisma from "../../database";
import { WalletResponse } from "../../models/wallet/responses/WalletResponse";

class WalletService {
    public async getwallet({userId}): Promise<WalletResponse> {
        
        if(!userId){
            throw new Error("userId é requrido");
        }

        const wallet = await prisma.wallet.findUnique({
            where: { 
                userId: userId 
            }
        });

        if (!wallet) {
            throw new Error("Carteira não encontrada");
        }

        return {
            id: wallet.id,
            userId: wallet.userId,
            name: wallet.name
        };
    }
}

export default WalletService;