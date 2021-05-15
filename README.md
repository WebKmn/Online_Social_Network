# Ponyo&Totoro
[Link to Website](https://ponyoandtotoro.herokuapp.com/)
[Link to Video Demo](https://www.youtube.com/watch?v=OE0F6n4XxCk)

# Project Description
This is a social networking web app similar to Twitter, but much more simplified since it is an academic project. It supports the most basic functionalities for a social networking site such as signing up, creating textual posts, and following other users. An user can see posts posted by users they follow, and they can also unfollow others. Hashtags are also supported and users can see what the most popular hashtags are. There is also a fully functional header that helps users navigate and modify their profiles if needed.

# Design Choices
This web app is created with Node, Express, EJS, and MongoDB and is hosted by Heroku.

On the back-end, we used Node and Express for server side event handling, content serving, and routing. We followed MVC architecture by creating seperate models/controllers for different modules, using namespacing for route organization, and rendering views with EJS. We used MongoDB as our database to store user and post information.

On the front-end, we used Bootstrap framework to develop a modern, responsive, and mobile-friendly user interface. We followed best practices by separating scripts, CSS, and HTML files. We also used a little bit of jQuery to handle AJAX.

We implemented proper access control by making sure users can't visit unauthorized parts of the web app, and we handled errors so that when an error occurs, an user is notified and then directed to an error page. And we had both client-side and server-side input validation with flash messages to inform users what is wrong. Last but not least, we utilized Passport.js to create user authentication and security sessions via hashing, salting and cookies.

# Limitations and Future Possibilities
Due to the scale of this project, some critical features for a social media are missing, such as liking, commenting, and sharing other users' posts. Although these buttons exist on the front-end, there is no implementation on the back-end, so nothing happens when users click on them. Some other features such as posting pictures/videos, searching for users/posts, and blocking other users are missing too.

As a result, future works can be done to make this simple web app closer to being a real social networking app.

# Launching the server locally
run _npm install_, then _node seed.js_, and finally _npm start_ 

# Division of Tasks
Xin worked on most of the functionalities, and Web worked on input validation/sanitization as well as created the initial signup and login pages.
