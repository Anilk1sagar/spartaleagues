"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = async (payment_id, txnId, amount, competetionName) => {

    let output = `
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <style type="text/css">
                * {
                    font-family: sans-serif;
                }
                body {
                    background-color: #ebebeb;
                    color: #222;
                }
                .container {
                    width: 80%;
                    margin: 0 auto;
                    background-color: #fff;
                }
                .header {
                    height: 50px;
                    color: #fff;
                    padding: 15px 30px 15px 30px;
                    background-color: rgb(14,14,14);
                }
                .logo {
                    float: left;
                    font-size: 25px;
                    margin: 0;
                    line-height: 50px;
                }
                .content {
                    padding: 40px;
                }
        
                table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                    overflow-x:auto;
                }
        
                th {
                    color: #DE1E37;
                }
                th, td {
                    border: 1px solid #111;
                    padding: 15px;
                }
        
                footer {
                    color: #ebebeb;
                    padding: 2px;
                    background-color: rgb(14, 14, 14);
                }
                @media only screen and (max-width: 600px) {
                    .container {
                        width: 100%;
                    }
                    .header {
                        padding: 5px 10px 5px 10px;
                    }
                    .header h3, h2 {
                        font-size: 20px;
                    }
                    .address {
                        width: 100%;
                        float: none;
                    }
                    .invoice-total {
                        float: none;
                        width: 100%;
                    }
                    .amount {
                        font-size: 30px !important;
                    }
                }
            </style>
        </head>
        <body style="background-color: #ebebeb"><br>
            <div class="container">
                <div class="header">
                    <h3 class="logo">SpartaLeagues</h3>
                    <h2 style="float: right;margin: 0;line-height: 50px;">INVOICE</h2>
                </div>
                <div class="content">
                    <div>
                        <div style="float: left; margin-right: 100px;" class="address">
                            <h4 style="color: #555;">Billed To</h4>
                            S T Bed Layout, Koramangala,<br> 
                            Bengaluru, Karnataka<br>
                            Pin: 560047<br>
                            Contact: +91 7728055098
                        </div>
                        <div style="float: left;">
                            <h4 style="color: #555;">Payment Id</h4>
                            <span>${payment_id}</span><br><br>
                            <h4 style="color: #555;margin: 0;">Txn Id</h4>
                            <span>${txnId}</span>
                        </div>
                        <div style="float: right;" class="invoice-total">
                            <h4 style="color: #555;">Invoice Total</h4>
                            <span style="font-size: 50px;color: #DE1E37;" class="amount">₹${amount}.00</span>
                        </div>
                    </div><br>
                    <div style="clear: both;margin-top: 100px;"><br><br>
                        <table>
                            <tr>
                                <th>Description</th>
                                <th>Qty</th> 
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>${competetionName}</td>
                                <td>1</td>
                                <td>${amount}</td>
                            </tr>
                        </table>
                        <p>Thanks,<br>SpartaLeagues.com</p>
                    </div>
                </div>
                <footer>
                    <p style="text-align: center; font-size: 15px;">Copyright © 2018 spartaleagues.com</p>
                </footer>
            </div>
        </body>
        </html>
    `;

    return output;
};
//# sourceMappingURL=paymentInvoice.js.map