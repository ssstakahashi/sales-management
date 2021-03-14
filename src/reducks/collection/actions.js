export const COLLECTIONS_INPUT = "COLLECTIONS_INPUT";

export function CollectionInputAction(collectionsData) {
  return {
    type    : "COLLECTIONS_INPUT",
    payload : collectionsData,
  }
};