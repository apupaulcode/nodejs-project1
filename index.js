// external imports 

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const loginRouter = require('./router/loginRouter');
const inboxRouter = require('./router/inboxRouter');
const usersRouter = require('./router/usersRouter');

// internal imports 
const {notFoundHandler,errorHandler} = require('./middleware/common/errorHandler')



const app = express();
dotenv.config();


mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(()=> console.log('Database connection succesfull')).catch(err => console.log(err))


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('view engine','ejs')


app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);




// 404 not found handler 
app.use(notFoundHandler);

// common error handler 
app.use(errorHandler);




app.listen(process.env.PORT, ()=>{
    console.log(`App is listening to port ${process.env.PORT} `)
})