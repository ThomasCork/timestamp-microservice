const express = require('express');
const app = express();

app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', function (req, res) {
    res.json({ message: 'Hello world' });
});

app.get('/api/timestamp/:date?', function (req, res) {
    let date = null;
    if (req.params.date) {
        date = new Date(req.params.date);

        if (date == 'Invalid Date') {
            return res.json({
                error: 'Invalid Date'
            });
        }
    } else {
        date = new Date();
    }

    return res.json({
        utc: date.toUTCString(),
        unix: date.getTime()
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Express is listening on port ${port} ...`);
})