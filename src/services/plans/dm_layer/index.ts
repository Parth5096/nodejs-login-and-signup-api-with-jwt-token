// include plans model
const Plans = require('../api/schema/index.ts');

const PlanService={
    FindAll:()=>{
        return Plans.find();
    },

    Create:(req)=>{
         // create a plan
        let plan = new Plans(
            {
                name: req.body.name,
                price: req.body.price,
            }
        );
        return plan.save();

    },

    Details:(req)=>{
        return Plans.findById(req.params.id);
    },

    Update:(req)=>{
        return Plans.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return Plans.findByIdAndRemove(req.params.id);
    }

}

module.exports=PlanService;