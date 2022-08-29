const { tambahBukuWibu, lihatsemuaBukuWibu, lihatBukuidWibu, ubahBukuWibu, hapusBukuWibu} = require('../api_handler/handler');

const routes = [

    {
        method: 'POST',
        path: '/books',
        handler: tambahBukuWibu,
    },
    {
        method: 'GET',
        path: '/books',
        handler: lihatsemuaBukuWibu,
    },
    {
        method: 'GET',
        path: '/books/{bukuid}',
        handler: lihatBukuidWibu,
    },
    {
        method: 'PUT',
        path: '/books/{bukuid}',
        handler: ubahBukuWibu,
    },
    {
        method: 'DELETE',
        path: '/books/{bukuid}',
        handler: hapusBukuWibu,
    },
]

module.exports = routes;