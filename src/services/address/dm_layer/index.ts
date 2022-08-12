// include address model
const Address = require('../api/schema/index.ts');

const AddressService = {
    FindAll:()=>{
        return Address.find();
    },
    
    Create:(req)=>{
        // create a address
        let address = new Address(
            {
                user_id:req.body.user_id,
                street1: req.body.street1,
                street2: req.body.street2,
                pincode: req.body.pincode,
                city: req.body.city,
                state:req.body.state,
            }
        );
        return Address.save();
    },

    Details:(req)=>{
        return Address.findById(req.params.id);
    },

    Updated:(req)=>{
        return Address.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return Address.findByIdAndRemove(req.params.id);
    }
}

module.exports=AddressService;


