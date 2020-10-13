import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import morgan from 'morgan'
import mongoose from 'mongoose'

import router from './router.js'

const app = express();

// Connect to DB with auth
// mongoose.connect('mongodb+srv://admin:admin@cluster0.gio0q.mongodb.net/latihan?retryWrites=true&w=majority',
//     {useNewUrlParser: true, useUnifiedTopology: true,}
// ).then(() => {
//     console.log('Connect to DB success')
// }).catch(err => {
//     console.log('Connect to failed ' + err)
// })

//connect to db
mongoose.connect(process.env.MONGODB_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => {
    console.log('Connect to DB success');
})

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.get('/', (req, res)=> {
    res.json({
        message: 'success',
    })
})

app.use('/api', router); //http://localhostL3000/api/homeworks

const PORT = process.env.port || '4000';

app.listen(PORT, () => {
    console.log(`App listens to port ${PORT}`)
})