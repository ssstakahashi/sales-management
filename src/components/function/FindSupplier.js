import { useSelector } from 'react-redux';
import _ from 'lodash';

export default async function FindSupplier(supplierId) {
  const selector = useSelector( state => state);
  const suppliersList = selector.suppliers.rows
  const obj = await _.find(suppliersList, { supplierId })
  return obj ? await obj : null
}