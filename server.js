const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ENV = require('./ENV.js');
const { isAuthenticated } = require('./middlewares/permissions')

const app = express();

// MONGOOSE CONNECT
mongoose.connect(ENV.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to Mongoose'))
    .catch(err => console.log(err));

// const db = mongoose.connection;
// db.once('open', () => { console.log('Connected to DB') })
// ********************

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ********************

// ROUTES
const auth = require('./routes/auth.js');
const projects = require('./routes/projects');
const candidates = require('./routes/candidates');
app.use('/api/auth', auth)
app.use('/api/projects', isAuthenticated, projects)
app.use('/api/candidates', isAuthenticated, candidates)
// ********************

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('listening on PORT ' + PORT))