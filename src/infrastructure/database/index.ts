import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../../..', '.env');

dotenv.config({ path: envPath });

const sequelize = new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || "",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "",
        dialect: 'mysql',
    }
);

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};


export default sequelize;
