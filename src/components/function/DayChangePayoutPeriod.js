import { monthlyDay } from "../../reducks/store/fixedData"

export default function DayChangePayoutPeriod( date, payoutPeriod ) {
    console.log(date)
    console.log(payoutPeriod)
    if ( payoutPeriod === 30 || 60 ) {
        const next  = parseInt( payoutPeriod / 30 )
        console.log(next)
        const _month = Number( date.substr( 5, 2) ) + next
        const _year = Number( date.substr( 0, 4) )
        const month = NumberOfDigits( _month > 12 ? _month - 12 : _month, 2 )
        const year  = _month > 12 ? _year + 1 : _year
        console.log(month)
        const day   = monthlyDay[month - 1]
        return `${year}-${month}-${day}`
    } 

}

function NumberOfDigits (NUM, LEN) {
    return ( Array(LEN).join('0') + NUM ).slice( -LEN );
}