# Movie API Documentation

## Endpoints

List of available endpoints:

- GET /movies
- POST /movies/add
- GET /movies/:id
- GET /movies/delete/:id
- POST /movies/update/:id
- POST /users/register
- POST /users/login
- POST /login-google
- POST /detail-profile
- GET /genres

## 1. GET /movies

Description:

- Get all movie from database

Request

- headers:

```js
    {
        "access_token": "string"
    }
```

- _Response (200 - OK)_

```js
{
    {
        statusCode: 200,
        data: [
            {
                "id": 10,
                "title": "X-men",
                "synopsis": "A great movie",
                "trailerUrl": "http://www.youtube.com",
                "imgUrl": "http://www.amazingImage.com",
                "rating": 4,
                "genreId": 23,
                "authorId": 2,
                "createdAt": "2022-04-25T09:43:15.446Z",
                "updatedAt": "2022-04-25T09:43:15.446Z"

            },
            {
                "id": 11,
                "title": "Avenger End Game",
                "synopsis": "A great movie",
                "trailerUrl": "http://www.youtube.com",
                "imgUrl": "http://www.imgAmazing.com",
                "rating": 5,
                "genreId": 24,
                "authorId": 2,
                "createdAt": "2022-04-25T13:58:55.865Z",
                "updatedAt": "2022-04-25T14:38:29.051Z"
            }
            ...,
        ]
    }
}
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 2. POST /movies/add

Description:

- Add new movie

Request:

- body:

```js
    {
        "title": "string",
        "synopsis": "string",
        "trailerUrl": "string",
        "imgUrl": "string",
        "rating": "integer",
        "genreId": "integer",
        "authorId": "integer"
    }
```

- _Response (201 - Created)_

```js
    {
        "statusCode": 201,
        "message": "Adding Movie successfully"
        "data": {
                "id": 13,
                "title": "Avenger End Game",
                "synopsis": "A great movie",
                "trailerUrl": "http://www.youtube.com",
                "imgUrl": "http://www.imgAmazing.com",
                "rating": 5,
                "genreId": 24,
                "authorId": 2,
                "createdAt": "2022-04-25T13:58:55.865Z",
                "updatedAt": "2022-04-25T14:38:29.051Z"
        }
    }
```

- _Response (400 - Bad Request)_

```js
    [
        {
            "message": "Title is required"
        },
        OR
        {
            "message": "Synopsis is required"
        },
        OR
        {
            "message": "Minimal rating is 1"
        },
        OR
        {
            "message": "Failed to create data movie"
        }
    ]
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 3. GET /movies/:id

Description:

- Find movie by id

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- params:

```js
    {
        "id": "integer"
    }
```

- _Response (200 - OK)_

```js
    {
        "id": 13,
        "title": "Avenger End Game",
        "synopsis": "A great movie",
        "trailerUrl": "http://www.youtube.com",
        "imgUrl": "http://www.imgAmazing.com",
        "rating": 5,
        "genreId": 24,
        "authorId": 2,
        "createdAt": "2022-04-25T13:58:55.865Z",
        "updatedAt": "2022-04-25T14:38:29.051Z"
    }
```

- *Response (404 - Not Found)*

```js
    {
        "statusCode": 404,
        "message": "Movie not found"
    }
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 4. POST /movies/update/:id

Description:

- Update movie

Request:

- body:

```js
    {
        "title": "string",
        "synopsis": "string",
        "trailerUrl": "string",
        "imgUrl": "string",
        "rating": "integer",
        "genreId": "integer",
        "authorId": "integer"
    }
```

- _Response (201 - Created)_

```js
    {
        "statusCode": 201,
        "message": "Updating Movie successfully"
        "data": {
                "id": 13,
                "title": "Avenger End Game",
                "synopsis": "A great movie",
                "trailerUrl": "http://www.youtube.com",
                "imgUrl": "http://www.imgAmazing.com",
                "rating": 5,
                "genreId": 24,
                "authorId": 2,
                "createdAt": "2022-04-25T13:58:55.865Z",
                "updatedAt": "2022-04-25T14:38:29.051Z"
        }
    }
