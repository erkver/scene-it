# SceneIt
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

SceneIt is an application for users to view early movie screenings and admins to create screenings, create reports, and view screening data. Users are able to view movie and screening information, as well as, get tickets emailed or texted to them. Admins are able to create/edit screenings, create/edit reports, and view analytics for each screening. 

## Technologies

 - SASS
 - React
 - Google Maps API
 - Auth0
 - Nodemailer
 - Twilio
 - Redux
 - React Router DOM
 - MomentJS
 - ChartJS
 - React Datepicker
 - Express
 - NodeJS
 - MassiveJS
 - PostgreSQL

## User Side

**List of user capabilites:**

All users - 
 - View full list of screenings in user's area. 
 - View movie information (via The Movie Database API).
 - View theatre location for screening on Google Maps.
 
Logged in users - 
 - Get tickets to screening via text or email.
 - View all screenings where user has gotten tickets (watchlist).
 - Give away tickets to screenings user decides not to go to.

**Home Page**

![enter image description here](https://lh3.googleusercontent.com/XCM9y130_ghtKcn7hxJMiGzRS3iKl4igh3bo0JoXVofFld_7sK7Pu9GFhASxhBpPl2piHzTpwxY8 "User Home Page")

**Individual Screening Page**

![enter image description here](https://lh3.googleusercontent.com/m09vy9HdicjUPztFz7ksoz2_Q_zzr_1WCsQn1zrsG0Wok79zrMmH5ZbzRRTwfGKQCXtybwXox9uv "Individual Screening Page")

**Watch List Page**

![enter image description here](https://lh3.googleusercontent.com/T3qFV_Q6gSI5ENYAfbIYFMGvVjWYIkO4SF1q_0mkTWb67IcFjp0o4kF2BFd8v2DEdOL-BnQq8tOk "User Watch List Page")

## Admin Side

**List of admin capabilities:**

 - View full list of screenings (condensed info). 
 - View full list of screening reports.
 - Ability to create and edit screenings or reports.
 - Ability view individual screening analytics.
 - Send targeted emails based off of screening analytics.

**Home Page**
Admin and user pages route to same url path, but renders different views depending on admin access.

![Home Page](https://lh3.googleusercontent.com/MA3YRFnhwgQCgEc7GKkY3SZztMCNNaQKtpy07TtLOyqCicpr9oFEbppduJo0m8a42JYrZAWHDNFe "Admin Home")


**Reports Page**

![Reports Page](https://lh3.googleusercontent.com/MXMy7s3MktcKhWmGnKxiuzIya1IUdqeq99xNf7KVnno8LNIW5mrfOsOgDoZFDDm_-1gAmhvVE4nb "Admin Reports Page")

**Single Report Page**

![Single Report Page](https://lh3.googleusercontent.com/LTuQf5aMTWYKNO24pUuSuUn2PUmb56Inl9DuPPNMa5lZxG_8MwZBlVaw9TnlKIlH8ZTnjRZ4AAXh "Admin Single Report Page")

**Screening Analytics Page**

![Screening Analytics Page](https://lh3.googleusercontent.com/fhhKmYk49KhdGuWpvG0xcbzCF4JUk2PD7nJ8vnekmJPTPx_DJH83glcDQnnoh48eJO_uLOqqitNZ "Admin Analytics Page")