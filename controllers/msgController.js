const axios = require("axios");
const sms = require('ssl-wireless-sms-send');


exports.sendMessage = async (req, res, next) => {
    try {
        console.log(req.body);
        let { message, phnNumber, orderID } = req.body;

        let unicode = sms.bengaliToUnicode(message);

        var apiEnd = 'https://sms.sslwireless.com/pushapi/dynamic/server.php';
        let payload = "user=" + encodeURI(process.env.user) + "&pass=" + encodeURI(process.env.pass) + "&sid=" +
            encodeURI(process.env.BanglaSid) + "&sms[0][0]=" + `${phnNumber}` + "&sms[0][1]=" + encodeURI(`${unicode}`) + " & sms[0][2]=" + `${orderID}` + "";
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        try {
            const response = await axios.post(apiEnd, payload);
            console.log(response.data);
            res.send("ok");
        } catch (error) {
            console.log(error);
            res.send("Not Ok");
        }
        res.status(200);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// exports.sendMessageGet = async (req, res, next) => {
//     try {
//         let unicode = sms.bengaliToUnicode("ধন্যবাদ");
//         console.log(unicode);

//         var apiEnd = "https://sms.sslwireless.com/pushapi/dynamic/server.php";
//         axios.get(apiEnd, {
//             params: {
//                 user: 'v2tech',
//                 pass: 'k=12B258',
//                 msisdn: '01746094342',
//                 sms: `${unicode}`,
//                 sid: `${process.env.BanglaSid}`,
//                 csmsid: "321"
//             }
//         })
//             .then(function (response) {
//                 console.log("response:");
//                 console.log(response.data);
//             })
//             .catch(function (error) {
//                 console.log("error:");
//                 console.log(error);
//             });
//         res.status(200);
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err);
//     }
// };
