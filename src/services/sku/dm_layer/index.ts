// include sku model
const SKU = require('../api/schema/index.ts');

const SkuService = {
    FindAll:()=>{
        return  SKU.find();
    },

    Create:(req)=>{
        // create a sku
        let sku = new SKU(
            {
                name: req.body.name,
                description: req.body.description,
            }
        );
        return sku.save();
    },

    FindById:(req)=>{
        return SKU.findById(req.params.id);
    },
    
    Update:(req)=>{
        return SKU.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return  SKU.findByIdAndRemove(req.params.id);
    }
} 

module.exports=SkuService;