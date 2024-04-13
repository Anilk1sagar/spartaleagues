"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = async (name, email, gameRank, steamProfile) => {

    let output = `
        <h3>You are invited</h3>
        <p>He want you to be in his team for participating SpartaLeagues esport competetion.
            <br><br>
            <strong>Detailes:</strong><br><br>
            <strong>Name: </strong> ${name}<br>
            <strong>Email: </strong> ${email}<br>
            <strong>Game Rank: </strong> ${gameRank}<br>
            <strong>Steam: </strong> <a href="${steamProfile}">Steam Profile</a><br>
        </p>
        <p>
            For accept invitation you have to register with us and participate.<br><br>
            <a href="http://www.spartaleagues.com/resgister" 
            style="padding:10px;
                    color:white;
                    border-radius:2px;
                    background: #007bff;
                    text-decoration: none;">Accept</a>
        </p><br>
        <p>Thanks,<br>SpartaLeagues.com</p>
    `;

    return output;
};
//# sourceMappingURL=teamInvite.js.map