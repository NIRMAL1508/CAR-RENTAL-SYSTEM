const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
// const { v4: uuidv4 } = require("uuid");
// const stripe = require("stripe")(
//   "sk_test_51MmWAnSCvxlbRzsmFnxJ0V5BbL3Hp7wskTukZpq2fbo93mVQGYd052Wv8alzw1DwXw4NkM7Q4kPqr8WEo8wqTiOr00FwaBNcHm"
// );
router.post("/bookcar", async (req, res) => {
  // const { token } = req.body;
  // try {
  //   const customer = await stripe.customers.create({
  //     email: token.email,
  //     source: token.id,
  //   });

  //   const payment = await stripe.charges.create(
  //     {
  //       amount: req.body.totalAmount * 100,
  //       currency: "inr",
  //       customer: customer.id,
  //       receipt_email: token.email
  //     },
  //     {
  //       idempotencyKey: uuidv4(),
        
  //     }
  //   );

  //   if (payment) {
      // req.body.transactionId = payment.source.id;
      const b1=req.body;
      try{
        const c1 = await Booking.findOne({ car: b1.car });
      // console.log(b1.bookedTimeSlots.from);
      // console.log(c1)

      if(c1){
        const c2=c1.bookedTimeSlots.from;
        const c3=c1.bookedTimeSlots.to;
        const c4=b1.bookedTimeSlots.from;
        const c5=b1.bookedTimeSlots.to;
        // console.log(c2);
        // console.log(c3);
        // console.log(c4);
        // console.log(c5);
        if((c4>c2 && c4<c3) || (c5>c2 && c5<c3)){
          return res.status(400).json(error);
        }
      }
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
      }
      catch(error){
        return res.status(400).json(error);
      }
//     } else {
//       return res.status(400).json(error);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
 });


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


module.exports = router;


// This is your test secret API key.
// const stripe = require('stripe')('sk_test_51MmWAnSCvxlbRzsmFnxJ0V5BbL3Hp7wskTukZpq2fbo93mVQGYd052Wv8alzw1DwXw4NkM7Q4kPqr8WEo8wqTiOr00FwaBNcHm');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:4242';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));