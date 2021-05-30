if (process.env.PROJ_ENV === 'development') { require('dotenv').config(); }

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const { connect_to_db } = require('./lib/mongo');
const { api_router } = require('./api/v1');

const app = express();
app.use(express.json());
if (process.env.PROJ_ENV === 'development') { app.use(morgan('dev')); }
app.use(cors());
app.use('/api/v1', api_router);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
connect_to_db(() => {
    app.listen(port, () => {
        console.log(`API server running at http://localhost:${port}`);
    });
});
