import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/settings';
const app = express();

const port = process.env.PORT || config.server.port;

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true}));

const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors());

mongoose.connect(config.mongodb.uri,
    {   autoReconnect:true,
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: 300000,
        keepAliveInitialDelay : 300000,
        connectTimeoutMS: 30000,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);
const connection = mongoose.connection;

connection.once('open',
    () => {
        console.log('MongoDB database connection established successfully!');
    },
    () => {
        console.log('MongoDB database connection failed!');
    });

app.listen(port, () =>
    console.log(`Server limitless is listening on port ${port}`));
