require('dotenv').config();
const mongoose =  require('mongoose');
const _ = require('lodash');
const { ClassModel } = require('../models/classes');
const moment = require('moment');

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

//data 
let data = [
    {"activityName":"KpopXfitness","organiser":"Jefferson Godar","startDate":"2021-02-19","startTime":"13:17:24","endTime":"14:17:24","mode":"Online","location":"Monica","capacity":10,"price":10,"typeOfExercise":"Swimming","numberOfSessions":15,"leastAge":"18","mostAge":null,"phoneNumber":"1487860751","email":"jgodar0@washington.edu","image":"http://dummyimage.com/184x100.png/cc0000/ffffff","details":"ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin"},
    {"activityName":"HIIT","organiser":"Sebastian Torrans","startDate":"2020-07-26","startTime":"4:56:11","endTime":"05:56:11","mode":"Online","location":"Portage","capacity":10,"price":20,"typeOfExercise":"HIIT","numberOfSessions":12,"leastAge":"7","mostAge":null,"phoneNumber":"6412135950","email":"storrans1@cafepress.com","image":"http://dummyimage.com/167x100.png/5fa2dd/ffffff","details":"elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in"},
    {"activityName":"Fencing","organiser":"Dehlia O'Connel","startDate":"2020-08-31","startTime":"4:10:45","endTime":"05:10:45","mode":"Physical","location":"Basil","capacity":10,"price":25,"typeOfExercise":"Salsa","numberOfSessions":10,"leastAge":"12","mostAge":null,"phoneNumber":"7441969623","email":"doconnel2@feedburner.com","image":"http://dummyimage.com/197x100.png/cc0000/ffffff","details":"duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim"},
    {"activityName":"Pilates","organiser":"Bing Waterson","startDate":"2020-09-16","startTime":"10:55:29","endTime":"12:55:29","mode":"Physical","location":"Summer Ridge","capacity":30,"price":30,"typeOfExercise":"Brisk-walking","numberOfSessions":10,"leastAge":"null","mostAge":null,"phoneNumber":"1813018024","email":"bwaterson3@blogtalkradio.com","image":"http://dummyimage.com/231x100.png/dddddd/000000","details":"dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel"},
    {"activityName":"Stretching","organiser":"Sherie Brewins","startDate":"2021-04-05","startTime":"3:28:04","endTime":"04:28:04","mode":"Online","location":"Carey","capacity":30,"price":10,"typeOfExercise":"Swimming","numberOfSessions":12,"leastAge":"18","mostAge":null,"phoneNumber":"2407062322","email":"sbrewins4@shinystat.com","image":"http://dummyimage.com/219x100.png/dddddd/000000","details":"pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis"},
    {"activityName":"KpopXfitness","organiser":"Claudina Lideard","startDate":"2020-11-11","startTime":"20:42:28","endTime":"22:42:28","mode":"Online","location":"Morrow","capacity":20,"price":10,"typeOfExercise":"Kickboxing","numberOfSessions":12,"leastAge":"21","mostAge":null,"phoneNumber":"3477699084","email":"clideard5@tinyurl.com","image":"http://dummyimage.com/129x100.png/5fa2dd/ffffff","details":"at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis"},
    {"activityName":"Fencing","organiser":"Rhys Lux","startDate":"2020-07-30","startTime":"12:35:48","endTime":"14:35:48","mode":"Online","location":"Haas","capacity":10,"price":25,"typeOfExercise":"Belly dance","numberOfSessions":12,"leastAge":"null","mostAge":null,"phoneNumber":"1662110221","email":"rlux6@dailymotion.com","image":"http://dummyimage.com/189x100.png/5fa2dd/ffffff","details":"aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero"},
    {"activityName":"Pilates","organiser":"Leonanie Bridle","startDate":"2020-11-16","startTime":"21:27:32","endTime":"23:27:32","mode":"Online","location":"Pennsylvania","capacity":20,"price":30,"typeOfExercise":"Pilates","numberOfSessions":10,"leastAge":"21","mostAge":null,"phoneNumber":"8887209171","email":"lbridle7@shinystat.com","image":"http://dummyimage.com/211x100.png/ff4444/ffffff","details":"curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam"},
    {"activityName":"Golf","organiser":"Phillipe Pedlar","startDate":"2020-12-14","startTime":"23:35:16","endTime":"01:35:16","mode":"Physical","location":"Hermina","capacity":20,"price":50,"typeOfExercise":"Wushu","numberOfSessions":15,"leastAge":"7","mostAge":null,"phoneNumber":"8429985230","email":"ppedlar8@goodreads.com","image":"http://dummyimage.com/193x100.png/ff4444/ffffff","details":"sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem"},
    {"activityName":"Fencing","organiser":"Bertrando Brookes","startDate":"2021-04-16","startTime":"1:44:58","endTime":"02:44:58","mode":"Physical","location":"Monterey","capacity":10,"price":30,"typeOfExercise":"Swimming","numberOfSessions":15,"leastAge":"21","mostAge":null,"phoneNumber":"3669243806","email":"bbrookes9@goo.ne.jp","image":"http://dummyimage.com/198x100.png/cc0000/ffffff","details":"pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus"}
]

//create slugs and differentiate same activityNames by adding their id

data = data.map(item => {
    item.slug = _.kebabCase(item.activityName)
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