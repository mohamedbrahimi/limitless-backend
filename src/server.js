import express from 'express';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3650;

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true}));

const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors());


app.listen(port, () =>
    console.log(`Server limitless is listening on port ${port}`));
