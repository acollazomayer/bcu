const axios = require('axios')

const getQuote = date => {
  return axios.post('https://www.bcu.gub.uy/_layouts/BCU.Cotizaciones/handler/CotizacionesHandler.ashx?op=getcotizaciones', {
    KeyValuePairs: {
      Monedas: [{Val: '2225', Text: 'DLS. USA BILLETE'}],
      FechaDesde: date,
      FechaHasta: date,
      Grupo: '2',
    },
  })
}

module.exports = getQuote
