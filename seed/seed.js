require('dotenv').config();
const mongoose =  require('mongoose');
const _ = require('lodash');
const { ClassModel } = require('../models/classes');
const moment = require('moment');

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

//data 
let data = [
    {"orgName":"Rickie Cahill","email":"rcahill0@desdev.cn","contact":"4225474533","nameOfClass":"HIIT with Me","genreOfExercise":"HIIT","noOfSessions":15,"capacity":20,"price":35,"startDateTime":"2021-09-03T05:30:08","endDateTime":"2021-09-03T06:30:08","mode":"Physical","location":"Clove","minAge":"18","maxAge":null,"gender":"All","details":"luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et","typeOfExercise":"Balance","image":"http://dummyimage.com/100x100.png/cc0000/ffffff"},
    {"orgName":"Niels Vaines","email":"nvaines1@stanford.edu","contact":"5269699397","nameOfClass":"Yoga in the Park","genreOfExercise":"Yoga","noOfSessions":15,"capacity":10,"price":35,"startDateTime":"2021-12-02T01:55:29","endDateTime":"2021-12-02T02:55:29","mode":"Online","location":"Delladonna","minAge":"18","maxAge":null,"gender":"All","details":"mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla","typeOfExercise":"Endurance","image":"http://dummyimage.com/100x100.png/cc0000/ffffff"},
    {"orgName":"Paxton Lince","email":"plince2@phoca.cz","contact":"6158341886","nameOfClass":"Swimming for kids","genreOfExercise":"Swimming","noOfSessions":1,"capacity":20,"price":0,"startDateTime":"2021-11-30T14:58:18","endDateTime":"2021-11-30T15:58:18","mode":"Online","location":"Corscot","minAge":"null","maxAge":null,"gender":"Female","details":"condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac","typeOfExercise":"Strength","image":"http://dummyimage.com/100x100.png/cc0000/ffffff"},
    {"orgName":"Anita Trehearn","email":"atrehearn3@usnews.com","contact":"6721687263","nameOfClass":"Swimming for adults","genreOfExercise":"Swimming","noOfSessions":15,"capacity":20,"price":25,"startDateTime":"2021-10-22T12:18:47","endDateTime":"2021-10-22T13:18:47","mode":"Physical","location":"Raven","minAge":"12","maxAge":null,"gender":"All","details":"felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis","typeOfExercise":"Flexibility","image":"http://dummyimage.com/100x100.png/ff4444/ffffff"},
    {"orgName":"Winthrop Sperry","email":"wsperry4@infoseek.co.jp","contact":"6974273206","nameOfClass":"Basketball for all","genreOfExercise":"Basketball","noOfSessions":10,"capacity":30,"price":10,"startDateTime":"2021-07-30T17:52:37","endDateTime":"2021-07-30T18:52:37","mode":"Online","location":"Vermont","minAge":"7","maxAge":null,"gender":"All","details":"pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus","typeOfExercise":"Balance","image":"http://dummyimage.com/100x100.png/dddddd/000000"},
    {"orgName":"Maxy Sowersby","email":"msowersby5@barnesandnoble.com","contact":"2821340481","nameOfClass":"Tennis for mommies","genreOfExercise":"Tennis","noOfSessions":12,"capacity":20,"price":15,"startDateTime":"2021-09-28T11:44:05","endDateTime":"2021-09-28T12:44:05","mode":"Online","location":"Knutson","minAge":"12","maxAge":null,"gender":"All","details":"duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus","typeOfExercise":"Balance","image":"http://dummyimage.com/100x100.png/cc0000/ffffff"},
    {"orgName":"Tudor Rapley","email":"trapley6@un.org","contact":"3835609998","nameOfClass":"KpopXFitness finesse","genreOfExercise":"KpopXFitness","noOfSessions":15,"capacity":10,"price":30,"startDateTime":"2021-08-13T16:46:59","endDateTime":"2021-08-13T17:46:59","mode":"Physical","location":"Victoria","minAge":"null","maxAge":null,"gender":"Female","details":"aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui","typeOfExercise":"Endurance","image":"http://dummyimage.com/100x100.png/cc0000/ffffff"},
    {"orgName":"Hube Pashba","email":"hpashba7@wikimedia.org","contact":"4203929981","nameOfClass":"Bollywood for good","genreOfExercise":"Bollywood dance","noOfSessions":15,"capacity":30,"price":25,"startDateTime":"2021-10-13T02:28:51","endDateTime":"2021-10-13T03:28:51","mode":"Online","location":"Dennis","minAge":"12","maxAge":null,"gender":"Male","details":"mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus","typeOfExercise":"Flexibility","image":"http://dummyimage.com/100x100.png/ff4444/ffffff"},
    {"orgName":"Laurene Lesurf","email":"llesurf8@photobucket.com","contact":"1311333414","nameOfClass":"Bobsledding only for Bobs","genreOfExercise":"Bobsled","noOfSessions":12,"capacity":30,"price":10,"startDateTime":"2021-08-05T22:07:48","endDateTime":"2021-08-05T23:07:48","mode":"Online","location":"International","minAge":"18","maxAge":null,"gender":"Male","details":"lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est","typeOfExercise":"Strength","image":"http://dummyimage.com/100x100.png/5fa2dd/ffffff"},
    {"orgName":"Patience Manville","email":"pmanville9@edublogs.org","contact":"5199009042","nameOfClass":"Kickbox for Hogs","genreOfExercise":"Kickbox","noOfSessions":1,"capacity":30,"price":0,"startDateTime":"2021-09-08T12:27:09","endDateTime":"2021-09-08T13:27:09","mode":"Online","location":"Artisan","minAge":"12","maxAge":null,"gender":"All","details":"fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor","typeOfExercise":"Endurance","image":"http://dummyimage.com/100x100.png/ff4444/ffffff"}
]

//create slugs from nameOfClass

data = data.map(item => {
    item.slug = _.kebabCase(item.nameOfClass)
    item.startDay = moment(item.startDateTime).format('ddd')
    item.endDay = moment(item.endDateTime).format('ddd')
    
    return item
})

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