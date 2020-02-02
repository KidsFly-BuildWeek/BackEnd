# BackEnd
Kids Fly BE

# Authentication
- Root URL `https://kids-fly-be.herokuapp.com/api/auth`
- Tokens will be needed for authenticated routes.

### Endpoints

#### - Register - `[POST] /register`

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

#### `[POST] /login`

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
