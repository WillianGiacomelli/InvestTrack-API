import prisma from "../../database";
import { WalletResponse } from "../../models/wallet/responses/WalletResponse";

class WalletService {
    public async getwallet({userId}): Promise<WalletResponse | null> {
        
        if(!userId){
            throw new Error("userId é requrido");
        }

        const wallet = await prisma.wallet.findUnique({
            where: { 
                userId: userId 
            }
        });

        if (!wallet) {
            return null;
        }

        return {
            id: wallet.id,
            userId: wallet.userId,
            name: wallet.name
        };
    }

    public async createWallet({id,name}): Promise<WalletResponse> {

        if(!name){
            throw new Error("name é requrido");
        }

        const wallet = await prisma.wallet.create({
            data: {
                userId: id,
                name
            }
        });

        return wallet;
    }
}

export default WalletService;