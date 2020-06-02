const axios = require("axios");

exports.sendMessage = async (req, res, next) => {
    try {
        console.log(req.body);
        let { message, phnNumber, orderID } = req.body;

        // const punycode = require('punycode');
        // let unicode = punycode.ucs2.decode('ধ');

        // const unicode = message.split("").map((v, i) => { return message.charCodeAt(i) });
        // console.log(unicode.join(""));
        // console.log('\\u' + parseInt(unicode, 16));
        const hex = new Buffer.from(message).toString('hex');

        console.log(hex.toUpperCase());

        var apiEnd = 'https://sms.sslwireless.com/pushapi/dynamic/server.php';
        let payload = "user=" + encodeURI(process.env.user) + "&pass=" + encodeURI(process.env.pass) + "&sid=" +
            encodeURI(process.env.sid) + "&sms[0][0]=" + `${phnNumber}` + "&sms[0][1]=" + encodeURI(`${hex.toUpperCase()}`) + " & sms[0][2]=" + `${orderID}` + "";
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