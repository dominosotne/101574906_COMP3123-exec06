# COMP3123 Exercise 06 - Notes API
Student ID: 101574906

## Run
Requires Node.js 22+ and a running MongoDB server.

    npm ci
    npm start

Default URL: http://localhost:8081
Default database: mongodb://127.0.0.1:27017/notes_app
For Atlas, set DB_URL in your shell before starting; never commit credentials.
To load a local .env file with Node 22: node --env-file=.env server.js

## Optional Docker
Start Docker Desktop, then run `docker compose up --build`.
MongoDB data persists in the notes_data volume. Docker configuration has not been executed in this environment.

## API
| Method | Path | Success |
| --- | --- | --- |
| GET | / | 200 welcome message |
| POST | /notes | 201 created note |
| GET | /notes | 200 array of notes |
| GET | /notes/:noteId | 200 note |
| PUT | /notes/:noteId | 200 updated note |
| DELETE | /notes/:noteId | 200 deletion confirmation |

POST and PUT require JSON:

```json
{"content":{"noteTitle":"Sample Note Title","noteDescription":"Sample Note Description","priority":"HIGH"}}
```

All three fields are required non-empty strings. Priorities: HIGH, LOW, MEDIUM, or the lab comment's spelling MEDUIM. Responses contain the note fields directly plus _id and dates. The server assigns dateAdded and dateUpdated; client dates are ignored. PUT replaces the three editable fields and preserves dateAdded. GET and DELETE do not require a body.
Invalid input/ID/JSON returns 400, missing notes/routes return 404, unexpected failures return 500.

## Postman testing
Import postman/Notes.postman_collection.json into Postman. Set baseUrl if needed. Run requests in order using Collection Runner; the create request saves noteId automatically. The collection covers every endpoint plus validation and not-found cases. Capture the runner summary and each CRUD response with status and body visible.

## Validation status
All 16 requests and 22 assertions passed with zero failures using Newman 6.2.1 (Postman collection runner) against a real temporary MongoDB 7.0.24 server. See postman/TEST-RESULTS.txt and postman/newman-results.json. Syntax and model validation checks also passed. Postman GUI screenshots are still required: Postman was not found in the app inventory. Docker configuration was not run because its engine was stopped.

## GitHub submission
Create a repository named 101574906_COMP3123-exec06 in your GitHub account, then run these commands from this folder (replace YOUR_USERNAME):

    git init
    git add .
    git commit -m "Complete notes CRUD lab"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/101574906_COMP3123-exec06.git
    git push -u origin main

Repository creation was not completed because browser access to GitHub was denied. Submit the resulting actual repository URL with the ZIP and real Postman screenshots.

