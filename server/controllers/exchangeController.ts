import { Request, Response } from 'express';
import { default as ParticipantDB } from '../models/Participant';
import { default as DistributionPlanDB } from '../models/DistributionPlan';
import { IParticipant, Pairing } from '../types';
import { AnyBulkWriteOperation } from 'mongoose';
import crypto from 'crypto';
import axios from 'axios';

class ExchangeController {
    /**
     * pairs uploaded participants from DB
     */
  public pairParticipants = async (req: Request, res: Response): Promise<void> => {
        try {
        

            const participants = await ParticipantDB.find({ isPaired: false }) as unknown as IParticipant[];

            if (participants.length < 2) {
                res.status(400).json({ message: "Not enough participants to pair " });
                return; 
            }

            const shuffled = this.shuffleArray(participants);
            
            const bulkOps : AnyBulkWriteOperation<IParticipant>[] = [];
            
            const pairingsDisplay:Pairing[] = [];

            for (let i = 0; i < shuffled.length; i++) {
                const giver = shuffled[i];
                const receiver = shuffled[(i + 1) % shuffled.length];

                pairingsDisplay.push({
                    giver: giver.name,
                    receiver: receiver.name
                });

                bulkOps.push({
                    updateOne: {
                        filter: { _id: giver._id },
                        update: { 
                            $set: { 
                                pairedWith: receiver._id,
                                isPaired: true,
                                status: 'matched' 
                            } 
                        }
                    }
                });
            }

            // Execute all DB changes efficiently
            await ParticipantDB.bulkWrite(bulkOps);

            res.status(200).json({ 
                success: true, 
                message: "Participants paired successfully (Circular Chain)", 
                count: shuffled.length,
                pairings: pairingsDisplay 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error generating pairs", error });
        }
    }


    /** 
     * Distributes the TOTAL Pool Balance randomly among participants.
     * Fails if anyone is unpaired.
    */
    public allocateGifts = async (req: Request, res: Response): Promise<void> => {
        try {
            //Verify all participants are paired
            const unpairedCount = await ParticipantDB.countDocuments({ isPaired: false });
            if (unpairedCount > 0) {
                 res.status(400).json({ 
                    success: false, 
                    message: "Process Failed: Not all participants are paired yet." 
                });
                return;
            }

            //Fetch all participants to distribute to
            const participants = await ParticipantDB.find({}).populate('pairedWith');
            
            if (participants.length === 0) {
                 res.status(400).json({ message: "No participants found." });
                 return;
            }

            // FETCH  BTC BALANCE FROM MEMPOOL.SPACE
            let currentPoolValueBTC = 0;
            const POOL_ADDRESS = "bc1qetobeaddedlol"; 

            try {
                // Returns value in Satoshis. We convert to BTC.
                const balanceSats = await this.fetchPoolBalance(POOL_ADDRESS);
                currentPoolValueBTC = balanceSats / 100_000_000; 
                
                if (currentPoolValueBTC <= 0) {
                     res.status(400).json({ message: "Pool address has 0 BTC." });
                     return;
                }
            } catch (err) {
                console.error("Failed to fetch from Mempool API", err);
                res.status(500).json({ message: "Could not fetch pool balance from blockchain" });
                return;
            }

            console.log(`Distributing Total Pool: ${currentPoolValueBTC} BTC among ${participants.length} users`)
            /** 
             * === CONFIG===
             * VOLATILITY: Controls the gap between the "Richest" and "Poorest" allocation.
             */
            const VOLATILITY = 3; 

            // Generate a unique ID for this specific run of the algorithm
            const batchId = crypto.randomUUID(); 
            const executionTimestamp = new Date();

            /** Generate Random Weights for Each Participant */
           const weightedParticipants = participants.map(p => {
                const PRECISION = 100_000_000;
                const secureFloat = crypto.randomInt(0, PRECISION) / PRECISION;

                // Apply volatility curve using the secure float
                const randomWeight = Math.pow(secureFloat, VOLATILITY);
                
                return { participant: p, weight: randomWeight };
            });

            //Calculates Total Weight
            const totalWeight = weightedParticipants.reduce((sum, item) => sum + item.weight, 0);

            // Distribute Pool based on Weight Percentage
            const distributionPlan = [];
            
            // Track distributed amount to eliminate dusty leftovers
            let distributedSoFar = 0; 

            for (let i = 0; i < weightedParticipants.length; i++) {
                const item = weightedParticipants[i];
                const p = item.participant;
                let finalAmount = 0;

                // checks if its the last person in the list
                if (i === weightedParticipants.length - 1) {
                    // take EXACTLY what is left in the pool.
                    finalAmount = Number((currentPoolValueBTC - distributedSoFar).toFixed(8));
                } else {
                    const rawShare = (item.weight / totalWeight) * currentPoolValueBTC;
                    // Round to 8 decimals (Standard BTC precision)
                    finalAmount = Number(rawShare.toFixed(8));
                }

                // Clamp negative values (rare case if rounding goes weird)
                if (finalAmount < 0) finalAmount = 0;

                // Update Running Total
                distributedSoFar += finalAmount;

                p.amountAllocated = finalAmount;
                p.status = 'allocated';
                await p.save();

                const partner = p.pairedWith as unknown as IParticipant;

                // Create record object
                distributionPlan.push({
                    batchId: batchId,                                  
                    timestamp: executionTimestamp,                     
                    volatilitySetting: VOLATILITY,                     
                    giverName: p.name,                                 
                    receiverName: partner ? partner.name : "Unknown",
                    amount: p.amountAllocated,
                    giverAddress: p.walletAddress,
                    receiverAddress: partner ? partner.walletAddress : "Unknown"
                });
            }

            // --- SAVE EVIDENCE TO DB ---
            await DistributionPlanDB.insertMany(distributionPlan);

            console.log(`Pool: ${currentPoolValueBTC}, Distributed: ${distributedSoFar.toFixed(8)}`);
           
            res.status(200).json({ 
                success: true, 
                message: "Pool allocated randomly and evidence stored.",
                batchId: batchId, 
                timestamp: executionTimestamp,
                totalDistributed: distributedSoFar,
                distributionPlan 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error allocating gifts", error });
        }
    }

    /**
     * Helper to get address balance from Mempool.space API
     * 
     */
    private fetchPoolBalance = async (address: string): Promise<number> => {
        // Use 'mempool.space/testnet/api' if testing, 'mempool.space/api' for mainnet
        const url = `https://mempool.space/api/address/${address}`;
        const response = await axios.get(url);
    
        const funded = response.data.chain_stats.funded_txo_sum;
        const spent = response.data.chain_stats.spent_txo_sum;
        
        return funded - spent;
    }
    /**
    * Utility function to shuffle an array
    */
    private shuffleArray = (array: IParticipant[]): IParticipant[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = crypto.randomInt(0, i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export default ExchangeController;