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
        const availability = await calendarEntity.findOne(query);

        if (!availability) {
            return { days: {} };
        }

        return availability;
    } catch (error) {
        console.error('Error in getCalendarAvailability: ', error);
        throw error;
    }
}


export async function getAppointments(who) {
    try {
        const client = await connectToDB();
        const database = client.db(dbName);
        const calendarEntity = database.collection("Calendar");

        // Use $objectToArray to transform the days object into an array for querying.
        const query = {
            $expr: {
                $gt: [
                    {
                        $size: {
                            $filter: {
                                input: { $objectToArray: "$days" }, // Convert days object to an array.
                                as: "day",
                                cond: { $eq: ["$$day.v.updatedBy", who] }, // Match updatedBy with the specified user.
                            },
                        },
                    },
                    0,
                ],
            },
        };

        // Projection to include only necessary fields.
        const projection = {
            _id: 1,
            year: 1,
            month: 1,
            days: 1,
        };

        console.log("Querying appointments with:", query);

        const appointments = await calendarEntity.find(query, { projection }).toArray();

        if (appointments.length === 0) {
            console.log(`No appointments found for user: ${who}`);
            return { message: `No appointments found for user: ${who}` };
        }

        console.log("Appointments fetched:", appointments);
        return { appointments };
    } catch (error) {
        console.error("Error in getAppointments: ", error);
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

        if (isAvailable) {
            const result = await calendarEntity.updateOne(
                query,
                { $unset: { [`days.${day}`]: "" } } // Remove the unavailable day
            );
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



