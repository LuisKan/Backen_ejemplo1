const mongoose = require('mongoose');
const dbName = "my_database";
mongoose.connect("mongodb://127.0.0.1/DB_name" + dbName,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Established a connection to database`))
    .catch(err => console.log("Something went wrong when connecting to the database",

        err
    ));

