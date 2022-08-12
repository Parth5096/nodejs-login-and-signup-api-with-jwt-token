// include serviceProviders model
const ServiceProvider = require('../api/schema/index.ts');

const spService = {
    FindAll:()=>{
        return  ServiceProvider.find();
    },

    Create:(req)=>{
        // create a serviceProvider
        let serviceProvider = new ServiceProvider(
            {
                serviceType: req.body.serviceType,
                name: req.body.name,
                address: req.body.address,
            }
        );
        return serviceProvider.save();
    },

    FindById:(req)=>{
        return ServiceProvider.findById(req.params.id);
    },
    
    Update:(req)=>{
        return ServiceProvider.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return  ServiceProvider.findByIdAndRemove(req.params.id);
    }
} 
module.exports = spService;
