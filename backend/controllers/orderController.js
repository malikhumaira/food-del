import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order for frontend

const placeOrder = async (req, res) => {

    const frontendUrl = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        // after saving, to clear the cartData we will send  an empty object
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}})

        // creating payment link using Stripe
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency: euro,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*.93              
            },
            quantity: item.quantity
        }))
        // to add delivery charges
        line_items.push({
            price_data: {
                currency: euro,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 4.50*100*.93
            },
            quantity: 1
        })

        const session = await Stripe.checkout.sessions.create({
            line_items : line_items,
            mode: 'payment',
            successUrl : `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancelUrl : `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {placeOrder}