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

const lihatsemuaBukuWibu = () => {
    if (mangga.length < 0) {
        return {
            status: 'sukses',
            data: [],
        };
    }
    return {
        status: 'sukses',
        data: {
            ...mangga.map((manggan) => {
                return {
                    manggaid: manggan.manggaid,
                    name: manggan.name,
                    publisher: manggan.publisher,
                };
            }),
        },
    };
}

const lihatBukuWibu = (request, h) => {
    const { manggaid } = request.params;

    const ifBerhasil = mangga.filter((manggan) => manggan.manggaid === manggaid)[0];

    if (ifBerhasil !== undefined) {
        return {
            status: 'sukses',
            data: {
                mangga: ifBerhasil
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

const ubahBukuWibu = (request, h) => {
    const { manggaid } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const ifBerhasil = mangga.findIndex((manggan) => manggan.manggaid === manggaid);

    if (!name) {
        const response = h.response({
            status: 'gagal',
            message: 'Gagal memperbarui mangga. Mohon isi nama mangga',
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'gagal',
            message: 'Gagal memperbarui mangga. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    } else if (manggaid === undefined) {
        const response = h.response({
            status: 'gagal',
            message: 'Gagal memperbarui mangga. Manggaid tidak ditemukan',
        });
        response.code(404);
        return response;
    }else if (ifBerhasil !== -1) {
        mangga[ifBerhasil] = {
            ...mangga[ifBerhasil],
            name,year,author,summary,publisher,pageCount,readPage,reading,createdAt,updatedAt,
        };
        const response = h.response ({
            status: 'success',
            message: 'Note has been updated',
        });
        response.code(200);
        return response;
    }
    const responses = h.response ({
        status: 'Failed',
        message: 'Note cannot be found',
    })
    responses.code(404);
    return responses;
    // const ifBerhasil = mangga.filter((manggan) => manggan.manggaid === manggaid)[0];
    // if (ifBerhasil !== undefined) {
    //     ifBerhasil.name = name;
    //     ifBerhasil.year = year;
    //     ifBerhasil.author = author;
    //     ifBerhasil.summary = summary;
    //     ifBerhasil.publisher = publisher;
    //     ifBerhasil.pageCount = pageCount;
    //     ifBerhasil.readPage = readPage;
    //     ifBerhasil.reading = reading;
    //     ifBerhasil.updatedAt = updatedAt;
    //     if (ifBerhasil.readPage >= ifBerhasil.pageCount) {
    //         ifBerhasil.finished = true;
    //     } else {
    //         ifBerhasil.finished = false;
    //     }
    //     return {
    //         status: 'sukses',
    //         data: {
    //             mangga: ifBerhasil
    //         },
    //     };
    // } else {
    //     const response = h.response({
    //         status: 'gagal',
    //         message: 'Mangga tidak ditemukan',
    //     });
    //     response.code(404);
    //     return response;
    // }
}


module.exports = { tambahBukuWibu, lihatsemuaBukuWibu, lihatBukuWibu, ubahBukuWibu };
