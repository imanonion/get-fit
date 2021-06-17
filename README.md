# get-fit
## Project 2

 💪 Check it out here: https://getfit-sg.herokuapp.com/classes

#### Introduction
Get Fit is a platform that aims to consolidate and display all exercise classes in Singapore. 

This app was inspired by my dad, who swears by the free or super low-cost exercise sessions run by the govt. He has always had to go through multiple apps to find activities to join. Many times, he booked so many activities on different apps that he forgot where to find his booking.😕 

Some reference apps are: [ActiveSG](https://www.myactivesg.com "ActiveSG"), [Healthy365](https://www.activate.sg/healthy-365-app "Healthy365"), [pa.gov.sg](https://www.pa.gov.sg "PA")

At the time of writing this, there is currently no API to link to government data on community exercise classes. 😔 Hence, mock data was created using Mockaroo. Hopefully, there'll be an API in future. 

#### Technologies used
- Node.js
- Mongoose
- Mongodb
    - Mongo Atlas
    - Mongodb Compass
- Express.js
- EJS
- Bootstrap
- Mockaroo
- Git/GitHub
- Postman
- Heroku

#### Routes
/classes = homepage,  
/classes/search/?day='Day' = search results,  
/users/login = login page,  
/users/register = register page,  
/classes/:slug/:id = show one class's details,  
/classes/:slug/:id/edit = edit one class's details,  
/classes/:slug/:id (delete) = delete a class, and delete from booking db too,  
/users/dashboard = show user's dashboard

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

#### Lessons Learned
- Wireframing at the beginning is a good start. Try to draw out all routes as much as possible. 
- Styling of the pages can be done at the end..get the functionalities right first.
- 


#### Unsolved problems
1. Get datetime to display automatically in Edit form


#### Future Enhancements
1. Search filter with multiple queries in Index/Home page
2. Addition of image from user's local storage
3. Add google location map to suggest "classes near you"
4. Split Booked section in Dashboard into 2 --> Upcoming classes & Completed classes