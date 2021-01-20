export default function ConsumptionTax( taxIncluded, totalAmount ) {
  if ( taxIncluded ) {
    return parseInt( totalAmount - ( totalAmount / 1.1 ) )
  } else {
    return parseInt( totalAmount * 0.1 )
  }
}
