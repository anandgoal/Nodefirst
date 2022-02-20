let express = require('express');
let router = express.Router();
let Prepaid = require('./../model/Prepaid');
let check = require('./../lib/checkLib');
let PaymentModel = require('./../model/payment')
let auth = require('../middleware')
/************Prepaid API load************************* */
router.route('/api/prepaid/register')
      .post((req,res)=>{
        console.log('api hit')
        if(!req.body.cardNo || !req.body.mobileNo || ! req.body.emailId) {
          res.status(200).json({
            success: false,
            msg: "Please enter all the details"
          })
        } else {
          let prepaidData = new Prepaid({
            cardNo: req.body.cardNo,
            mobileNo: req.body.mobileNo,
            emailId: req.body.emailId,
            merchant: res.locals.id
          });
          prepaidData.save()
            .then((prepaidData) => {
              res.status(200).json({success: true, msg: 'your card is issued, you can load card  to use it.',data: prepaidData})
              // res.status(200).json({success: true, msg: 'Data Saved',data: prepaidData})
            })
            .catch((err)=>{
              if(err.code == 11000) {
                var msg = '';
                if(err.message.includes("cardNo")) {
                  msg = "Card alreday exist. Please enter different card"
                } else {
                  msg = "Mobile Number alreday exist. Please enter different Mobile Number"
                }
                res.status(200).json({
                  success: false,
                  msg: msg
                })
              } else {
                res.status(200).json({success: false, msg:err.message})
              }
            })
          }
      });

/************Prepaid API sell************************* */
router.route('/api/prepaid/sell')
      .post( (req,res) => {
          let amt = req.body.amount;
          var query = {};
          if(req.body.id.length > 10) {
            query.cardNo = req.body.id
          } else {
            query.mobileNo = req.body.id
          }
          Prepaid.findOne(query, function(err, data) {
            if(err) {
              console.log(err)
            } else {
              if(data) {
                console.log(data, data.amount, amt, "this si amoutns")
                if(data.amount > amt){
                  data.amount = data.amount - amt
                  data.save(function(err, finalData) {
                    if(err) {
                      console.log(err)
                    } else {
                      res.status(200).json({
                        success: true,
                        msg: `You have paid ${amt}. Remaining amount is ${finalData.amount}`
                      });
                      let paymentData = new PaymentModel({
                        cardNo: data.cardNo,
                        type: 'sell',
                        amount: amt
                      })
                      paymentData.save(function(err, paymentUpdate){
                        if(err){
                          console.log(err);
                        }else {
                          console.log(paymentUpdate);     
                        }
                      });                            
                    }
                  });
                }else {
                  res.status(200).json({success: false, msg:'insufficient balance'})
                } 
              } else {
                res.status(200).json({success: true, msg: "No card found"})
              }
            }
          });
      });

router.route('/api/prepaid/balance')
  .post((req,res)=>{
    var query = {};
    if(req.body.id && req.body.id.length > 10) {
      query.cardNo = req.body.id;
    } else {
      query.mobileNo = req.body.id;
    }
    Prepaid.findOne(query, function(err, fetchedDetails){
      if(err){
        res.status(200).json({success: false, msg: err})
    }else {
        console.log(fetchedDetails) 
        res.status(200).json({success: true, data: fetchedDetails.amount});
      }
    });
});

router.route('/api/prepaid/load').post((req, res) => {
  var query = {};
  var amt = req.body.amount;
  if(req.body.id && req.body.id.length > 10) {
    query.cardNo = req.body.id
  } else {
    query.mobileNo = req.body.id
  }
  Prepaid.findOne(query, function(err, data) {
    if(err) {
      res.status(200).json({
        success: false,
        err: err
      })
    } else {
      if(data) {
        data.amount = data.amount + amt;
        data.save(function(err, fetchedDetails) {
          if(err) {
            res.status(200).json({
              success: false,
              msg: err
            })
          } else {
            res.status(200).json({
              success: true,
              msg: `Your card has been loaded. Your total amount is ${fetchedDetails.amount}`
            });
            let paymentData = new PaymentModel({
              cardNo: fetchedDetails.cardNo,
              type: 'add',
              amount: amt
            })
            paymentData.save(function(err, paymentUpdate){
              if(err){
                console.log(err);
              }else {
                console.log(paymentUpdate)     
              }
            });
          }
        })
      } else {
        res.status(200).json({
          success: false,
          msg: "No card found"
        })
      }
    }
  })
})

router.route('/api/prepaid/list').get(function(req, res) {
  console.log('api called')
  var query = {};
  if(res.locals.id) {
    query.merchant = res.locals.id
  }
  console.log(query);
  Prepaid.find(query, function(err, data) {
    if(err) {
      res.status(200).json({
        success: false,
        msg: "Something went wrong",
        err: err.message
      })
    } else {
      if(data.length > 0) {
        res.status(200).json({
          success: true,
          data: data
        })
      } else {
        res.status(200).json({
          success: true,
          msg: "No cards found"
        })
      }
    }
  })
})

module.exports = router;