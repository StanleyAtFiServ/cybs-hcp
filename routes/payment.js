
const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const security = require('../middleware/security');

// Render payment form
router.get('/', (req, res) => {
    res.render(
        'payment_form', 
        {
            transactionUuid: uniqid(),
            signedDateTime: getGMTDateString(),
            accessKey: security.getAccessKey(), 
            profileId: security.getProfileId() 
        }
    );
});

// Payment confirmation handler
router.post('/payment/confirm', (req, res) => {
    const params = { ...req.body };
    
   
    // Generate signature
    params.signature = security.sign(params);
    
    res.render(
        'payment_confirmation', 
        {
            title: 'Secure Acceptance - Payment Confirmation',
            params: params,
            cybersourceUrl: 'https://testsecureacceptance.cybersource.com/pay'
        }
    );
});

router.get('/receipt', (req, res) => {
    const transactionData = {
        txn_id: req.query.txn_id || 'N/A',
        amount: req.query.amount || 'N/A',
        currency: req.query.currency || 'USD',
        status: req.query.status || 'completed',
        date: new Date().toLocaleString()
    };

    // Optional: Verify transaction with database/payment processor
    // await verifyTransaction(req.query.txn_id);
    
    res.render('receipt', { 
        title: 'Payment Receipt',
        transaction: transactionData,
        layout: 'layout' // If using a layout template
    });
});


function uniqid() {
    const hrtime = process.hrtime();
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const microtime = hrtime[1] / 1000; // Convert nanoseconds to microseconds
    return `${timestamp.toString(16)}${Math.floor(microtime).toString(16)}`;
}


function getGMTDateString() {
    const date = new Date();
    const sDate = date.getUTCFullYear() + '-' +
      String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
      String(date.getUTCDate()).padStart(2, '0') + 'T' +
      String(date.getUTCHours()).padStart(2, '0') + ':' +
      String(date.getUTCMinutes()).padStart(2, '0') + ':' +
      String(date.getUTCSeconds()).padStart(2, '0') + 'Z';
    return (sDate);
  }
module.exports = router;



