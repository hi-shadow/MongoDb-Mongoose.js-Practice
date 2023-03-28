const mongoose = require("mongoose")
const validator = require("validator")

// Create a Connection To MongoDB And Create A Database If It Not Exists

mongoose.connect("mongodb://127.0.0.1:27017/CkDrametizzz").then(() => {
    console.log("MongoDb Connected");
}).catch((e) => {
    console.log("Couldn't Connect MongoDB \n Error : " + e);
})

// for Creation a Schema you need to use a mongoose.Schema() method with JavaScript Object within 
//  that JavaScript Object Defines What Is a Structure of Your Data who is stored in Database


const playlistSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name Can't Be Blank"],
        lowercase: true,
        unique: [true, "Name Must Be A Unique"],
        minlength: [3, "Name Must be Grater Than 3 Charactors"],
        maxlength: [50, "Name Must be Less Than 50 Charactors"],
    },
    Videos: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Videos Can't Be Nagative Value")
            }
        }
    },
    Author: { type: String, enum: { values: ['CkDrametizzz'], message: "Author Must Be 'CkDrametizzz' " } },
    Email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please Enter a Valid Email Address")
            }
        }

    },
    Active: { type: Boolean, enum: [true, false] },
    Date: {
        type: Date,
        default: Date.now
    }
})

// for Create a collection you need to use mongoose.model() method with two arguments 1st arg is "Name Of Collection" and 2nd arg is "Schema of Those Collection"

const Playlists = new mongoose.model("playlist", playlistSchema)

// for creating a document in MongoDB you need  those "model name"  which one you want to insert data on it
// and inserting a data using " async await " feture of Advance JavaScript 

// /Inserting One Data Using .save() method : in .save() you have to write a upon a JavaScript object Name For Example If you Want To create to pyhoms as a document so create a document and then write Object.save() method

const CreateDoc = async () => {
    try {
        const pyhoms = new Playlists({
            Name: "111",
            Videos: 120,
            Author: "CkDrametizzz",
            Email: "@Gmialmmmm.nb",
            Active: true
        })
        const result = await pyhoms.save()
        console.log(result)
    }
    catch (error) {
        console.log("Error : " + error)
    }
}
// CreateDoc()



// /Inserting more than one Data Using InsertMany() method : in InsertMany() you have to write a upon a Model name For Example If you Want To create to pyhoms as a document so create a document and then write CollectionName.InsertMany([ "Object Name" ]) method

const kdramas = async () => {
    try {

        const StartUp = new Playlists({
            Name: "StartUp",
            Videos: 140,
            Author: "CkDrametizzz",
            Active: true

        })

        const IOTNBK = new Playlists({
            Name: "StartUp",
            Videos: 30,
            Author: "CkDrametizzz",
            Active: true
        })

        const SG = new Playlists({
            Name: "StartUp",
            Vidoes: 03,
            Author: "CkDrametizzz",
            Active: true
        })

        const result = await Playlists.insertMany([StartUp, IOTNBK, SG])
        console.log(result);
    } catch (error) {

    }
}

// kdramas()


const ReadData = async () => {
    const result = await Playlists.find()
    console.log(result);
}

// ReadData()


//use find filter objects with operators

const readdata = async () => {

    // const result = await Playlists.find({ Author: { $in: ["CkDrametizzz"] }, Videos: { $gt: 20 } }).select({ Name: true, _id: false, Videos: true, Active: true }).count()
    const result = await Playlists.find({ $and: [{ Videos: { $gte: 02 } }, { Author: "CkDrametizzz" }] }).select({ Name: true, _id: false, Videos: true, Active: true }).sort({ Videos: 1 })

    console.log(result);
}

// readdata()


const UpdateData = async (_id) => {
    try {
        const result = await Playlists.findByIdAndUpdate({ _id }, {
            $set: {
                Name: "My Id Is Gungnaam Beauty Drama"
            }
        }, { new: true })

        console.log(result)
    } catch (error) {
        console.log("Error Occured : " + error)
    }

}

// UpdateData("6421b6ea435b838d16e89f01")


const deleteDocument = async (_id) => {
    try {

        const result = await Playlists.findByIdAndDelete({ _id })
        console.log("Object Deleted", result)


    } catch (error) {
        console.log(error)
    }

}
// deleteDocument("6422cb934b3b80801fffa382")






