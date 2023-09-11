import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "https://api.unsplash.com"}),
    endpoints: (builder)=>({
        getApi: builder.query({
            query: (input)=>( `${input}`
             
            )
            
        })
    })
})

export const {useGetApiQuery} = apiSlice;
export default apiSlice;