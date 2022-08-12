// include wallet model
const Wallet = require('../api/schema/index');

const walletService = {
    FindAll:()=>{
        return Wallet.find();
    },

    Create:(req)=>{
         // create a wallet
        let wallet = new Wallet(
            {
                address: req.body.address,
                user_id: req.body.user_id,
                currency_id: req.body.currency_id
            }
        );
        return wallet.save();
    },

    FindById:(req)=>{
        return Wallet.findOne(req.params.user_id);
    },

    Update:(req)=>{
        return  Wallet.findOneAndUpdate(req.params.user_id, {
            address: req.body.address,
            currency_id: req.body.currency_id
        }, {new: true});
    },

    Delete:(req)=>{
        return Wallet.findOneAndDelete(req.params.user_id);
    }
}

module.exports=walletService;