import { MongoClient } from 'mongodb';
import config from './dbConfig.json' assert {type: 'json'};

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const dbName = 'CozyMae';
const collectionName = 'Floral';
const db = client.db('CozyMae');
const collection = db.collection('Floral');

export async function getCalendarAvailability(year, month) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const query = { year, month };
        const availability = await collection.findOne(query);

        if (!availability) {
            throw new Error('Availability data not found');
        }

        return availability;
    } catch (error) {
        console.error('Error in getCalendarAvailability: ', error);
        throw error;
    } finally {
        await client.close();
    }
}