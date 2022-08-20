const { tambahBukuWibu, lihatsemuaBukuWibu, lihatBukuidWibu, ubahBukuWibu, hapusBukuWibu} = require('../api_handler/handler');

const routes = [

    {
        method: 'POST',
        path: '/boook',
        handler: tambahBukuWibu,
    },
    {
        method: 'GET',
        path: '/boook',
        handler: lihatsemuaBukuWibu,
    },
    {
        method: 'GET',
        path: '/boook/{bukuid}',
        handler: lihatBukuidWibu,
    },
    {
        method: 'PUT',
        path: '/boook/{bukuid}',
        handler: ubahBukuWibu,
    },
    {
        method: 'DELETE',
        path: '/boook/{bukuid}',
        handler: hapusBukuWibu,
    },
]

module.exports = routes;