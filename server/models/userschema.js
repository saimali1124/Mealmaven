const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: { 
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    activity: [
    {
        foodIntake: {
            type: String,
            required: true
        },
	    steps: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
            }
        }
    ],
    tokens: [
        {
            token: {
                type:String,
                required:true
            }
        }
    ],
    hasPremiumAccess: {
        type: Boolean,
        required:false
    }
});

userschema.methods.generateAuthToken = async function () {
    try {
        let token2 = jwt.sign({_id:this._id}, process.env.SECRET_KEY );
        this.tokens = this.tokens.concat({token:token2});
        await this.save();
        return token2;
    } catch(err) {
        console.log(err);
    }
}

userschema.methods.addAct = async function(foodIntake, steps) {
    try {
        this.activity = this.activity.concat({foodIntake, steps});
        await this.save();
        return this.activity;
    } catch(error){
        console.log(error);
    }
}


const User = mongoose.model('USER', userschema);

module.exports = User;