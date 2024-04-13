"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = async (email, password) => {

    let output = `
        <html>
        <head>
            <style type="text/css">
                * {
                    font-family: sans-serif;
                }
            </style>
        </head>
        <body style="background-color: #ebebeb"><br><br><br>
            <div style="background-color: #fff; width: 500px; margin: 5px auto; padding: 15px; border-radius: 5px; border: 3px solid rgb(218, 216, 216);">
                <h2>SpartaLeagues</h2><hr>
                <p>We heard that you lost your SpartaLEagues password. Sorry about that!</p><br>
                <p style="text-align: center;">
                    <a href="https://www.spartaleagues.com/update_password/${email}/${password}" style="padding:14px;color:white;border-radius:2px;background: #DE1E37;text-decoration: none;">Reset Password</a>
                </p><br>
                <p>If you didn't mean to reset your password, then you can just ignore this email your password will not change.</p>
                <p>Thanks,<br>SpartaLeagues.com</p><hr>
                <p style="text-align: center; font-size: 15px;">Copyright © 2018 spartaleagues.com</p>
            </div><br><br><br>
        </body>
        </html>
    `;

    return output;
};
//# sourceMappingURL=resetPassword.js.map