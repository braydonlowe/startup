import express from 'express';
import  cors from 'cors';
//Import db methods.
import  { getCalendarAvailability, updateCalendarAvailability, getAppointments } from '../db/db.js';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


var apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.get('/calendar/availability', async (req, res) => {
    const { month, year } = req.query;
    try {
        const availability = await getCalendarAvailability(year, month);
        res.json(availability);
    } catch (error) {
        console.error('Error fetching calendar availability:', error);
        res.status(500).json({ error: 'Failed to fetch availability' });
    }
});

apiRouter.post('/calendar/availability', async (req, res) => {
    console.log('Recieved data:', req.body)
    const { who, year, month, day, isAvailable } = req.body;

    try {
        const updateResult = await updateCalendarAvailability(who, year, month, day, isAvailable);
        res.json({ success: true, updatedDay: { day, isAvailable } });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ error: 'Failed to update availability' });
    }
})

apiRouter.get('/appointments', async (req, res) => {
    const { who } = req.query;

    if (!who) {
        return res.status(400).json({ error: 'The "who" parameter is required'});
    }

    try {
        const appointments = await getAppointments(who);
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})