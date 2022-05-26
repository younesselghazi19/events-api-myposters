const mongoose = require('mongoose')

mongoose.connect(
    "mongodb+srv://younesselghazi:159y159Y@cluster0.peu4t.mongodb.net/Events",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log("Mongodb connected");
        else console.log("Error:" + err)
    }
)