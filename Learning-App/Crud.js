const mongoose = require("mongoose")
const { Schema, } = mongoose;


mongoose.set("strictQuery", true)
let ConnectToMongo = () => {

    mongoose.connect("mongodb://127.0.0.1:27017/Youtube_CkDrametizzz?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2").then(
        () => { console.log("Connection Successful"); }
    ).catch((object) => { console.log(object) })
}
ConnectToMongo()

const playListSchema = new Schema({

    Title: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },
    Videos: {
        type: Number,
        required: true

    },
    Author: {
        type: String,
        default: "CkDrametizzz"
    },
    tags: {
        type: String,
        default: `#ckDrametizzz  #CkdrametizzEdits `
    }
    ,
    date: {
        type: Date,
        default: Date.now
    },
    Active: {
        type: Boolean,
        default: true
    }


})

const Playlist = mongoose.model("playlist", playListSchema)

const createPlaylist = async () => {

    try {


        const mgiaa = new Playlist({
            Title: "My girlfiend is an alien",
            Description: "This playlist have a shorts only on a drama name is :My girlfriend is an alien",
            Videos: 32
        })
        const pyhoms = new Playlist({
            Title: "Put Your Head On My Shoulder",
            Description: "This playlist have a shorts only on a drama name is : Put your head on my shoulder",
            Videos: 29

        })
        const vincenzo = new Playlist({
            Title: "Vincenzo",
            Description: "This playlist have a shorts only on a drama name is : vincenzo",
            Videos: 15

        })
        const startup = new Playlist({
            Title: "Start Up",
            Description: "This playlist have a shorts only on a drama name is : startup",
            Videos: 5

        })

        const result = await Playlist.insertMany([mgiaa, pyhoms, startup, vincenzo])
        console.log(result);

    } catch (error) {

        console.log(error);

    }
}

// createPlaylist() 


const getData = async () => {
    let result = await Playlist.find().sort({ Title: -1 })
    console.log(result);
}

// getData()




const updateData = async (title) => {
    try {

        let result = await Playlist.findOneAndUpdate({ Title: title }, {
            $set:
            {
                Title: "Put your head in my shoulder",
                Description: "This PlayList have a shorts only on a drama name is : Put your head in my shoulder"
            }
        }, { new: true })
        console.log(result)

    } catch (error) {
        console.log(error);
    }
}

// updateData("Put your head in my shoulder")


const deleteData = async (Title) => {

    try {

        let result = await Playlist.findOneAndDelete({ Title })
        console.log(result);

    } catch (error) {
        console.log(error);
    }

}

// deleteData("Start Up")