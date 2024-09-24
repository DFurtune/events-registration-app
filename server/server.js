const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Event = require('./models/Event');
const Registration = require('./models/Registration');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

app.post('/api/events', async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
});

app.post('/api/register', async (req, res) => {
    const registration = new Registration(req.body);
    await registration.save();
    res.json(registration);
});

app.get('/api/registrations/:eventId', async (req, res) => {
    const registrations = await Registration.find({ eventId: req.params.eventId });
    res.json(registrations);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
