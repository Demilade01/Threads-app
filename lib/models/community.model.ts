import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    id: {type : String, required: true,},
    username : {type : String, required: true, unique:true},
    name: {type : String, required: true},
    image: String,
    bio: String,
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
});

const Community = mongoose.models.User || mongoose.model('Community', communitySchema);

export default Community;