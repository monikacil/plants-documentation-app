import { PAGINATION_LIMIT } from "./constants";

export default async function getPageSearchParams(
  searchParams:
    | Promise<{
        query?: string;
        page?: string;
        sortBy?: string;
        order?: string;
      }>
    | undefined
) {
  const searchedParams = await searchParams;
  const query = searchedParams?.query || "";
  const currentPage = Number(searchedParams?.page) || 1;
  const limit = PAGINATION_LIMIT;
  const sortBy = searchedParams?.sortBy || undefined;
  const order = searchedParams?.order || "asc";
  let sort = undefined;
  if (sortBy) {
    sort = [{ key: sortBy, direction: order }];
  }

  return { query, currentPage, limit, sort };
}
