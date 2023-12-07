const pool = require('../configs/db')

const insert = (data) => {
    const { nama, telepon, alamat, buah, qty, hargaTotal, id } = data
    return pool.query(`INSERT INTO customer(nama, telepon, alamat, buah, qty, harga, id_pembelian)VALUES('${nama}', '${telepon}', '${alamat}', '${buah}', '${qty}', ${hargaTotal}, '${id}')`)
}

const inputHarga = (hargaTotal, id) => {
    // const { harga, id } = data;
    return pool.query(`UPDATE customer SET harga = ${hargaTotal} WHERE id_pembelian = '${id}'`)
}

const get = () => {
    return pool.query(`SELECT * FROM customer`)
}

const getById = (id_pembelian) => {
    return pool.query(`SELECT * FROM customer WHERE id_pembelian = '${id_pembelian}'`)
}

module.exports = {
    insert,
    get,
    getById,
    inputHarga
}