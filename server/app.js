const express = require('express')
const config = require('config')
const connection = require('./database')
const {authRouter} = require('./routes/auth')
// const fileUpload = require('express-fileupload')

const cors = require('cors')
const {mainRouter} = require("./routes/main");
const {reviewsRouter} = require("./routes/reviews");
const {computersRouter} = require("./routes/computers");
const fs = require('fs');
const app = express()

const PORT = config.get('port') || 3001

const path = require('path')

app.use(cors())
// app.use(fileUpload())
app.use(express.json())

// app.use(express.static(__dirname +'/contentPCImages'))
app.use(express.static('content/PCImages'))
app.use(express.static('content/CasesImages'))
// testFolder=__dirname+'/content/PCImages'
// fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//         console.log(file);
//     });
// })

// Routes
// app.use('/api', reviewsRouter)
app.use('/api', mainRouter)
app.use('/api', authRouter)
app.use('/api', computersRouter)

async function start() {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');



        // await Reviews.create({
        //     text:'test',
        //     rate:'rate',
        //     user_id:'16'
        // })

        // await Reviews.create({
        //     text: 'test2',
        //     rate: 'rate',
        //     imageReviews: [
        //         {
        //             type: 'tt',
        //             image: 'image2'
        //         },
        //         {
        //             type: 'tt',
        //             image: 'image3'
        //         }
        //     ]
        // }, {
        //     include: [imageReviews]
        // })


        app.listen(PORT, () => console.log(`start ${PORT}`))
    } catch (e) {
        console.log('error', e.message)
        process.exit()
    }
}

start()

