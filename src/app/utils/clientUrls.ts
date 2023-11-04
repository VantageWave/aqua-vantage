const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.HOSTNAME;

export const getCatalogsUrl = () => `/api/catalogs`;
export const getCatalogUrl = (id: string) => `/api/catalog/${id}`;
