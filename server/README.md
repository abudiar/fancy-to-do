# Todos App

Todos App is an application to hold all your todos needs. This application has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /todos

> Create new todo

_Request Header_

```
not needed
```

_Request Body_

```
{
  "title": <title to post>,
  "description": <description to post>,
  "status": <status to post>,
  "due_date": <due date to post>,
}
```

_Response (201 - Created)_

```
{
  "id": <given id by system>,
  "title": <posted title>,
  "description": <posted description>,
  "status": <posted status>,
  "due_date": <posted due date>,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_

```
  "<returned error message>"
```

_Response (422 - Unprocessable Entity)_

```
  "<returned error message>"
```

_Response (500 - Internal Server Error)_

```
  "<returned error message>"
```

---

### GET /todos

> Get all todos

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
    "id": 1,
    "title": "Cari makan",
    "description": "Cari makan online gara gara COVID",
    "status": "Belom",
    "due_date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "Cari laptop baru",
    "description": "Cari laptop baru online gara gara laptop pecah",
    "status": "Belom",
    "due_date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_

```
  "<returned error message>"
```

---

### GET /todos/:id

> Get one todo

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
  "id": <id>,
  "title": "Cari makan",
  "description": "Cari makan online gara gara COVID",
  "status": "Belom",
  "due_date": "2020-03-20T07:15:12.149Z",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_

```
  "<returned error message>"
```

_Response (422 - Unprocessable Entity)_

```
  "<returned error message>"
```

_Response (500 - Internal Server Error)_

```
  "<returned error message>"
```

---

### PUT /todos/:id

> Updates one todo

_Request Header_

```
not needed
```

_Request Body_

```
{
  "title": <title to post>,
  "description": <description to post>,
  "status": <status to post>,
  "due_date": <due date to post>
}
```

_Response (200)_

```
{
  "id": <id>,
  "title": <posted title>,
  "description": <posted description>,
  "status": <posted status>,
  "due_date": <posted due date>,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_

```
  "<returned error message>"
```

_Response (404 - Not Found)_

```
  "<returned error message>"
```

_Response (422 - Unprocessable Entity)_

```
  "<returned error message>"
```

_Response (500 - Internal Server Error)_

```
  "<returned error message>"
```

---

### DELETE /todos/:id

> Deletes one todo

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
  "id": <id>,
  "title": <posted title>,
  "description": <posted description>,
  "status": <posted status>,
  "due_date": <posted due date>,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_

```
  "<returned error message>"
```

_Response (422 - Unprocessable Entity)_

```
  "<returned error message>"
```

_Response (500 - Internal Server Error)_

```
  "<returned error message>"
```
