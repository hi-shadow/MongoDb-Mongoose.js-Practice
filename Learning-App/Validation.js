const mongoose = require("mongoose")
const { Schema, } = mongoose;
mongoose.set("strictQuery", true)
mongoose.connect("mongodb://127.0.0.1:27017/Youtube_CkDrametizzz?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2")
    .then(() => { console.log("Connection Successful"); }).catch(() => { console.log("Error") })

const userSchema = new Schema({

    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true, lowercase: true },
    Mobile: { type: Number, required: true, unique: true },
    Active: { type: Boolean, default: true }
})

const User = mongoose.model("user", userSchema)

const InsertFunc = async () => {

    const gautam = new User({
        Name: "Gautam Vaja",
        Email: "vazagautam54@gmail.com",
        Mobile: 8306268991
    })
    const himani = new User({
        Name: "Himani Devani",
        Email: "DEVANIHIMANI86@gmail.com",
        Mobile: 8306268992
    })
    const sagar = new User({
        Name: "Sagar Vaja",
        Email: "VAZASAGAR3@gmail.com",
        Mobile: 9586240816
    })
    const nidhi = new User({
        Name: "Nidhi Vaja",
        Email: "VAZANIHDI785@gmail.com",
        Mobile: 8530938034
    })
    const sagar2 = new User({
        Name: "Sagar Vaja",
        Email: "vazasagar4@gmail.com",
        Mobile: 9265709057
    })


    let result = await User.insertMany([gautam, himani, sagar, nidhi, sagar2])

}
InsertFunc()



const deleteUser = async () => {
    let result = await User.deleteMany({ Active: true })
    console.log(result);
}

// deleteUser()