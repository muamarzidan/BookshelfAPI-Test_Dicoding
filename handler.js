const { nanoid } = require('nanoid');
const buku = require('../mangga');

const tambahBukuWibu = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // buat reading jadi true atau false

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;

    const newBuku = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };
    buku.push(newBuku);
    const ifBerhasil = buku.filter((buk) => buk.id === id).length > 0;

   if (ifBerhasil) {
        const response = h.response({
            status: "success",
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            }
        });
        response.code(201);
        return response;
    } else {
        const response = h.response({
            status: "error",
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
};

const lihatsemuaBukuWibu = (request, h) => {
    const {name, reading, finished} = request.query;
    if (name) {
        const namebuku = buku.filter((bok) => bok.name.toUpperCase().includes(name.toUpperCase()));
        console.log(namebuku);
        const response = h.response({
            status: 'success',
                data: {
                books: namebuku.map((bok) => ({
                    bukuid: bok.id,
                    name: bok.name,
                    publisher: bok.publisher,
                }))
            } 
        })
        response.code(200);
        return response;
    }
     if (reading) {
        const readbuku = buku.filter((bok) => Number(bok.reading) === Number(reading));
        const response = h.response({
            status: 'success',
            data: {
                books: readbuku.map((bok) => ({
                    bukuid: bok.id,
                    name: bok.name,
                    publisher: bok.publisher,
                }))
            }
        })
        response.code(200);
        return response;
    }
    else if (finished) {
        const finishbuku = buku.filter((bok) => Number(bok.finished) === Number(finished));
        const response = h.response({
            status: 'success',
            data: {
                books: finishbuku.map((bok) => ({
                    bukuid: bok.id,
                    name: bok.name,
                    publisher: bok.publisher,
                }))
            }
        })
        response.code(200);
        return response;
    }
    else if (!name && !reading && !finished) {
        const response = h.response ({
            status: 'success',
            data: {
                books: buku.map((bok) => ({
                    bukuid: bok.id,
                    name: bok.name,
                    publisher: bok.publisher,
                }))
            }
        })
        response.code(200);
        return response;
    }
};

const lihatBukuidWibu = (request, h) => {
    const { bukuid } = request.params;

    const ifBerhasil = buku.filter((bok) => bok.id === bukuid)[0];

    if (!ifBerhasil) {
        const response = h.response({
            status: 'fail',
            message: "Buku tidak ditemukan"
        });
        response.code(404);
        return response;
    } else {
        const response = h.response({
            status: 'success',
            data: {
                book: ifBerhasil,            
            }
        });
        response.code(201);
        return response;
    } 
};

const ubahBukuWibu = (request, h) => {
    const {     bukuid } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    } 
    const createdAt = new Date().toISOString();  const updatedAt = createdAt;
    const ifBerhasil = buku.findIndex((bok) => bok.id === bukuid);

    if (ifBerhasil.bukuid === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }else if (ifBerhasil !== -1) {
        buku[ifBerhasil] = {
            ...buku[ifBerhasil],
            name,year,author,summary,publisher,pageCount,readPage,reading,createdAt,updatedAt,
        };
        const response = h.response ({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response ({
            status: 'fail',
            message: 'Gagal memperbarui buku',
        });
        response.code(500);
        return response;
    }
};

const hapusBukuWibu = (request, h) => {
    const { bukuid } = request.params;
    const ifBerhasil = buku.findIndex((bok) => bok.id === bukuid);
    if (ifBerhasil !== -1) {
        buku.splice(ifBerhasil, 1);
        const response = h.response({
            status: 'sukses',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    } else if (ifBerhasil.bukuid === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    } 
};


module.exports = { tambahBukuWibu, lihatsemuaBukuWibu, lihatBukuidWibu, ubahBukuWibu, hapusBukuWibu };
