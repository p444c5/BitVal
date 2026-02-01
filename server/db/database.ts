import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () : Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/valentine_gift_exchange';
        
        await mongoose.connect(mongoURI);
        
        console.log('Connection to MongoDB has been established successfully.');
    } catch (error) {
        throw new Error(`Unable to connect to MongoDB: ${error}`);
       
    }
};

export { connectToDatabase };

// const database = new Sequelize('valentine_gift_exchange', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql'
// });

// const connectDatabase = async () => {
//     try {
//         await database.authenticate();
//         console.log('Connection to the database has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };

// export { database, connectDatabase };