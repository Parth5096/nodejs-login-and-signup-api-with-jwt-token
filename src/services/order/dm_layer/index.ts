// include cart model
const Order = require('../api/schema/index.ts');

const OrderService = {
    FindAll: () => {
        return Order.find();
    },

    Create: (req) => {
        // create a order
        let order = new Order(
            {
                createDate: req.body.createDate,
                userId: req.body.userId,
                totals: req.body.totals,
                billingInfo: req.body.billingInfo,
                ShippingInfo: req.body.ShippingInfo,
                paymentStatus: req.body.paymentStatus,
                fulfilmentStatus: req.body.fulfilmentStatus,
                cartId: req.body.cartId,
                refunds: req.body.refunds,
            }
        );

        return order.save();
    },

    Details: (req) => {
        return Order.findById(req.params.id);
    },

    Update: (req) => {
        return Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
    },

    Delete: (req) => {
        return Order.findByIdAndRemove(req.params.id);
    }
}

module.exports = OrderService;
