import crypto from 'crypto';

export class ParticipantFactory {
    private firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy", "Mallory", "Niaj", "Oscar", "Peggy", "Sybil", "Trent", "Walter"];// i will be  using  a dictionary  with real forum usernames later
    
    private getRandomElement<T>(arr: T[]): T {
        return arr[Math.floor(crypto.randomInt(0, arr.length))];
    }

    
    private generateWalletAddress(): string {
        const chars : string = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        let address : string = 'bc1q'; 
        for (let i = 0; i < 38; i++) {
            address += chars.charAt(crypto.randomInt(0, chars.length));
        }
        return address;
        }

    public generate(count: number = 1) {
        const participants = [];
        for (let i = 0; i < count; i++) {
            participants.push({
                name: `${this.getRandomElement(this.firstNames)}`,
                deposit: parseFloat((crypto.randomInt(1, 250) / 100).toFixed(8)), 
                walletAddress: this.generateWalletAddress(),
                amountAllocated: 0,
                isPaired: false,
                pairedWith: null,
                status: 'active'
            });
        }
        return participants;
    }
}
