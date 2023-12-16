const checkoutModel = require('../models/checkout')
const {response} = require('../helpers/common')
const { sendGmail } = require('../helpers/mailer')

exports.insertCheckout = async(req, res) => {
    let harga = 0;
    const { nama, telepon, alamat, buah, qty, id_pembelian } = req.body
    if (buah === 'Anggur Merah' && data.qty === '0.25') {
        harga = 13500
      } else if (buah === 'Anggur Merah' && data.qty === '0.50'){
        harga = 24500
      } else if (buah === 'Anggur Hijau' && data.qty === '0.25'){
        harga = 19000
      } else if (buah === 'Anggur Hijau' && data.qty === '0.50'){
        harga = 36000
      } else if (buah === 'Anggur Hitam' && data.qty === '0.25'){
        harga = 14000
      } else if (buah === 'Anggur Hitam' && data.qty === '0.50'){
        harga = 26000
      } else if (buah === 'Pisang' | 'Mangga' | 'Melon' | 'Semangka' && data.qty === '0.50'){
        harga = 7000
      } else if (buah === 'Apel Fuji' && data.qty === '0.50'){
        harga = 25000
      } else if (buah === 'Apel USA' && data.qty === '0.50'){
        harga = 23000
      } else if (buah === 'Jeruk Sunkist' && data.qty === '0.50'){
        harga = 19000
      } else if (buah === 'Anggur Merah'){
        harga = 42000 * data.qty
      } else if (buah === 'Anggur Hijau'){
        harga = 72000 * data.qty
      } else if (buah === 'Anggur Hitam'){
        harga = 43000 * data.qty
      } else if (buah === 'Apel Fuji'){
        harga = 47000 * data.qty
      } else if (buah === 'Apel USA'){
        harga = 43000 * data.qty
      } else if (buah === 'Pisang' | 'Mangga' | 'Melon' | 'Semangka'){
        harga = 12000 * data.qty
      } else {
        harga = 19000 * data.qty
      }
        let data = { nama, telepon, alamat, buah, qty, harga, id_pembelian };
    try {
        let result = await checkoutModel.insert(data)
        // console.log(data);
        // console.log('masuk db');
        if(result){
            // await sendGmail( data.nama, data.telepon, data.alamat, data.buah, data.qty, data.harga, data.id_pembelian )
            return res.send({status: 200, message: 'success check email'})
        }
        response(res, data, 'success', 200, 'insert data checkout success')
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 400, 'insert data checkout failed')  
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