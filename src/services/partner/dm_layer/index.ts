// include address model
const Partner = require('../api/schema/index.ts');

const PartnerService = {
    FindAll:()=>{
        return Partner.find();
    },

    Create:(req)=>{

    },

    Details:(req)=>{
        return Partner.findById(req.params.id);
    },

    Update:(req)=>{
        return Partner.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return Partner.findByIdAndRemove(req.params.id);
    }

}

module.exports=PartnerService;