const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URL}`,{
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
