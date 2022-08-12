// include Manufacturer model
const Manufacturer = require('../api/schema/index.ts');

const manufacturerService ={
    FindAll:()=>{
        return Manufacturer.find();
    },
    
    Create:(req)=>{
        
    },

    Details:(req)=>{
        return Manufacturer.findById(req.params.id);
    },

    Update:(req)=>{
        return Manufacturer.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return Manufacturer.findByIdAndRemove(req.params.id);
    }
}

module.exports=manufacturerService;