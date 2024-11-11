const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mistryriddhi1510:OZBgSEDfrZVCY9la@cluster0.qa3sq.mongodb.net/EMS",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 
})
.then(() => {
    console.log("Connection Done");
})
.catch((err) => {
    console.log("Connection Fail", err);
});
