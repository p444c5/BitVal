import { Request, Response } from 'express';
import { default as ParticipantDB } from '../models/Participants';
import { IParticipant, Pairing } from '../types';

class ExchangeController {

   /**
    * pairs uploaded participants from DB
    */
    public pairParticipants = async (req: Request, res: Response): Promise<void> => {
        try {
            // Fetch unmatched participants from DB
            const participants = await ParticipantDB.find({ isPaired: false });

            if (participants.length < 2) {
                res.status(400).json({ message: "Not enough participants to pair." });
                return; 
            }

            const shuffled = this.shuffleArray(participants);
            const pairings: Pairing[] = [];

            // Pair logic
            for (let i = 0; i < shuffled.length; i += 2) {
                if (i + 1 < shuffled.length) {
                    const p1 = shuffled[i];
                    const p2 = shuffled[i + 1];

                    // Creates Pairing Object for response
                    const pairing = new Pairing(p1, p2);
                    pairings.push(pairing);

                    // Update the  DB: Bidirectional Relationship
                    p1.pairedWith = p2._id as any;
                    p1.isPaired = true;
                    
                    p2.pairedWith = p1._id as any;
                    p2.isPaired = true;

                    await p1.save();
                    await p2.save();
                }
            }

            res.status(200).json({ 
                success: true, 
                message: "Participants paired successfully", 
                pairings 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error generating pairs", error });
        }
    }

    /** 
     * Distributes gifts among paired participants
    */
    public distributeGifts = async (req: Request, res: Response): Promise<void> => {
        try {
            
            const pairedParticipants : IParticipant[] = await ParticipantDB.find({ isPaired: true }).populate('pairedWith');

            // Logic to simulate distribution (Simplified for now)
            
            const results  = pairedParticipants.map(p => {
                const partner = p.pairedWith as unknown as IParticipant;
                return `User ${p.name} should give ${p.amountAllocated} to ${partner.name}`;
            });

            // Filters out duplicates in the response if needed, or just send list
            res.status(200).json({ 
                success: true, 
                distributionPlan: results 
            });

        } catch (error) {
            res.status(500).json({ message: "Error distributing gifts", error });
        }
    }

    /**
    * Utility function to shuffle an array
    */
    private shuffleArray = (array: IParticipant[]): IParticipant[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export default ExchangeController;