```

- _Response (400 - Bad Request)_

```js
    [
        {
            "message": "Title is required"
        },
        OR
        {
            "message": "Synopsis is required"
        },
        OR
        {
            "message": "Minimal rating is 1"
        },
    ]
```

- *Response (404 - Not Found)*

```js
    {
        "statusCode": 404,
        "message": "Movie not found"
    }
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 5. GET /movies/delete/:id

Description:

- Delete movie by id

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- params:

```js
    {
        "id": "integer (required)"
    }
```

- _Response (200 - OK)_

```js
    {
       "message": "Movie <entity.title> success to delete"
    }
```

- *Response (404 - Not Found)*

```js
    {
        "statusCode": 404,
        "message": "Movie not found"
    }
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 6. POST /users/register

Description:

- Create a new user.

Request:

- body:

 ```js
    {
        "email": "string"
        "password": "string"
    }
 ```

 - *Response (201 - Created)*

 ```js
    {
        "statusCode": 201,
        "message": "Add new user succesfully",
        "data": [
            "id" : 4,
            "username": null,
            "email": "admin@gmail.com"
            "password": "hashingPassword",
            "role": "staff || admin",
            "phoneNumber": null,
            "address": null,

        ]
    }
 ```

 - _Response (400 - Bad Request)_

```js
    [
        {
            "message": "Email is required"
        },
        OR
        {
            "message": "Invalid email input"
        },
        OR
        {
            "message": "Password is required"
        },
        OR
        {
            "message": "Password minimum 5 characters"
        }
    ]
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 7. POST /users/login

Description:

- Login to homepage.

Request:

- body:

 ```js
    {
        "email": "string"
        "password": "string"
    }
 ```

 - *Response (201 - Created)*

 ```js
    {
        "statusCode": 201,
        "access_token": "generatedToken"
    }
 ```

 - _Response (400 - Bad Request)_

```js
    [
        {
            "message": "Email is required"
        },
        OR
        {
            "message": "Password is required"
        },
        OR
        {
            "message": "Error user not found or password not matched"
        }
    ]
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 8. POST /users/login-google

Description:

- Login to homepage with google account.

Request:

- body:

 ```js
    {
        "email": "string"
        "password": "string"
    }
 ```

 - *Response (201 - Created)*

 ```js
    {
        "statusCode": 201,
        "access_token": "generatedToken"
    }
 ```

 - _Response (400 - Bad Request)_

```js
    [
        {
            "message": "Email is required"
        },
        OR
        {
            "message": "Password is required"
        },
        OR
        {
            "message": "Error user not found or password not matched"
        }
    ]
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 9. GET /users/detail-profile

Description:

- Find detail data user

Request:

- headers:

```js
    {
        "access_token": "string"
    }
```

- _Response (200 - OK)_

```js
    {
        "id": 13,
        "username": "admin10",
        "email": "admin@gmail.com",
        "password": "$2a$07$JqzlVgJL1OHBGVyNYmi9JeWs1U.vk0T72PgFKsJzF.YryuVXacU56",
        "role": "admin",
        "phoneNumber": "081234567890",
        "address": "Jalan Kenangan Desa Rindu",
        "createdAt": "2022-04-25T13:58:55.865Z",
        "updatedAt": "2022-04-25T14:38:29.051Z"
    }
```

- *Response (404 - Not Found)*

```js
    {
        "statusCode": 404,
        "message": "Movie not found"
    }
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## 10. GET /genres/

Description:

- Get all genre from database

Request

- headers:

```js
    {
        "access_token": "string"
    }
```

- _Response (200 - OK)_

```js
{
    {
        statusCode: 200,
        data: [
            {
                "id": 10,
                "name": "Action",                
                "createdAt": "2022-04-25T09:43:15.446Z",
                "updatedAt": "2022-04-25T09:43:15.446Z"

            },
            {
                "id": 11,
                "name": "Drama",
                "createdAt": "2022-04-25T13:58:55.865Z",
                "updatedAt": "2022-04-25T14:38:29.051Z"
            }
            ...,
        ]
    }
}
```

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

## Global Error

- *Response (500 - Internal Server Error)*

```js
    "message": "Internal Server Error"
```

