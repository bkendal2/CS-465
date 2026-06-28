Architecture

Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

This project used two different frontend approaches. The customer-facing website was built with Express, Handlebars (HBS), HTML, CSS, and JavaScript. Each time a user navigated to a different page, the server generated a new HTML page and sent it to the browser. This approach worked well for displaying travel information and static content.
The administrator side of the application was built as an Angular single-page application (SPA). Instead of reloading the entire page, Angular updates only the parts of the page that change. Components like Trip Listing, Trip Card, Add Trip, Edit Trip, Login, and Navbar made the application much more responsive and easier to maintain. Using Angular also allowed me to create a cleaner user experience with reusable components and routing.
Why did the backend use a NoSQL MongoDB database?
MongoDB was a good choice because the travel data naturally fits into document-based storage. Each trip contains related information like the destination, resort, price, description, and image, which can all be stored together in a single document. MongoDB also works well with Node.js and Mongoose, making it easy to create schemas, retrieve records, and update data through RESTful API endpoints. The flexibility of MongoDB also makes it easier to expand the application with additional fields in the future without redesigning the database.

Functionality

How is JSON different from JavaScript and how does JSON tie together the frontend and backend development pieces?

JavaScript is the programming language used to build the application's functionality, while JSON is simply a lightweight format used to organize and transfer data. Throughout this project, the Express API returned trip data as JSON, and the Angular application used that JSON to display and update trip information. JSON acted as the connection between the frontend and backend by allowing both sides of the application to exchange structured data in a consistent format.
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
As the project grew, I refactored several parts of the application to improve organization and reduce duplicate code. Instead of placing all functionality in one location, I separated the Angular application into reusable components like Trip Card, Trip Listing, Add Trip, Edit Trip, Login, and Navbar. I also moved API communication into Angular services, making it easier to reuse the same methods throughout the application.
Reusable UI components made development much more efficient because changes only needed to be made in one place. For example, updating the Trip Card component automatically updated every trip displayed in the application. This approach also made the code easier to read, maintain, test, and expand with additional features.

Testing

Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

Throughout this project, I tested multiple REST API endpoints using GET, POST, and PUT requests. GET requests retrieved trip information from MongoDB, POST requests created new trips and authenticated users, and PUT requests updated existing trip records. After implementing JWT authentication, testing became more complex because protected endpoints required a valid authentication token before allowing updates. I verified that users could successfully log in, receive a JWT, and use that token to perform authenticated requests. I also confirmed that unauthorized requests were rejected while authenticated requests successfully updated the database. This testing process helped ensure that both the application's functionality and security worked correctly together.

Reflection

How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course has been one of the most valuable classes in my computer science program because it brought together everything I had learned into one complete full stack application. Before this course, I had experience with programming concepts, but this project helped me understand how the frontend, backend, database, APIs, and security all work together in a real application.
I gained hands-on experience using the MEAN stack, creating RESTful APIs, working with MongoDB and Mongoose, building an Angular single-page application, implementing JWT authentication, and using Git throughout the development process. I also became much more comfortable troubleshooting problems and debugging issues as they came up.
Completing this project has given me much more confidence in my ability to contribute to a software development team. It also gave me a portfolio project that demonstrates full stack development, which I believe will make me a stronger candidate for software engineering, product management, or other technology roles after graduation.
