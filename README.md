
### Started on : 2020-07-18
- Updated initial readme

### Setup Instruction
- Edit .env file to configure database
- For first time - install required dependencies``` npm install ```   
- ``` npm start ``` [ DEV: live reload ``` npm run dev ``` ]


## Features Initial Release:


### AUTH

#### Register: `auth/signup`
```
POST /auth/signup
Host: localhost:3000
Content-Type: application/json

{
    "fullname": "demo myedu",
    "email": "demo@myedu.com",
    "password": "demo1234"
}
```

#### Login: `auth/login`
```
POST /auth/login
Host: localhost:3000
Content-Type: application/json
Authorization: Token {token} 

{
    "email": "demo@myedu.com",
    "password": "demo1234"
}
```
### API

__Note__: Authorization disabled for development, APIs are directly available

#### Courses: CRUD 
1. GET - All `api/courses`
2. GET - By ID `api/courses/{id}`
3. POST - Create `api/courses`
4. PUT - Update `api/courses`

-  example POST - `api/courses`
```
POST /api/courses
Host: localhost:3000
Content-Type: application/json
Authorization: Token {token} // (optional) authorization disabled for development

{
    "title": "Demo title",
    "description": "This course is about ... "
}
```
