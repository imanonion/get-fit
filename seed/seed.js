require('dotenv').config();
const mongoose =  require('mongoose');
const _ = require('lodash');
const { ClassModel } = require('../models/classes');
const moment = require('moment');

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

//data 
let data = [
    {"orgName":"Isak Athow","email":"iathow0@deliciousdays.com","contact":"5565948541","nameOfClass":"Swimming for adults","genreOfExercise":"Cycling","noOfSessions":1,"capacity":10,"price":20,"startDate":"2020-12-02","startTime":"5:35 PM","endTime":"19:35:34","mode":"Online","location":"Comanche","minAge":"null","maxAge":null,"gender":"Female","details":"parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit","typeOfExercise":"Balance","image":"http://dummyimage.com/50x50.png/cc0000/ffffff"},
    {"orgName":"Abrahan Fairham","email":"afairham1@google.com.hk","contact":"2654461674","nameOfClass":"Bollywood for good","genreOfExercise":"Swimming","noOfSessions":10,"capacity":20,"price":10,"startDate":"2021-07-15","startTime":"9:09 AM","endTime":"11:09:34","mode":"Physical","location":"Farwell","minAge":"null","maxAge":null,"gender":"Female","details":"suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur","typeOfExercise":"Strength","image":"http://dummyimage.com/50x50.png/ff4444/ffffff"},
    {"orgName":"Joy Laraway","email":"jlaraway2@cloudflare.com","contact":"8088264475","nameOfClass":"Swimming for adults","genreOfExercise":"Brisk-walking","noOfSessions":1,"capacity":10,"price":20,"startDate":"2021-01-07","startTime":"4:46 PM","endTime":"17:46:37","mode":"Online","location":"Katie","minAge":"null","maxAge":null,"gender":"Female","details":"congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti","typeOfExercise":"Flexibility","image":"http://dummyimage.com/50x50.png/cc0000/ffffff"},
    {"orgName":"Raphaela Hele","email":"rhele3@state.tx.us","contact":"7622571631","nameOfClass":"Yoga in the Park","genreOfExercise":"Taekwondo","noOfSessions":15,"capacity":20,"price":45,"startDate":"2021-04-27","startTime":"4:51 AM","endTime":"05:51:13","mode":"Online","location":"Pierstorff","minAge":"18","maxAge":null,"gender":"Male","details":"cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis","typeOfExercise":"Balance","image":"http://dummyimage.com/50x50.png/5fa2dd/ffffff"},
    {"orgName":"Elisha Mitchener","email":"emitchener4@g.co","contact":"3874124565","nameOfClass":"HIIT with Me","genreOfExercise":"Wushu","noOfSessions":12,"capacity":20,"price":40,"startDate":"2021-03-29","startTime":"3:19 AM","endTime":"05:19:29","mode":"Online","location":"Gerald","minAge":"null","maxAge":null,"gender":"Male","details":"turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec","typeOfExercise":"Endurance","image":"http://dummyimage.com/50x50.png/ff4444/ffffff"},
    {"orgName":"Georgette Bladder","email":"gbladder5@cmu.edu","contact":"7876192877","nameOfClass":"Bollywood for good","genreOfExercise":"Golf","noOfSessions":10,"capacity":30,"price":40,"startDate":"2021-07-31","startTime":"2:43 AM","endTime":"04:43:42","mode":"Online","location":"Crest Line","minAge":"null","maxAge":null,"gender":"Female","details":"malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien","typeOfExercise":"Balance","image":"http://dummyimage.com/50x50.png/ff4444/ffffff"},
    {"orgName":"Gloria Koubu","email":"gkoubu6@mail.ru","contact":"7248633922","nameOfClass":"Bobsledding only for Bobs","genreOfExercise":"KpopXfitness","noOfSessions":15,"capacity":30,"price":30,"startDate":"2020-07-11","startTime":"12:53 PM","endTime":"14:53:00","mode":"Physical","location":"Delaware","minAge":"18","maxAge":null,"gender":"Male","details":"porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam","typeOfExercise":"Endurance","image":"http://dummyimage.com/50x50.png/ff4444/ffffff"},
    {"orgName":"Petra Ginner","email":"pginner7@imdb.com","contact":"7211740661","nameOfClass":"Yoga in the Park","genreOfExercise":"Brisk-walking","noOfSessions":10,"capacity":10,"price":20,"startDate":"2021-06-12","startTime":"9:51 PM","endTime":"23:51:04","mode":"Online","location":"Schurz","minAge":"7","maxAge":null,"gender":"Female","details":"vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus","typeOfExercise":"Endurance","image":"http://dummyimage.com/50x50.png/5fa2dd/ffffff"},
    {"orgName":"Paddy Polycote","email":"ppolycote8@kickstarter.com","contact":"4213274524","nameOfClass":"KpopXFitness finesse","genreOfExercise":"Taekwondo","noOfSessions":1,"capacity":20,"price":35,"startDate":"2021-06-08","startTime":"5:17 AM","endTime":"07:17:24","mode":"Physical","location":"Sunfield","minAge":"18","maxAge":null,"gender":"All","details":"nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec","typeOfExercise":"Strength","image":"http://dummyimage.com/50x50.png/ff4444/ffffff"},
    {"orgName":"Hermione Langforth","email":"hlangforth9@comsenz.com","contact":"4292321566","nameOfClass":"Swimming for adults","genreOfExercise":"Taekwondo","noOfSessions":12,"capacity":10,"price":30,"startDate":"2021-11-02","startTime":"7:13 AM","endTime":"09:13:06","mode":"Online","location":"Del Sol","minAge":"16","maxAge":null,"gender":"All","details":"at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat","typeOfExercise":"Endurance","image":"http://dummyimage.com/50x50.png/5fa2dd/ffffff"}
]


//create slugs from nameOfClass

data = data.map(item => {
    item.slug = _.kebabCase(item.nameOfClass)
    return item
})

console.log(data)

// moment().format();

let connection = null;

//connect to mongodb via mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(connResp => {
        connection = connResp
        return ClassModel.insertMany(data)
    })
    .then(insertResp => {
        console.log('successful data insertion')
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        if (connection !== null) {
            connection.disconnect()
        }
    })