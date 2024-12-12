import express from 'express';
import  cors from 'cors';
import bcrypt from 'bcrypt';
//Import db methods.
import  { getCalendarAvailability, updateCalendarAvailability, getAppointments, postLogin, registerUser, logout } from './db.js';

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


//Login stuff

apiRouter.post('/auth/login', async (req, res) => {
    const {email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.'})
    }
    console.log("HERE");
    try {
        const userToken = await postLogin(email, password);
        res.json(userToken);
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
      }

});

apiRouter.post('/auth/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Basic validation
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Call the registerUser function to save the user
        const newUser = await registerUser(email, hashedPassword);

        res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error during registration:', error);

        // Handle duplicate email error or any other errors
        if (error.message === 'Email already in use') {
            return res.status(409).json({ error: 'Email already in use' });
        }

        res.status(500).json({ error: 'Server error' });
    }
});


apiRouter.post('/auth/logout', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required for logout' });
    }

    try {
        const result = await logout(token);
        res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);

        // Handle cases where the token might not exist
        if (error.message === 'Auth token not found or already logged out') {
            return res.status(404).json({ error: 'Invalid or expired token' });
        }

        res.status(500).json({ error: 'Server error during logout' });
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})