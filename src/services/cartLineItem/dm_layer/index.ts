// include cart model
const CartLine = require('./api/schema/index');

const CartLineService={
    FindAll:()=>{
        return CartLine.find();
    },

    Create:(req)=>{
        // create a cart
        let cartline = new CartLine(
            {
                quantity: req.body.quantity,
                skuId: req.body.skuId,
                priceData: req.body.priceData,
                weight: req.body.weight,
                options: req.body.options,
                lineItemType: req.body.lineItemType

            }
        );

        return cartline.save();
    },

    Details:(req)=>{
        return CartLine.findById(req.params.id);
    },

    Update:(req)=>{
        return CartLine.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return  CartLine.findByIdAndRemove(req.params.id);
    }
}

module.exports=CartLineService;