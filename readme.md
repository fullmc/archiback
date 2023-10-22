# Backend boilerplate

This school project is a boilerplate to help people start with Node js, Express and mongoDB.

## What you'll be using

For this project, I used a few libraries in order to securize the app as well as :

```
NodeJS v18

Body-parser : to parse data from the body of HTTP requests, simplifying the handling of incoming data and improving performance.

Cors : allows to configure security policies to handle cross-origin requests securely

Mongoose: enhances security by defining data schemas and enforcing validation. It improves performance by simplifying database operations, making them more efficient.

express js: Node.js web application framework

Json Web Token (Jwt): for user authentication and authorization. Enhance security by enabling token-based authentication rather than storing plain-text passwords. 

Cookie-parser : simplifies cookie management. Stores authentication and session state information, improving user session management and reinforcing security.

Bcrypt : to secure password hashing before storing it in the database. Makes passwords challenging to decrypt.

Mongoose-unique-validator : ensures that fields in your MongoDB models are unique. It enhances security by preventing unwanted duplicates.

path : facilitates file and directory path management. 

dotenv : to store sensitive environment variables, such as secret keys and database connection information. It improves security by avoiding the storage of sensitive information in the source code.

eslint and prettier : formatters to improve code quality, standardize code style, and enhance code readability
```

### Try it ! 

```
git clone git@github.com:fullmc/archiback.git (or git clone git@github.com:fullmc/archiback.git <newname> to rename it)

cd archiback

npm i
```

Don't forget to create a .env file ! 

Then `npm start` to run the server.

Enjoy :)



