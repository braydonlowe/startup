import { MongoClient } from 'mongodb';
import config from './dbConfig.json' assert {type: 'json'};

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
//const client = new MongoClient(url);
const dbName = 'CozyMaeFloral';

let db;


export async function connectToDB() {
    if (!db) {
        try {
            db = new MongoClient(url, {
                tls: true,
                serverSelectionTimeoutMS: 3000,
                autoSelectFamily: false,
            });
            await db.connect();
            console.log('Mongo connected');

            db.on('error', (error) => {
                console.error('Mongo error: ', error);
                db = null;
            });
        } catch (error) {
            throw error;
        }
    }
    return db;
}

export async function getCalendarAvailability(year, month) {
    try {
        const client = await connectToDB();
        const database = client.db(dbName);
        const calendarEntity = database.collection("Calendar");

        const query = { year, month };
        console.log(query);
        const availability = await calendarEntity.findOne(query);
        console.log(availability);

        if (!availability) {
            return { days: {} };
        }

        return availability;
    } catch (error) {
        console.error('Error in getCalendarAvailability: ', error);
        throw error;
    }
}


export async function updateCalendarAvailability(who, year2, month2, day, isAvailable) {
    try {
        const client = await connectToDB();
        const database = client.db(dbName);
        const calendarEntity = database.collection("Calendar");

        const yearString = year2.toString();
        const monthString = month2.toString();

        const year = yearString;
        const month = monthString;

        const query = { year, month };
        console.log(query);

        let update;

        if (isAvailable) {
            const result = await calendarEntity.updateOne(
                query,
                { $unset: { [`days.${day}`]: "" } } // Remove the unavailable day
            );

            if (result.modifiedCount === 0) {
                throw new Error('Failed to mark the day as available');
            }
            console.log("SUCCESS!")

            return { success: true, day, isAvailable };
        } else {
            // If marking the day as unavailable, insert it into the database
            const update = {
                $set: {
                    [`days.${day}`]: {
                        isAvailable: false,
                        updatedBy: who,
                        updatedAt: new Date(),
                    },
                },
            };

            const result = await calendarEntity.updateOne(query, update, { upsert: true });

            if (result.modifiedCount === 0) {
                throw new Error('Failed to mark the day as unavailable');
            }

            return { success: true, day, isAvailable };
        }
    } catch (error) {
        console.error('Error in updateCalendarAvailability: ', error);
        throw error;
    }
}



