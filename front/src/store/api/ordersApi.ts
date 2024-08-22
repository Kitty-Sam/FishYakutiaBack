import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetOrders } from '@/interfaces';

export const ordersApi = createApi({
  reducerPath: 'orderApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrders, number>({
      query: (page) => `/orders?page=${String(page)}`,
      providesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
