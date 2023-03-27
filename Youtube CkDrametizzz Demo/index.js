const mongoose = require("mongoose")

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
        required: true
    },
    Videos: Number,
    Author: String,
    Active: Boolean,
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
            Name: "Put Your Head On My Shoulder",
            Videos: 120,
            Author: "CkDrametizzz",
            Active: true
        })
        const result = await pyhoms.save()
        console.log(result)
    }
    catch (error) {
        console.log("Error" + error)
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
            Name: "Its okay To Not Be Okay",
            Videos: 30,
            Author: "CkDrametizzz",
            Active: true
        })

        const SG = new Playlists({
            Name: "Squid Game",
            Vidoes: 03,
            Author: "CkDrametizzz",
            Active: true
        })

        const result = await Playlists.insertMany([StartUp, IOTNBK, SG])
        console.log(result);
    } catch (error) {

    }
}

kdramas()


const ReadData = async () => {
    const result = await Playlists.find()
    console.log(result);
}

// ReadData()










