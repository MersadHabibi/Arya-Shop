// "use clinet"

// import { jst } from "./utils";
// import { env } from "@/env";

// type RefreshRequestResponse = {
//     detail: string,
//     code: string,
//     access: string,
//     refresh: string
// }

// type Tokens = {
//     access: string | null,
//     refresh: string | null
// }

// // const refresh = async () => {
// //     try {
// //         const refreshToken = getAuthStore().getState().refresh

// //         if (!refreshToken) return {
// //             access: null,
// //             refresh: null
// //         }

// //         const res: RefreshRequestResponse = await fetch(jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/token/refresh"), {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify({
// //                 refresh: refreshToken
// //             })
// //         }).then(res => res?.json())

// //         if (res?.detail) {
// //             throw new Error(res.detail)
// //         }

// //         return { access: res.access, refresh: res.refresh }
// //     }
// //     catch (err) {
// //         console.error((err as Error)?.message || "something went wrong")
// //         return {
// //             access: null,
// //             refresh: null
// //         }
// //     }
// // }

// export const tfetch = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
//     const state = getAuthStore().getState()

//     let tokens: Tokens = {
//         access: state.access,
//         refresh: state.refresh,
//     }

//     if (!tokens.access) {
//         tokens = (await refresh()) || {
//             access: null,
//             refresh: null
//         }
//     }

//     if (!tokens.access || !tokens.refresh) return null

//     getAuthStore().getState().setAccess(tokens.access)
//     getAuthStore().getState().setRefresh(tokens.refresh)

//     const res = await fetch(
//         input,
//         {
//             mode: "cors",
//             ...(init ?? {}),
//             headers: init?.headers
//                 ? {
//                     ...init.headers,
//                     Authorization: `Bearer ${tokens.access}`,
//                 }
//                 : {
//                     Authorization: `Bearer ${tokens.access}`,
//                 },
//         }
//     );

//     if (res.status !== 401) return res;

//     tokens = await refresh();

//     if (!tokens.access || !tokens.refresh) return res;

//     getAuthStore().getState().setAccess(tokens.access)
//     getAuthStore().getState().setRefresh(tokens.refresh)

//     return await fetch(
//         input,
//         {
//             mode: "cors",
//             ...(init ?? {}),
//             headers: init?.headers
//                 ? {
//                     ...init.headers,
//                     Authorization: `Bearer ${tokens.access}`,
//                 }
//                 : {
//                     Authorization: `Bearer ${tokens.access}`,
//                 },
//         }
//     );
// }

// export const txhr = async (xhr: XMLHttpRequest, body?: Document | XMLHttpRequestBodyInit | null | undefined) => {
//     let tokens = await refresh()

//     if (!tokens.access || !tokens.refresh) return null

//     getAuthStore().getState().setAccess(tokens.access)
//     getAuthStore().getState().setAccess(tokens.refresh)

//     xhr.setRequestHeader(
//         "Authorization",
//         jst("Bearer ", tokens.access),
//     );

//     return await new Promise((resolve, reject) => {
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 resolve(xhr.response)
//             }
//         }

//         xhr.onerror = () => {
//             reject(xhr.response)
//         }

//         xhr.send(body)
//     })
// }