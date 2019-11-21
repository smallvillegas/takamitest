var express = require('express');
var router = express.Router();
var sql = require('mssql');

const config = {
    user: 'springboot',
    password: 'springboot',
    server: "SKINN3T",
    database: 'demo',
    port: 1433
};

/* GET shield list. */
router.get('/', function (req, res, next) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        let sqlRequest = new sql.Request();
        let sq1Query = 'SELECT * FROM demo.dbo.SHIELD';
        sqlRequest.query(sq1Query, function (err, data) {
            if (err) console.log(err);
            console.table(data.recordset);
            res.send(data.recordset);
            sql.close();
        });
    });
});

/* GET shield create. */
router.get('/create/:im/:wec/:nfb/:nmfr/:ti/:dr/:dl', function (req, res, next) {
    const im = req.params.im;
    const wec = req.params.wec;
    const nfb = req.params.nfb;
    const nmfr = req.params.nmfr;
    const ti = req.params.ti;
    const dr = req.params.dr;
    const dl = req.params.dl;
    sql.connect(config, function (err) {
        if (err) console.log(err);
        const ps = new sql.PreparedStatement()
        ps.input('im', sql.VarChar(50));
        ps.input('wec', sql.Int);
        ps.input('nfb', sql.Int);
        ps.input('nmfr', sql.Int);
        ps.input('ti', sql.Int);
        ps.input('dr', sql.VarChar(10));
        ps.input('dl', sql.Int);
        ps.prepare('INSERT INTO demo.dbo.SHIELD ' +
            '(shiIdManufacturer,shiWattsEnergyConsumption,shiNewtonsForceBreakpoint,shiNewtonsMinimumForceReaction,shiTypeId,shiDateRelease,shiDaysLifetime) ' +
            'VALUES (@im,@wec,@nfb,@nmfr,@ti,@dr,@dl)', err => {
            console.log(err);
            ps.execute({im: im, wec: wec, nfb: nfb, nmfr: nmfr, ti: ti, dr: dr, dl: dl}, (err, result) => {
                console.log(err);
                res.send(result.rowsAffected);
                ps.unprepare(err => {
                    console.log(err);
                });
            });
        });
    });
});

/* GET shield edit. */
router.get('/edit/:id/:im/:wec/:nfb/:nmfr/:ti/:dr/:dl', function (req, res, next) {
    const id = req.params.id;
    const im = req.params.im;
    const wec = req.params.wec;
    const nfb = req.params.nfb;
    const nmfr = req.params.nmfr;
    const ti = req.params.ti;
    const dr = req.params.dr;
    const dl = req.params.dl;
    sql.connect(config, function (err) {
        if (err) console.log(err);
        const ps = new sql.PreparedStatement();
        ps.input('id', sql.Int);
        ps.input('im', sql.VarChar(50));
        ps.input('wec', sql.Int);
        ps.input('nfb', sql.Int);
        ps.input('nmfr', sql.Int);
        ps.input('ti', sql.Int);
        ps.input('dr', sql.VarChar(10));
        ps.input('dl', sql.Int);
        ps.prepare('UPDATE demo.dbo.SHIELD ' +
            'SET shiIdManufacturer = @im,shiWattsEnergyConsumption = @wec,shiNewtonsForceBreakpoint = @nfb,' +
            'shiNewtonsMinimumForceReaction = @nmfr,shiTypeId = @ti,shiDateRelease = @dr,shiDaysLifetime = @dl ' +
            'WHERE shiId = @id', err => {
            console.log(err);
            ps.execute({id: id, im: im, wec: wec, nfb: nfb, nmfr: nmfr, ti: ti, dr: dr, dl: dl}, (err, result) => {
                console.log(err);
                res.send(result.rowsAffected);
                ps.unprepare(err => {
                    console.log(err);
                });
            });
        });
    });
});

/* GET shield remove. */
router.get('/remove/:id', function (req, res, next) {
    const id = req.params.id;
    sql.connect(config, function (err) {
        if (err) console.log(err);
        const ps = new sql.PreparedStatement();
        ps.input('id', sql.Int);
        ps.prepare('DELETE FROM demo.dbo.SHIELD WHERE shiId = @id', err => {
            console.log(err);
            ps.execute({id: id}, (err, result) => {
                console.log(err);
                res.send(result.rowsAffected);
                ps.unprepare(err => {
                    console.log(err);
                });
            });
        });
    });
});

module.exports = router;
