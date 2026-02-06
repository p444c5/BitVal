import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Admin from '../../models/Admin';
import Participant from '../../models/Participant';
import { ParticipantFactory } from '../factories/ParticipantFactory';
import { connectToDatabase } from '../database';

dotenv.config();


const seedDB = async () => {
    try {
        await connectToDatabase();


        await Participant.deleteMany({});
        console.log('Participants collection cleared.');

        const existingAdmin = await Admin.findOne({ username: "adminUser" });

        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash("password123", salt);

            const admin = new Admin({
                username: "adminUser",
                password: passwordHash
            });
            await admin.save();
            console.log('Default Admin created: [Username: adminUser, Password: password123]');
        } else {
            console.log('Default Admin (adminUser) already exists. Skipping creation.');
        }

        /* --- Participant Seeding using Factory --- */
        const args = process.argv.slice(2);
        const countArg = args.find(arg => arg.startsWith('--count='));
        const count = countArg ? parseInt(countArg.split('=')[1]) : 20;

        console.log(` Generating ${count} random participants...`);
        
        const factory = new ParticipantFactory();
        const participantsData = factory.generate(count);

        await Participant.insertMany(participantsData);
        
        console.log(` ${participantsData.length} Participants added successfully.`);
        console.log('Seeding complete!');
        process.exit(0);

    } catch (err) {
        console.error('Seeder error:', err);
        process.exit(1);
    }
};

seedDB();