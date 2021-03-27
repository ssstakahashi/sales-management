import { useSelector } from 'react-redux';
import _ from 'lodash';

export default function FindSupplier(supplierId) {
  const selector = useSelector( state => state);
  const suppliersList = selector.suppliers.rows
  const obj = _.find(suppliersList, { supplierId })
  return obj ? obj : null
}