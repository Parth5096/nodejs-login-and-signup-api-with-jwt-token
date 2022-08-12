// include cart model
const Cart = require('./api/schema/index');

const CartService={
    FindAll:()=>{
        return Cart.find();
    },

    Create:(req)=>{
        // create a cart
        let cart = new Cart(
            {
                status: req.body.status,
                billingAddress: req.body.billingAddress,
                total: req.body.total,
            }
            
        );

        return cart.save();
    },

    Details:(req)=>{
        return Cart.findById(req.params.id);
    },

    Update:(req)=>{
        return Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
    },

    Delete:(req)=>{
        return  Cart.findByIdAndRemove(req.params.id);
    }
}

module.exports=CartService;