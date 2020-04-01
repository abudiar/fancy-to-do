# Todos App

Todos App is an application to hold all your todos needs. This application has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register

> Create new user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": <name to post>,
  "password": <password to post>,
}
```

_Response (201 - Created)_

```
{
  "id": <posted id given by system>,
  "name": <post name>,
  "password": <post password>,
  "updatedAt": "2020-03-31T09:46:41.241Z",
  "createdAt": "2020-03-31T09:46:41.241Z"
}
```

_Response (400 - Bad Request)_

```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Due date must be a date",
            "type": "Validation error",
            "path": "due_date",
            "value": null,
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Is it me your looking for",
                "description": "I can see it in your eyes",
                "status": "deep inside you wanna cry",
                "due_date": null,
                "updatedAt": "2020-03-30T15:14:23.423Z",
                "createdAt": "2020-03-30T15:14:23.423Z"
            },
            "validatorKey": "isDate",
            "validatorName": "isDate",
            "validatorArgs": [
                {
                    "msg": "Due date must be a date"
                }
            ],
            "original": {
                "validatorName": "isDate",
                "validatorArgs": [
                    {
                        "msg": "Due date must be a date"
                    }
                ]
            }
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```

---

### POST /login

> Login to user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name": <name to post>,
  "password": <password to post>,
}
```

_Response (201 - Created)_

```
{
  "accessToken": <accessToken given by system>
}
```

_Response (400 - Bad Request)_

```
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Due date must be a date",
            "type": "Validation error",
            "path": "due_date",
            "value": null,
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Is it me your looking for",
                "description": "I can see it in your eyes",
                "status": "deep inside you wanna cry",
                "due_date": null,
                "updatedAt": "2020-03-30T15:14:23.423Z",
                "createdAt": "2020-03-30T15:14:23.423Z"
            },
            "validatorKey": "isDate",
            "validatorName": "isDate",
            "validatorArgs": [
                {
                    "msg": "Due date must be a date"
                }
            ],
            "original": {
                "validatorName": "isDate",
                "validatorArgs": [
                    {
                        "msg": "Due date must be a date"
                    }
                ]
            }
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```

---

### POST /todos

> Create new todo

_Request Header_

```
{
  "accessToken": <accessToken from login>
}
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
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Due date must be a date",
            "type": "Validation error",
            "path": "due_date",
            "value": null,
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Is it me your looking for",
                "description": "I can see it in your eyes",
                "status": "deep inside you wanna cry",
                "due_date": null,
                "updatedAt": "2020-03-30T15:14:23.423Z",
                "createdAt": "2020-03-30T15:14:23.423Z"
            },
            "validatorKey": "isDate",
            "validatorName": "isDate",
            "validatorArgs": [
                {
                    "msg": "Due date must be a date"
                }
            ],
            "original": {
                "validatorName": "isDate",
                "validatorArgs": [
                    {
                        "msg": "Due date must be a date"
                    }
                ]
            }
        }
    ]
}
```

_Response (401 - Not Found)_

```
{
  "name": "AuthorizationError",
  "message": "You do not have the required permissions!"
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```

---

### GET /todos

> Get all todos

_Request Header_

```
{
  "accessToken": <accessToken from login>
}
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

_Response (400 - Bad Request)_

```
{
  "name": "TokenNull",
  "message": "Token is missing."
}
```

_Response (401 - Not Found)_

```
{
  "name": "AuthorizationError",
  "message": "You do not have the required permissions!"
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```

---

### GET /todos/:id

> Get one todo

_Request Header_

```
{
  "accessToken": <accessToken from login>
}
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

_Response (400 - Bad Request)_

```
{
  "name": "TokenNull",
  "message": "Token is missing."
}
```

_Response (401 - Not Found)_

```
{
  "name": "AuthorizationError",
  "message": "You do not have the required permissions!"
}
```

_Response (404 - Not Found)_

```
{
  "name": "<returned error name>",
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```

---

### PUT /todos/:id

> Updates one todo

_Request Header_

```
{
  "accessToken": <accessToken from login>
}
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
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Due date must be a date",
            "type": "Validation error",
            "path": "due_date",
            "value": null,
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "Is it me your looking for",
                "description": "I can see it in your eyes",
                "status": "deep inside you wanna cry",
                "due_date": null,
                "updatedAt": "2020-03-30T15:14:23.423Z",
                "createdAt": "2020-03-30T15:14:23.423Z"
            },
            "validatorKey": "isDate",
            "validatorName": "isDate",
            "validatorArgs": [
                {
                    "msg": "Due date must be a date"
                }
            ],
            "original": {
                "validatorName": "isDate",
                "validatorArgs": [
                    {
                        "msg": "Due date must be a date"
                    }
                ]
            }
        }
    ]
}
```

_Response (401 - Not Found)_

```
{
  "name": "AuthorizationError",
  "message": "You do not have the required permissions!"
}
```

_Response (404 - Not Found)_

```
{
  "name": "<returned error name>",
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```

---

### DELETE /todos/:id

> Deletes one todo

_Request Header_

```
{
  "accessToken": <accessToken from login>
}
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

_Response (400 - Bad Request)_

```
{
  "name": "TokenNull",
  "message": "Token is missing."
}
```

_Response (401 - Not Found)_

```
{
  "name": "AuthorizationError",
  "message": "You do not have the required permissions!"
}
```

_Response (404 - Not Found)_

```
{
  "name": "<returned error name>",
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```

---

### GET /todos/translate/:id

> Translates one todo

_Request Query Params_

```
{
  "translateFrom": <ID of language to translate from> (defaults to auto-translate - auto)
  "translateTo": <ID of language to translate to> (defaults to english - en)
}
```

_Request Header_

```
{
  "accessToken": <accessToken from login>
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
  "parameters": {
    "from": "auto",
    "to": "ru"
  },
  "original": {
    "title": "Ayo kita test translasi ini!",
    "description": "Halo nama aku alan, nama kamu apa?",
    "status": "Coba aja deh"
  },
  "translated": {
    "title": "Давайте проверим этот перевод!",
    "description": "Здравствуйте, меня зовут Алан, как вас зовут?",
    "status": "Просто попробуйте"
  }
}
```

_Response (400 - Bad Request)_

```
{
  "name": "TokenNull",
  "message": "Token is missing."
}
```

_Response (401 - Not Found)_

```
{
  "name": "AuthorizationError",
  "message": "You do not have the required permissions!"
}
```

_Response (404 - Not Found)_

```
{
  "name": "<returned error name>",
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "SequelizeConnectionError",
  "parent": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  },
  "original": {
      "name": "error",
      "length": 167,
      "severity": "FATAL",
      "code": "28P01",
      "file": "d:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\libpq\\auth.c",
      "line": "333",
      "routine": "auth_failed"
  }
}
```
