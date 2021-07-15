import React, { useContext, useState, useEffect } from 'react'
import { Context } from './ContextApi'
import { v4 as uuidv4 } from 'uuid';
import { FaRegHeart, FaHeart, FaBox } from "react-icons/fa";
import Comments from './Comments';

export default function Feed() {

    const { data, dispatch } = useContext(Context)
    const [input, setInput] = useState({})
    const [isComment, setComment] = useState(false);
    // const [like, setLike] = useState(false)


    // Submit comment , sent value back to Context
    const submit = (e) => {

        // Target input boxes
        const userInput = e.target.getElementsByClassName("inputUser")[0]
        const cmInput = e.target.getElementsByClassName("cmInput")[0]

        // console.log(userInput)
        e.preventDefault()
        if (input.user === "" || input.comment === "") {
            return alert("Please input all information ")
        } else {
            // Pass payload which is the object with user and comment value by dispatch "ADD_COMMENT"
            dispatch({ type: "ADD_COMMENT", payload: input })
            setComment(false);
            // Call the input boxes and clear user & comment after submition
            userInput.value = ""
            cmInput.value = ""

            localStorage.setItem("data", JSON.stringify(data))
        }
    }


    // Function for like and unlike
    const likeOnClick = (post) => {

        // Switch to like or unlike 
        // setLike(!like)

        // if like is false which mean you are going to like and call the dispatch to add 1 like from object value
        if (post.liked === false)
            dispatch({ type: "LIKE", payload: post.id })

        // if like is true which mean you are going to unlike and call the dispatch to minus 1 like from object value
        if (post.liked === true)
            dispatch({ type: "UNLIKE", payload: post.id })

        localStorage.setItem("data", JSON.stringify(data))

    }


    useEffect(() => {

        if (localStorage.hasOwnProperty("data") && data.length !== 0) {

            localStorage.setItem("data", JSON.stringify(data))
        }

    }, [data])

    const isCommentOn = () => {
        setComment(true);
    }

    return (
        <>
            <div className=" lg:block lg:w-500 lg:mx-auto lg:mt-10 lg:bg-white lg:z-0
        md:bg-white md:flex md:flex-col md:justify-center md:w-4/5
        sm:bg-white sm:mt-28 sm:m-auto">
                {data.map((data, index) => {
                    return (
                        <div className=" lg:relative lg:border lg:border-gray-200 lg:mb-8 lg:h-3/6 lg:mx-auto lg:w-full lg:rounded-md lg:p-2 lg:shadow-md lg:mt-12
                    md:w-full md:float-left md:m-auto md:mt-12
                    sm:m-16"
                            key={index}>
                            <div className="flex items-center lg:mt-1 lg:mb-2 lg:h-1/6
                        md:bg-transparent
                        sm:bg-transparent sm:mb-6">
                                <img
                                    className='rounded-full w-16'
                                    src={data.owner.picture}
                                />
                                <p className="font-bold align-middle flex ml-3 text-lg">{data.owner.firstName}</p>
                            </div>
                            <img className=" lg:w-500 lg:h-80 lg:object-cover lg:select-none
                        sm:rounded-lg sm:w-full"
                                src={data.image} alt="image" />
                            <div className="my-2">
                                {data.liked === false ?
                                    <FaRegHeart className="inline" size={20} style={{ cursor: "pointer", borderColor: "white" }}
                                        onClick={() => likeOnClick(data)} />
                                    :

                                    <FaHeart className="inline" size={20} style={{ cursor: "pointer", color: "af0d0d" }}
                                        onClick={() => likeOnClick(data)} />
                                }
                                <span className="text-sm ml-2 mb-2 align-bottom select-none">{data.likes} Likes </span>
                            </div>

                            <span className="lg:font-black lg:mr-2 lg:text-base lg:mt-5
                            md:hidden
                            sm:font-bold"
                            >{data.owner.firstName} </span>
                            <span className="lg:text-sm lg:break-words
                        md:flex md:mb-2
                        sm:mb-12"
                            >{data.text}</span>
                            <div className="mb-2
                        md:block
                        sm:hidden">
                                {data.tags.map((tag, index) => {
                                    return <span className="text-sm mr-2 underline text-blue-900 cursor-pointer"
                                        key={index}>#{tag}
                                    </span>
                                })}
                            </div>

                            {data.cm ?
                                <Comments data={data} />
                                : null
                            }

                            <p onClick={isCommentOn} className='lg:hidden text-gray-400 cursor-pointer'>Add a comment...</p>


                            < form onSubmit={submit} className={`lg:block lg:mt-4
                                 ${isComment ? '' : 'md:hidden sm:hidden'}
                                 sm:mt-6`}>
                                <input className="inputUser block rounded-2xl mb-1 w-full pl-2 focus:outline-none
                             focus:bg-gray-100 border border-gray-200"
                                    autoComplete="off" placeholder="User" onChange={e => setInput({ ...input, id: data.id, user: e.target.value, uid: uuidv4() })}></input>
                                <div className="flex">
                                    <textarea className="cmInput rounded-2xl w-10/12 pl-2 pt-2 focus:outline-none
                             focus:bg-gray-100 border border-gray-200"
                                        autoComplete="off" placeholder="Write comments" onChange={e => setInput({ ...input, comment: e.target.value })}></textarea>
                                    <button className="text-gray-400 font-bold p rounded-lg ml-2 w-1/6
                              text-center bg-gray-50 hover:bg-blue-50"

                                        type="submit"
                                    >Post</button>
                                </div>
                            </form>
                        </div >
                    )
                })}
            </div >
        </>
    )

}

// Delete button
{/* {comment.user !== null &&
<button className="bg-gray-500 rounded-full w-5 float-right"
onClick={() => deleteComment(data.cm.uid)}
>X</button>} */}