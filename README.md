# BackEnd
Kids Fly BE

# Authentication
- Root URL `https://kids-fly-be.herokuapp.com/api`
- Tokens will be needed for authenticated routes.

### Endpoints

#### Register - `[POST] /auth/register`

##### Request Body

To register, send a post request with a body object as followed:

```
{
"id": 1,
"email": "timothy@timothy.com", // required field (string)
"password": "password", // required field (string)
"name": null, // (string)
"street": null, // (string)
"city": null, // (string)
"state": null, // (string)
"zip": null, // (int)
"airport": null, // (string)
"phone": null, (int)
"role": "traveler" // This will default to 'traveler', if user is an 'admin', specify in role property. (string)
}
```

##### Response Object

Upon successful creation of user, the API will return an object as followed:

```
{
    "message": "timothy@timothy.com was registered and logged in.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbW90aHkxIiwiaWF0IjoxNTgwNjY5Mzg1LCJleHAiOjE1ODA3NTU3ODV9.gTutCRxg3eHfvUl3lEEugJk5mNPvg6UEVCDeQoh6TAQ"
}
```

#### `[POST] /auth/login`

##### Request Body

To log a user in, send a post request with a body object as followed:

```
{
  email: "timothy@timothy.com, // (string)
  password: "password", // (string)
}
```

##### Response Object

Upon successful login, the API will return an object as followed:

```
{
    "message": "timothy@timothy.com was logged in successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbW90aHkxIiwiaWF0IjoxNTgwNjY5ODAwLCJleHAiOjE1ODA3NTYyMDB9.0d6amBRv2VaYiNhO8dPWuUzRJzDQdCw_fQK6FTqjYkQ"
}
```

#### `[DELETE] /auth/:email`

To delete user, send a DELETE request to /:email, I.E. `/api/auth/tim@tim.com`

#### `[PUT] /auth/:email`

To edit a user, send a PUT request to /:email, I.E. `/api/auth/tim@tim.com`

##### Request Body

```
{
"email": "tim@tim.com", // required field (string)
"password": "password", // required field (string)
"name": null, // (string)
"street": null, // (string)
"city": null, // (string)
"state": null, // (string)
"zip": null, // (int)
"airport": null, // (string)
"phone": null, (int)
"role": "traveler" // 'admin' or 'traveler' (string)
}
```

##### Response Object

Upon successful user edit, the response will look like this:

```
{
    "email": "timothy@gmail.com",
    "name": "Tim",
    "street": "Jefferson Ave.",
    "city": null,
    "state": null,
    "zip": null,
    "airport": null,
    "phone": null,
    "role": "traveler",
    "rating": null
}
```
## Connection Auth
- Root URL - `/connection`

#### Register - `[POST] /register`

##### Request Body

To register, send a post request with a body object as followed:

```
{
"email": "timothy@timothy.com", // required field (string)
"password": "password", // required field (string)
"name": null // (string)
}
```

##### Response Object

Upon successful creation of connection, the API will return an object as followed:

```
{
    "message": "tim@tim.com was registered and logged in as a KidsFlyConnection.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbUB0aW0uY29tIiwiaWF0IjoxNTgwNzUzMTM1LCJleHAiOjE1ODA4Mzk1MzV9.tnUsmd4UzZcHjjTjrYN8uVz7UeM3lNVfH_njFJpwzZ4"
}
```

#### `[POST] /login`

##### Request Body

To log a connection in, send a post request with a body object as followed:

```
{
  email: "timothy@timothy.com, // (string)
  password: "password", // (string)
}
```

##### Response Object

Upon successful login, the API will return an object as followed:

```
{
    "message": "tim@tim.com was logged in successfully as a KidsFlyConnection.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbUB0aW0uY29tIiwiaWF0IjoxNTgwNzUzMjE2LCJleHAiOjE1ODA4Mzk2MTZ9.IdU4X_NGqDshmGu_7uSOKjVPzcmFQvIX6xkPP8yZev0"
}
```

#### `[DELETE] /connection/:email`

To delete a connection, send a DELETE request to /:email, I.E. `/api/connection/tim@tim.com`

#### `[PUT] /connection/:email`

To edit a connection, send a PUT request to /:email, I.E. `/api/connection/tim@tim.com`
