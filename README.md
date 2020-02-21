# BackEnd
Kids Fly BE

# Authentication
- Root URL `https://kids-fly-be.herokuapp.com/api`
- Tokens will be needed for authenticated routes.
- Routes will decode the token and grab information needed for user specific actions.

### Endpoints

- URL `/auth`

#### `[GET] / !restricted `admin account needed`

Test your token, and role with this route.

#### `[POST] /register`

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

#### `[DELETE] /:email` 

To delete user, send a DELETE request to /:email, I.E. `/api/auth/tim@tim.com`

#### `[PUT] /:email`

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
- URL - `/connection`

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


## Flights
- URL `/flights`

#### `[GET] /` !restricted

Get all flights.

#### `[POST] /` !restricted

##### Request Body

```
{
	"airline": "Southwest", // required (string)
	"airport": "MCD", // required (string)
	"flight_number": "F33", // required (string)
	"flight_date": "2020-03-22", // required (date)
	"flight_time": "06:00" // required (time)
}
```

##### Response Object

```
{
    "airline": "Southwest",
    "airport": "MCD",
    "flight_number": "F33",
    "flight_date": "2020-03-22",
    "flight_time": "06:00"
}
```

#### `[DELETE] /:flight_number` !restricted `admin account needed`

To delete a flight, send a DELETE api call to the delete url i.e. `/api/flights/F33`

#### `[PUT] /:flight_number` !restricted

To edit a flight, send a PUT api call to the url with an update object i.e. `/api/flights/F33`

```
{
    "airline": "Delta",
    "airport": "MCD",
    "flight_number": "F34",
    "flight_date": "2020-03-22",
    "flight_time": "06:00"
}
```

## User Flights
- URL `/user_flights`

#### `[GET] /` !restricted

To get all flights for a user, send a GET request to `/api/user_flights/`

#### `[POST] /:flight_number` !restricted

To add a user to a flight, send a POST request to the url i.e. `/api/user_flights/F34` with the following body:

```
{
	"carry_ons": "2",
	"number_of_children": "2",
	"special_needs_req": false
}
```

#### `[DELETE] /:flight_number` !restricted `admin account needed`

To delete a flight from a user, send a DELETE request to the url with the flight number, i.e. `/api/user_flights/F34`


## KidsFlyConnections

- URL `/user_connection`

#### `[GET] /:connection_user_email`

To GET all connections for a KidsFlyConnection account send a GET request with the KidsFlyConnection user email to the endpoint, i.e. `/api/user_connection/tim@tim.com`.

##### Response Object

```
[
    {
        "userName": null,
        "userEmail": "tim@tim.com",
        "airline": "Delta",
        "airport": "BDA",
        "flight_number": "F31",
        "flight_date": "2020-03-22",
        "flight_time": "06:00",
        "carry_ons": 3,
        "number_of_children": 3,
        "special_needs_req": 0, // This is a boolean
        "completed": 0, // This is a boolean
        "connectionName": "tim",
        "connectionEmail": "tim@tim.com"
    }
]
```

#### `[POST] /:user_email/:connection_email/:flight_number` !restricted

To add a KidsFlyConnection send a POST request to the URL with the user_email, connection_email and flight_number, i.e. `/api/user_connection/tim@tim.com/tim@tim.com/F32`.

##### Request Body

```
{
	"completed": true // This is an optional field. There is an endpoint to edit a KidsFlyConnection.
}
```

##### Response Object

Response will return all KidsFlyConnections associated with the KidsFlyConnection account.

```
[
    {
        "userName": null,
        "userEmail": "tim@tim.com",
        "airline": "Delta",
        "airport": "BDA",
        "flight_number": "F31",
        "flight_date": "2020-03-22",
        "flight_time": "06:00",
        "carry_ons": 3,
        "number_of_children": 3,
        "special_needs_req": 0,
        "completed": 0,
        "connectionName": "tim",
        "connectionEmail": "tim@tim.com"
    },
    {
        "userName": null,
        "userEmail": "tim@tim.com",
        "airline": "American",
        "airport": "LAX",
        "flight_number": "F33",
        "flight_date": "2020-03-24",
        "flight_time": "08:00",
        "carry_ons": 3,
        "number_of_children": 3,
        "special_needs_req": 0,
        "completed": 1,
        "connectionName": "tim",
        "connectionEmail": "tim@tim.com"
    },
    {
        "userName": null,
        "userEmail": "tim@tim.com",
        "airline": "Southwest",
        "airport": "MCD",
        "flight_number": "F32",
        "flight_date": "2020-03-23",
        "flight_time": "07:00",
        "carry_ons": 3,
        "number_of_children": 3,
        "special_needs_req": 0,
        "completed": 1,
        "connectionName": "tim",
        "connectionEmail": "tim@tim.com"
    }
]
```

#### `[DELETE] /:flight_number/:connection_email` !restricted

To remove a KidsFlyConnection, send a DELETE request to the URL with the flight number and KidsFlyConnection user email, i.e. `/api/user_connection/F31/tim@tim.com`.

##### Response Object

```
{
    "message": "Flight F31 was removed as a KidsFlyConnection for user tim@tim.com"
}
```

#### `[PUT] /:flight_number/:connection_email` !restricted

To edit a KidsFlyConnection, send a PUT request to the URL with the flight number and the KidsFlyConnection user email, i.e. `/api/user_connection/F32/tom@tom.com`.

##### Request Body

```
{
    completed: true; // While this is not a required property, something is required in the request body.
}
```

##### Response Object

Response will be all KidsFlyConnections associated with KidsFlyConnection user account.

```
[
    {
        "userName": null,
        "userEmail": "jeff@jeff.com",
        "airline": "Southwest",
        "airport": "MCD",
        "flight_number": "F32",
        "flight_date": "2020-03-23",
        "flight_time": "07:00",
        "carry_ons": 3,
        "number_of_children": 3,
        "special_needs_req": 1,
        "completed": 1,
        "connectionName": "tom",
        "connectionEmail": "tom@tom.com"
    }
]
```
