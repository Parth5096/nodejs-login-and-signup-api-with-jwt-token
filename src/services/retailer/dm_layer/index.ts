const Retailer=require('../api/schema/index.ts');


const retailerService={
    FindAll:()=>{
        return Retailer.find();
    },
    
    Create:(req)=>{
        let retailer=new Retailer({
            userID:req.body.userID,
            gst_num:req.body.gst_num,
            address:req.body.address,

        });
        return retailer.save();
    },

    FindById:(req)=>{
        return Retailer.findById(req.params.id);
    },

    Update:(req)=>{
        return Retailer.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            /* {new:true}); */
    },

    Delete:(req)=>{
        return Retailer.findByIdAndRemove(req.params.id);
    }
}

module.exports=retailerService;