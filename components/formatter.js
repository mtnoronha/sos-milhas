const numberFormatter = new Intl.NumberFormat('pt-BR')
const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default {
    formatNumber: (number) => {
        return numberFormatter.format(number);
    },
    formatCurrency: (value) => {
        return currencyFormatter.format(value);
    }
}
