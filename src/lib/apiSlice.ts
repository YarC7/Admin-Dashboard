import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendURL } from "./action/authAction";

export interface Book {
  _id: string;
  title: string;
  publisher: string;
  quantity: number;
  state: number;
  publish_year: number;
  price: number;
  image: string;
  description: string;
  year: string;
  author: string;
  genre: string;
  rating?: number;
  stockQuantity: number;
}

export interface NewBook {
  title: string;
  publisher: string;
  publish_year: number;
  language: string;
  price: number;
  image: string;
  description: string;
  author: string;
  genre: string;
  stockQuantity: number;
}

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface Genre {
  _id: string;
  name: string;
  des: string;

}


export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface Profile {
  username: string;
  email: string;
  password: string;
  image: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: backendURL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses","Books","Genres","Profile"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/api/admin/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    createBook: build.mutation<Book, NewBook>({
      query: (NewBook) => ({
        url: "/api/admin/books",
        method: "POST",
        body: NewBook,
      }),
      invalidatesTags: ["Books"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "api/admin/user",
      providesTags: ["Users"],
    }),
    getInformation: build.query<Profile, void>({
      query: () => "api/admin/user",
      providesTags: ["Profile"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "api/admin/expenses",
      providesTags: ["Expenses"],
    }),
    getBooks: build.query<Book[], string | void>({
      query: (search) => ({
        url: "api/admin/books",
        params: search ? { search } : {},
      }),
      providesTags: ["Books"],
    }),
    getGenres: build.query<Genre[], void>({
      query: () => "api/admin/categories",
      providesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useCreateBookMutation,
  useGetUsersQuery,
  useGetInformationQuery,
  useGetExpensesByCategoryQuery,
  useGetBooksQuery,
  useGetGenresQuery,
} = api;