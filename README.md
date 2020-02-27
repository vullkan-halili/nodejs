## Clean Architecture
### This application is developed following the clean architecture.
![alt text](https://raw.githubusercontent.com/vullkan-halili/nodejs/master/images/CleanArchitecture.jpg)
1. Independent of Frameworks. The architecture does not depend on the existence of some library of feature laden software. This allows you to use such frameworks as tools, rather than having to cram your system into their limited constraints.
2. Testable. The business rules can be tested without the UI, Database, Web Server, or any other external element.
3. Independent of UI. The UI can change easily, without changing the rest of the system. A Web UI could be replaced with a console UI, for example, without changing the business rules.
4. Independent of Database. You can swap out Oracle or SQL Server, for Mongo, BigTable, CouchDB, or something else. Your business rules are not bound to the database.
5. Independent of any external agency. In fact your business rules simply don’t know anything at all about the outside world.

For more information about clean architecture read this: [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Requirements

For development, you will need Node.js global package, npm, installed in your environment and MongoDB as database

### Node
Install [node.js](https://nodejs.org) depending on your Operating System

### MongoDB
Install [MongoDB](https://docs.mongodb.com/manual/installation/) depending on your Operating System

## Install
    $ git clone https://github.com/vullkan-halili/nodejs.git
    $ cd nodejs
    $ npm install

## Configure app
Copy `.env.template` to `.env` then add your settings.

## Run app
    $ npm run dev

## Testing

### Unit & Integration tests
    $ npm run test

### Unit & integration test coverage.
    $ npm run test:coverage

### End-to-end (ENDPOINT) tests
    $ npm run test:endpoints
