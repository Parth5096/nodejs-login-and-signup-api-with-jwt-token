// include Admin model
const Admin = require('./api/schema/index');

const AdminService = {
    FindAll:()=>{
        return Admin.find();
    },

    Create:(req)=>{
        // create a admin
        let admin = new Admin(
            {
                accessLevel:req.body.accessLevel,
            }
        );
        return admin.save()
    },

    Details:(req)=>{
        return Admin.findById(req.params.id);
    },

    Update:(req)=>{
        return  Admin.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },
    Delete:(req)=>{
        return Admin.findByIdAndRemove(req.params.id);
    }
}

module.exports=AdminService;