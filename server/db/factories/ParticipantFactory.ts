import crypto from "crypto";
import { IParticipant } from "../../types";

export class ParticipantFactory {
  private username: string[] = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
    "Mallory",
    "Niaj",
    "Oscar",
    "Peggy",
    "Sybil",
    "Trent",
    "Walter",
  ]; // i will be  using  a dictionary  with real forum usernames later

  private getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(crypto.randomInt(0, arr.length))];
  }

  private generateWalletAddress(): string {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let address = "bc1q";
    for (let i = 0; i < 38; i++) {
      address += chars.charAt(crypto.randomInt(0, chars.length));
    }
    return address;
  }

  public generate(count: number = 1): IParticipant[] {
    const participants: IParticipant[] = [];

    for (let i = 0; i < count; i++) {
      const suffix: string = crypto.randomBytes(2).toString("hex"); // this acts as siuffix to prevent idetical name while testing pairs
      
      participants.push({
        name: `${this.getRandomElement(this.username)}_${suffix}`,
        deposit: parseFloat((crypto.randomInt(1, 250) / 100).toFixed(8)),
        walletAddress: this.generateWalletAddress(),
        amountAllocated: 0,
        isPaired: false,
        pairedWith: null,
        status: "active",
      });
    }
    return participants;
  }
}
