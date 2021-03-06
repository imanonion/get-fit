# get-fit

<img src="https://github.com/imanonion/get-fit/blob/cb7d0e273cf7772e427a841d91343ff1fe5f584f/public/getfit_logo.png" align="right" alt="Get Fit logo" width="200" height="191">

## Project 2

 💪  Check it out here: https://getfit-sg.herokuapp.com/classes

#### Introduction
Get Fit is a platform that aims to consolidate and display all exercise classes in Singapore. 

This app was inspired by my dad, who swears by the free or super low-cost exercise sessions run by the govt. He has always had to go through multiple apps to find activities to join. Many times, he booked so many activities on different apps that he forgot where to find his bookings.😕 

Some reference apps are: [ActiveSG](https://www.myactivesg.com "ActiveSG"), [Healthy365](https://www.activate.sg/healthy-365-app "Healthy365"), [pa.gov.sg](https://www.pa.gov.sg "PA")

At the time of writing this, there is currently no API to link to government data on community exercise classes. 😔 Hence, mock data was created using Mockaroo. Hopefully, there'll be an API in future. 

_________________________

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

_________________________

#### Routes
##### Classes routes
| No. |Route      |URL                       |HTTP Verb|Description                                       |
|-----|-----------|--------------------------|---------|--------------------------------------------------|
| 1   |index      |/classes                  |GET      |Landing page, displays all classes                |
| 2   |searchQuery|/classes/search           |POST     |Send search query                                 |
| 3   |searchIndex|/classes/search           |GET      |Display search results                            |
| 4   |new        |/classes/new              |GET      |Form to create new class                          |
| 5   |create     |/classes                  |POST     |Create new class and add to classes collection    |
| 6   |show       |/classes/:slug/:id        |GET      |Display one class's info                          |
| 7   |edit       |/classes/:slug/:id/edit   |GET      |Form to edit class information                    |
| 8   |update     |/classes/:slug/:id        |PATCH    |Update class information after edit               |
| 9   |delete     |/classes/:slug/:id        |DELETE   |Delete class from classes and bookings collections|
| 10  |bookClass  |/classes/:slug/:id/booking|POST     |Add booking to dashboard and bookings collection  |

##### Users routes
| No. |Route       |URL             |HTTP Verb|Description                                      |
|-----|------------|----------------|---------|-------------------------------------------------|
| 1   |registerForm|/users/register |GET      |Display Register user account form               |
| 2   |registerUser|/users/register |POST     |Add user to users collection                     |
| 3   |loginForm   |/users/login    |GET      |Display Login form                               |
| 4   |loginUser   |/users/login    |POST     |Authenticate user                                |
| 5   |dashboard   |/users/dashboard|GET      |Displays user's dashboard when they are signed in|
| 6   |logout      |/users/logout   |POST     |Logs user out of session                         |

_________________________

#### Lessons Learned
- Wireframing at the beginning is a good start. Try to draw out all routes as much as possible. 
- Styling of the pages can be done at the end..get the functionalities right first.

#### Improvements & Future Enhancements
1. Add validations!!!
2. Add contact form in footer
3. Search filter with multiple queries in Index/Home page
4. Addition of image from user's local storage
5. Add google location map to suggest "classes near you"
6. Split Booked section in Dashboard into 2 --> Upcoming classes & Completed classes
7. Only  allow organiser to edit/delete the activity from classes collection
8. Disallow "Book Now" button after user has booked the class once
9. Allow participant to Delete booking
10. Get datetime and description to display automatically in Edit form
