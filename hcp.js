const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));  // map to public folder for static assets

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/payment'));

app.post('/call-back', (req, res) => {
    console.log('Callback received:', req.body);
    // Process the callback data as needed
    res.status(200).send('Callback received');
});

app.post('/health-check', (req, res) => {
    console.log('Health check received:', req.body);
    // Process the health check data as needed
    res.status(200).send('Health check received');
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});