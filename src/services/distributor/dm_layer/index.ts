const Distributor=require('../api/schema/index.ts');

const distributorService={
    FindAll:()=>{
        return Distributor.find();
    },

    Create:(req)=>{
        let distributor=new Distributor({
            userID:req.body.userID,
            gst_num:req.body.gst_num,
            

        });
        return distributor.save();
    },

    Details:(req)=>{
        return Distributor.findById(req.params.id);
    },

    Update:(req)=>{
        return Distributor.findByIdAndUpdate(req.params.id,{
            $set:req.body},{new:true});
            
        
    },

    Delete:(req)=>{
        return Distributor.findByIdAndDelete(req.params.id);
    }
}

module.exports=distributorService;
