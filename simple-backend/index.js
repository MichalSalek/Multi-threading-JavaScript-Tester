const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const APP_PORT = 8080
const GET_ALL_JOBS_DONE = '/allJobsDone'
const POST_REPORT_JOB_DONE = '/reportJobDone'



//
// { serviceWorker1: 0, serviceWorker2: 0, serviceWorker3: 0, serviceWorker4: 0 }
// { [key:serviceWorker[*]]: number; }
//
const runtimeData = { }

//
// POST handler
// { name: string, calculationsAmount: number; }
//
const setNewJobDone = ({name, calculationsAmount}) => {
    runtimeData[name] = calculationsAmount
}


//
// { serviceWorker1: 59, serviceWorker2: 462 }
// { [key:serviceWorker[*]]: number; }
//
app.get(GET_ALL_JOBS_DONE, function (request, response) {
    response.json(runtimeData);
});



//
// { name: serviceWorker1, calculationsAmount: 59 }
// { name: string; calculationsAmount: number; }
//
app.post(POST_REPORT_JOB_DONE, function (request, response) {
    response.json(request.body) // Obligatory here

    setNewJobDone(request.body)
    response.sendStatus(201);
});



//
// Start a server
//
app.listen(APP_PORT, () => {
    console.log(`App listening at http://localhost${APP_PORT}`)
})
