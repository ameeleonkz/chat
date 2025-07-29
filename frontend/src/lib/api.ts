import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001' }),
  endpoints: (builder) => ({
    // Регистрация пользователя
    register: builder.mutation<{ token: string; user: { id: number; username: string } }, { username: string; password: string }>({
      query: (body) => ({
        url: 'api/auth/register',
        method: 'POST',
        body,
      }),
    }),
    // Логин пользователя
    login: builder.mutation<{ token: string; user: { id: number; username: string } }, { username: string; password: string }>({
      query: (body) => ({
        url: 'api/auth/login',
        method: 'POST',
        body,
      }),
    }),
    // Получение списка пользователей
    getUsers: builder.query<{ id: number; username: string }[], void>({
      query: () => 'api/users',
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUsersQuery,
} = api;