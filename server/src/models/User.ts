import mongoose  , {Schema , Document} from 'mongoose';

export interface Iuser extends Document{

    name : string;
    email : string;
    password?: string;
    role : 'youtuber '| 'User';
    avatarurl?: string;
    googleId?: string;
    editorrating? : {
     average : number;
     totaolreviews: number;};

    

createdAt?: Date;
updatedAt?: Date;




}

const userSchema : Schema = new Schema<Iuser>({

    name : {
        type : String ,
        required: true,
        trim: true,
    },
    
  email: {
    type : String, 
    required: true,
    unique: true,
    trim : true,
    lowecase : true,
  }
  , password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['youtuber', 'User'],
    default: 'User',
  },
  avatarurl: {
    type: String,
  },        
  googleId: {
    type: String,
    },
    editorrating: { 
        average: {
            type: Number,   


            default: 0,
        },
        totaolreviews: {
            type: Number,
            default: 0,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model<Iuser>('User', userSchema);

export default mongoose.models.User|| mongoose.model<Iuser>('User', userSchema)  ;