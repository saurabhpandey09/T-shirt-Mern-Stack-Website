const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "pyngnbcbzdj73cmw",
    publicKey: "hsbw6mhcy7kftdsj",
    privateKey: "bfcbbe31a93c4c287e7596b17c0de05d"
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    });
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.boxy.amount;

    gateway.transaction.sale({
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        }),
        function (err, result) {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        }

}