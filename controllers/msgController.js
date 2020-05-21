const axios = require("axios");

exports.sendMessage = async (req, res, next) => {
    try {
        console.log(req.body);
        let { message, phnNumber, orderID } = req.body;
        console.log(message.toString('ucs2be'));
        var Buffer = require('buffer').Buffer;
        var Iconv = require('iconv').Iconv;

        var iconv = new Iconv('UTF-8', 'UCS-2BE');
        var buffer = iconv.convert(message);

        console.log("Unicode :", buffer.toString().toUpperCase());
        var apiEnd = 'https://sms.sslwireless.com/pushapi/dynamic/server.php';
        let payload = "user=" + encodeURI(process.env.user) + "&pass=" + encodeURI(process.env.pass) + "&sid=" +
            encodeURI(process.env.sid) + "&sms[0][0]=" + `${phnNumber}` + "&sms[0][1]=" + encodeURI(`${buffer.toString().toUpperCase()}`) + " & sms[0][2]=" + `${orderID}` + "";
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