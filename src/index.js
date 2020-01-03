const {Command, flags} = require('@oclif/command')
const moment = require('moment')
const business = require('moment-business')

const getQuote = require('./lib/quote')

const newYear = '01/01'
const laborDay = '01/05'
const constitutionDay = '18/07'
const independenceDay = '25/08'
const chrismas = '25/12'
const newYearEve = '31/12'

const holidays = [
  newYear,
  laborDay,
  constitutionDay,
  independenceDay,
  chrismas,
  newYearEve,
]

class BcuCommand extends Command {
  async run() {
    const {flags} = this.parse(BcuCommand)
    const lastDayOfPreviousMonth =
        moment()
        .subtract(1, 'months')
        .endOf('month')

    const date = flags.date || this.findLastBusinessDay(lastDayOfPreviousMonth).format('DD/MM/YYYY')

    try {
      const {data} = await getQuote(date)
      this.log(data.cotizacionesoutlist.Cotizaciones[0].TCC)
    } catch (error) {
      this.log('There was an error getting the quote')
    }
  }

  isHoliday(date) {
    return holidays.some(holiday => date.format('DD/MM') === holiday)
  }

  isBusinessDay(date) {
    return business.isWeekDay(date)
  }

  findLastBusinessDay(date) {
    if (!this.isHoliday(date) && this.isBusinessDay(date)) return date
    return this.findLastBusinessDay(this.previousDay(date))
  }

  previousDay(date) {
    return date.subtract(1, 'day')
  }
}

BcuCommand.description = 'Get dolar quote from bcu.'

BcuCommand.flags = {
  version: flags.version({char: 'v'}),
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = BcuCommand
