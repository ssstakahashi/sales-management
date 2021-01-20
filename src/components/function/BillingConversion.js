export default function BillingConversion( number, taxIncluded) {
    if ( taxIncluded ) {
        return parseInt(number)
    } else {
        return parseInt(number )
    }
    
}
