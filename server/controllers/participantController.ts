import { Request, Response } from 'express';
import { default as ParticipantDB } from '../models/Participants';
import fs from 'fs';
import csv from 'csv-parser';
import type {IParticipant, CsvRow} from '../types';

class ParticipantController {
    
    /**
     * Gets all participants from the database
     */

    public getAllParticipants = async (req: Request, res: Response): Promise<void> => {
        try {
            const participants : IParticipant[] = await ParticipantDB.find();
            res.status(200).json({ success: true, participants });
        } catch (error) {
            res.status(500).json({ message: "Error fetching participants", error });
        }
    }

    /**
     *  Adds a single participant
     */
    public addParticipant = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, deposit, walletAddress, amountAllocated } = req.body;
            const newParticipant : IParticipant = new ParticipantDB({
                name,
                deposit,
                walletAddress,
                amountAllocated
            });
            const savedParticipant = await newParticipant.save();
            res.status(201).json({ success: true, participant: savedParticipant });
        } catch (error) {
            res.status(500).json({ message: "Error adding participant", error });
        }
    }

    /**
     * Bulk upload participants via spreadsheet file
     */
    public bulkUploadParticipants = async (req: Request, res: Response): Promise<void> => {
   
        const file  = req.file;

        if (!file) {
            res.status(400).json({ message: "Please upload a CSV file." });
            return;
        }

        if (!this.verifyMimeType(file)) {
           // Removes the invalid file so it doesn't clutter uploads folder
            fs.unlinkSync(file.path);
            res.status(400).json({ message: "Invalid format. Only CSV spreadsheet files are allowed." });
            return;
        }

        const results: CsvRow[] = [];

        try {
         
            fs.createReadStream(file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    try {
                        const participantsData : IParticipant[] = results.map(row => ({
                            name: row.name,
                            deposit: Number(row.deposit) || 0,
                            walletAddress: row.wallet || row.walletAddress || '', 
                            amountAllocated: Number(row.amountAllocated) || 0,
                            isPaired: false,
                            pairedWith: null

                        }));

                        if (participantsData.length === 0) {
                            res.status(400).json({ message: "File is empty" });
                            return;
                        }

                        const savedParticipants : IParticipant[]  = await ParticipantDB.insertMany(participantsData) as unknown as IParticipant[];
                        
                        fs.unlinkSync(file.path);

                        res.status(201).json({ 
                            success: true, 
                            count: savedParticipants.length, 
                            participants: savedParticipants 
                        });
                    } catch (dbError) {
                        res.status(500).json({ message: "Error saving to DB.", error: dbError });
                    }
                });
        } catch (error) {
            res.status(500).json({ message: "Error processing file", error });
        }
    }

   public updateParticipant = async (req: Request, res: Response): Promise<void> => {
        try {
            const participantId = req.params.id;
            const updateData = req.body;
            const updatedParticipant = await ParticipantDB.findByIdAndUpdate(participantId, updateData, { new: true });
            if (!updatedParticipant) {
                res.status(404).json({ message: "Participant not found" });
                return;
            }
            res.status(200).json({ success: true, participant: updatedParticipant });
        } catch (error) {
            res.status(500).json({ message: "Error updating participant", error });
        }
    }

    public deleteParticipant = async (req: Request, res: Response): Promise<void> => {
        try {
            const participantId = req.params.id;
            const deletedParticipant = await ParticipantDB.findByIdAndDelete(participantId);
            if (!deletedParticipant) {
                res.status(404).json({ message: "Participant not found" });
                return;
            }
            res.status(200).json({ success: true, participant: deletedParticipant });
        } catch (error) {
            res.status(500).json({ message: "Error deleting participant", error });
        }
    }

    /**'
     * Verifies if uploaded file is of allowed MIME type
    */
      private verifyMimeType = (file: Express.Multer.File): boolean => {
        const allowedMimeTypes = [
            'text/csv', 
            'application/vnd.ms-excel', 
            'application/csv', 
            'text/x-csv'
        ];

        return allowedMimeTypes.includes(file.mimetype);
    }
}

export default ParticipantController;