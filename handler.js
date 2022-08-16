const { nanoid } = require('nanoid');
const joi = require('joi');
const mangga = require('./mangga');

const tambahBukuWibu = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();

    const BukuMangga = {
        manggaid: id,
        name: name.joi.string().required(),
        year: year,
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: pageCount,
        readPage: readPage,
        finished: false,
        reading: reading,
        insertedAt: insertedAt,
        updatedAt: insertedAt,
    };

    mangga.push(BukuMangga);

    const ifBerhasil = mangga.filter((mangga) => mangga.manggaid === id).length > 0;

    const finished = BukuMangga.readPage;
        if (finished >= BukuMangga.pageCount) {
            BukuMangga.finished = true;
        } else {
            BukuMangga.finished = false;
    }
    if (ifBerhasil) {
        const response1 = h.response({
            status: 'sukses masehh',
            message: 'Mangga berhasil ditambahkan',
            data: BukuMangga
        });
        response1.code(201);
        return response1;
    } else if (BukuMangga.name == decValue) {
        const response3 = h.response({
            status: 'gagal',
            message: 'Nama harus di isi, mohon isi nama terlebih dahulu',
        });
        response3.code(400);
        return response3;
    } else {
        const response3 = h.response({
            status: 'gagal masehh',
            message: 'Mangga gagal ditambahkan',
        });
        response3.code(500);
        return response3;
    }
}



module.exports = { tambahBukuWibu };