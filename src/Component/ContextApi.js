import React, { useEffect, createContext, useReducer, useState } from 'react';
import axios from 'axios';


const reducer = (state, action) => {
    switch (action.type) {

        case 'ADD_POST':
            return [
                {
                    image: action.payload.url,
                    owner: { firstName: "Daniel" },
                    liked : false,
                    likes : 0,
                    text : action.payload.title,
                    tags:["First post"]
                }
                , ...state]

        case 'ADD_COMMENT':
            return state.map((info) => {
                // validation check by post id, the change will only apply in that post
                return info.id === action.payload.id ?
                    // Add cm as array for comments
                    info.cm ?
                        {
                            ...info,
                            cm: [{ user: action.payload.user, comment: action.payload.comment, uid: action.payload.uid }, ...info.cm]
                        }

                        :
                        {
                            ...info,
                            cm: [{ user: action.payload.user, comment: action.payload.comment, uid: action.payload.uid }]
                        }
                    : info
            })

        case 'LIKE':
            return state.map((info) => {
                return info.id === action.payload ?
                    // Add 1 to likes value
                    {
                        ...info,
                        likes: info.likes + 1,
                        liked: true
                    } : info
            })

        case 'UNLIKE':
            return state.map((info) => {
                return info.id === action.payload ?
                    // Minus 1 to likes value
                    {
                        ...info,
                        likes: info.likes - 1,
                        liked: false
                    } : info
            })

        case 'SHOWMORE':
            return state.map((info) => {
                return info.id === action.payload ?
                    {
                        ...info,
                        // Set show items = comments length
                        itemsToShow: info.cm.length,
                        // Set expanded status is true to decide display Show More or Show Less
                        expanded: true
                    } : info
            })

        case 'SHOWLESS':
            return state.map((info) => {
                return info.id === action.payload ?
                    {
                        ...info,

                        // Set show items back to default which is 2
                        itemsToShow: 2,
                        // Same as "SHOWMORE"
                        expanded: false
                    } : info
            })

        // Load local storage
        case 'LOCAL_STORAGE':
            return action.payload.map((info) => (
                {
                    ...info,
                    itemsToShow: 2,
                    expanded: false
                }))

        // Initial in first time, map whole array from fetch data and customize keys "comment to show, expanded and liked"
        default:
            return action.payload.map((info) => (
                {
                    ...info,
                    cm: [
                        {
                            user: "Kit",
                            comment: "Awesome work!! :-D"
                        },
                        {
                            user: "Daniel",
                            comment: "Nice Shot!!!"
                        },
                        {
                            user: "So",
                            comment: "Great moment......."
                        }
                    ],
                    itemsToShow: 2,
                    expanded: false,
                    liked: false
                }))
    }
}

export const Context = createContext()

export default function ContextApi({ children }) {

    const [data, dispatch] = useReducer(reducer, [])
    const BASE_URL = 'https://dummyapi.io/data/api';
    const APP_ID = '60cd05fef94203502e75f55f';

    const fetch = async () => {

        try {
            const img = await axios.get("https://fakestoreapi.com/products/")
            // const text = await axios.get("https://jsonplaceholder.typicode.com/posts")
            const post = await axios.get(`${BASE_URL}/post`, { headers: { 'app-id': APP_ID } })

            dispatch({ type: 'default', payload: post.data.data })

        }
        catch (err) { console.log(`There is an error${err}`) }
    }

    useEffect(() => {
        if (localStorage.hasOwnProperty("data")) {
            // const existData = JSON.parse(localStorage.getItem("data"))
            // console.log(existData)
            return dispatch({ type: 'LOCAL_STORAGE', payload: JSON.parse(localStorage.getItem("data")) })
        }

        fetch()
    }, [])

    console.log(data)

    return (
        <>
            <Context.Provider value={{ data, dispatch }}>
                {children}
            </Context.Provider>
        </>
    )
}
