// include user model
const User = require('../api/schema/index.ts');

const UserService = {
    FindAll:()=>{
        return  User.find().populate('addresses');
    },

    Create:(req)=>{
        // create a user
        let user = new User(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobileNo: req.body.mobileNo,
            }
        );
        return user.save();
    },

    FindById:(req)=>{
        return User.findById(req.params.id);
    },
    
    Update:(req)=>{
        return User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return User.findByIdAndRemove(req.params.id);
    }
} 

module.exports=UserService;