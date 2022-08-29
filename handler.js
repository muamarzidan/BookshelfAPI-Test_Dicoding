const { nanoid } = require('nanoid');
const bukuku = require('../buku');

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

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;

    const newBook = {
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
    bukuku.push(newBook);
    const ifBerhasil = bukuku.filter((bukubuku) => bukubuku.id === id).length > 0;

   if (!ifBerhasil) {
    const response = h.response({
        status: "error",
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;``
    }
    const response = h.response({
            status: "success",
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            }
    });
        response.code(201);
        return response;
};


const lihatsemuaBukuWibu = (request, h) => {
    const {name, reading, finished} = request.query;
    if (name) {
        const nameBook = bukuku.filter((bukubuku) => bukubuku.name.toUpperCase().includes(name.toUpperCase()));
        const response = h.response({
            status: 'success',
                data: {
                books: nameBook.map((bukubuku) => ({
                    id: bukubuku.id,
                    name: bukubuku.name,
                    publisher: bukubuku.publisher,
                }))
            } 
        })
        response.code(200);
        return response;
    }
     if (reading) {
        const readBook = bukuku.filter((bukubuku) => Number(bukubuku.reading) === Number(reading));
        const response = h.response({
            status: 'success',
            data: {
                books: readBook.map((bukubuku) => ({
                    id: bukubuku.id,
                    name: bukubuku.name,
                    publisher: bukubuku.publisher,
                }))
            }
        })
        response.code(200);
        return response;
    }
    else if (finished) {
        const finishBook = bukuku.filter((bukubuku) => Number(bukubuku.finished) === Number(finished));
        const response = h.response({
            status: 'success',
            data: {
                books: finishBook.map((bukubuku) => ({
                    id: bukubuku.id,
                    name: bukubuku.name,
                    publisher: bukubuku.publisher,
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
                books: bukuku.map((bukubuku) => ({
                    id: bukubuku.id,
                    name: bukubuku.name,
                    publisher: bukubuku.publisher,
                }))
            }
        })
        return response;
    }
};

const lihatBukuidWibu = (request, h) => {
    const { bukuid } = request.params;

    const ifBerhasil = bukuku.filter((bukubuku) => bukubuku.id === bukuid)[0];

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
        response.code(200);
        return response;
    } 
};

const ubahBukuWibu = (request, h) => {
    const { bukuid } = request.params;
    const ifBerhasil = bukuku.findIndex((bukubuku) => bukubuku.id === bukuid);
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } 
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }  

    const updatedAt = new Date().toISOString();

    

    if (ifBerhasil !== -1) {
        bukuku[ifBerhasil] = {
            ...bukuku[ifBerhasil],
            name,year,author,summary,publisher,pageCount,readPage,reading,updatedAt,
        };
        const response = h.response ({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else if (ifBerhasil.bukuid === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
    
};

const hapusBukuWibu = (request, h) => {
    const { bukuid } = request.params;
    const ifBerhasil = bukuku.findIndex((bukubuku) => bukubuku.id === bukuid);
    if (ifBerhasil !== -1) {
        bukuku.splice(ifBerhasil, 1);
        const response = h.response({
            status: 'success',
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
