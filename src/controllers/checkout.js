const checkoutModel = require('../models/checkout')
const {response} = require('../helpers/common')
const { sendGmail } = require('../helpers/mailer')

exports.insertCheckout = async(req, res) => {
    const { nama, telepon, alamat, buah, qty, hargaTotal, id } = req.body
    const data = { nama, telepon, alamat, buah, qty, hargaTotal, id };
    try {
        let result = await checkoutModel.insert(data)
        console.log('masuk db');
        if(result){
            await sendGmail( data.nama, data.telepon, data.alamat, data.buah, data.qty, data.harga, data.id_pembelian )
            return res.send({status: 200, message: 'success check email'})
        }
        response(res, data, 'success', 200, 'insert data checkout success')
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 400, 'insert data checkout failed')  
    }
}

exports.insertPrice = async(req, res) => {
    const idPembelian = req.body.id;
    const hargaTotal = req.body.harga;
    // const data = { harga, id };
    try {
        console.log('belum masuk db');
        console.log(hargaTotal);
        await checkoutModel.inputHarga(hargaTotal, idPembelian);
        console.log('harga masuk db');
        response(res, null, 'success', 200, 'insert data price success')
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 400, 'insert data price failed')
    }
}

exports.getCheckout = async(req,res) => {
    try {
        const {rows} = await checkoutModel.get();
        response(res, rows, 'success', 200, 'Get data checkout success')
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 400, 'Get data checkout failed')
    }
}

exports.getCheckoutById = async(req,res) => {
    try {
        const id = req.body.id;
        console.log(id);
        const { rows } = await checkoutModel.getById(id);
        const order = rows[0]
        console.log(order.nama);
        response(res, rows, 'success', 200, 'Get data checkout by Id success')
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 400, 'Get data checkout failed')  
    }
}