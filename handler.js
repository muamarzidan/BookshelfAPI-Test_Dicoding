const { nanoid } = require('nanoid');
const mangga = require('./mangga');

const tambahBukuWibu = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();

    const newBukuMangga = {
        manggaid: id,
        name: name,
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
    
    mangga.push(newBukuMangga);

    const ifBerhasil = mangga.filter((mangga) => mangga.manggaid === id).length > 0;

    const finished = newBukuMangga.readPage;
        if (finished >= newBukuMangga.pageCount) {
            newBukuMangga.finished = true;
        } else {
            newBukuMangga.finished = false;
    }
    if (!newBukuMangga.name) {
        const response3 = h.response({
            status: 'gagal',
            message: 'Nama harus di isi, mohon isi nama terlebih dahulu',
        });
        response3.code(400);
        return response3;
    } else if (newBukuMangga.readPage > newBukuMangga.pageCount) {
        const response4 = h.response({
            status: 'gagal',
            message: 'Buku yang dibaca melebihi jumlah halaman buku, anda mengarang???',
        });
        response4.code(400);
        return response4;

    } else if (ifBerhasil) {
        const response1 = h.response({
            status: 'sukses masehh',
            message: 'Mangga berhasil ditambahkan',
            data: newBukuMangga
        });
        response1.code(201);
        return response1;
    } else {
        const response3 = h.response({
            status: 'gagal masehh',
            message: 'Mangga gagal ditambahkan',
        });
        response3.code(500);
        return response3;
    }
}

const lihatsemuaBukuWibu = () => ({
        status: 'sukses',
            data: {
                mangga: mangga,
        },
});

const lihatBukuWibu = (request, h) => {
    const { manggaid } = request.params;

    const ifBerhasil = mangga.filter((manggan) => manggan.manggaid === manggaid)[0];

    console.log(yy);
    if (ifBerhasil !== undefined) {
        return {
            status: 'sukses',
            data: {
                manggaid: mangga.manggaid,
                name: mangga.name,
                publisher: mangga.publisher,
            },
        };
    } else {
        const response = h.response({
            status: 'gagal masseh',
            message: 'Mangga tidak ditemukan',
        });
        response.code(404);
        return response;
    } 
}


module.exports = { tambahBukuWibu, lihatsemuaBukuWibu, lihatBukuWibu };
