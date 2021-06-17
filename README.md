# get-fit
Project 2

Check it out here: https://getfit-sg.herokuapp.com/classes

Get Fit is a platform that aims to consolidate and display all exercise classes in Singapore. 

This app was inspired by my dad, who swears by the free or super low-cost exercise sessions run by the govt. He has always had to go through multiple apps to find activities to join. Many times, he booked so many activities on different apps that he forgot where to find his booking.

Some reference apps are: ActiveSG, Healthy365, pa.gov.sg

At the time of writing this, there is currently no API to link to government data on community exercise classes. Hence, mock data was created using Mockaroo. Hopefully there'll be an API in future. 

Technologies used:
Node.js,
Mongoose, 
Express,
EJS, 
Bootstrap,
MomentJS,
Mockaroo,
Heroku

Pages:
/classes = homepage,
/classes/search/?day='Day' = search results,
/users/login = login page,
/users/register = register page,
/classes/:slug/:id = show one class's details,
/classes/:slug/:id/edit = edit one class's details,
/classes/:slug/:id (delete) = delete a class, and delete from booking db too,
/users/dashboard = show user's dashboard





Routes:




Unsolved problems:
1. Search filter with multiple queries in Index/Home page
2. Addition of image from user's local storage
3. Get datetime to display automatically in Edit form
4. Add google location map to suggest "classes near you"
5. Split Booked section in Dashboard into 2 --> Upcoming classes & Completed classes