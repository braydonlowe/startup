const express = require('express');
//Import db methods.
const { getCalendarAvailability } = require('./db/db');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


var apiRouter = express.Router();
app.use(`\api`, apiRouter);


apiRouter.get('/api/calendar/availibility', async (req, res) => {
    const { month, year } = req.query;
    try {
        const availability = await getCalendarAvailability(year, month);
        res.json(availability);
    } catch (error) {
        console.error('Error fetching calendar availability:', error);
        res.status(500).json({ error: 'Failed to fetch availability' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})