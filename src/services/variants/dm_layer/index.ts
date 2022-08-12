// include variants model
const Variants = require('../api/schema/index.ts');

const variantService = {
    FindAll:()=>{
        return Variants.find();
    },

    Create:(req)=>{
         // create a variants
        let variants = new Variants(
            {
                name: req.body.variantName,
                skuName: req.body.skuName,
            }
        );
        return variants.save();
    },

    FindById:(req)=>{
        return Variants.findById(req.params.id);
    },

    Update:(req)=>{
        return  Variants.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return Variants.findByIdAndRemove(req.params.id);
    }
}

module.exports=variantService;