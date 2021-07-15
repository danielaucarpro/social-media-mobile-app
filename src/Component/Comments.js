import React, { useContext } from 'react';
import { Context } from './ContextApi';

export default function Comments(props) {

    const { data } = props
    const { dispatch } = useContext(Context)
    // console.log(data.itemsToShow)

    // Show more / less function,
    // if the current expanded is false fire SHOWMORE function otherwise fire SHOWLESS function
    const showMore = (postId) => {
        if (data.expanded === false)
            dispatch({ type: "SHOWMORE", payload: postId })

        if (data.expanded === true)
            dispatch({ type: "SHOWLESS", payload: postId })
    }
    return (
        <>
            {/* Receive the expanded status from data to display Show More or Show Less button */}
            <p className="lg:cursor-pointer lg:underline lg:text-sm lg:ml-1 lg:text-gray-400 lg:font-medium lg:block
            md:block md:mb-4
            sm:text-gray-400 sm:text-sm sm:mt-2"
            onClick={() => showMore(data.id)}>{data.expanded === false ? "See more comments" : "Hide comments"}</p>

            {/* Receive the itemToShow number from data and slice the array to control the how many comments to display */}
            {/* Default value will be 3 and show 3 comments and after click show more, the value will be the comments.length to show all comments */}
            {data.cm.slice(0, data.itemsToShow).map((comment, index) => {
                return <div className="lg:mb-1 lg:ml-1 lg:text-sm lg:text lg:block
                md:block
                sm:text-sm sm:mt-2 sm:mb-2"
                    key={index}>
                    <span className="break-words font-bold mr-2" >{comment.user}:</span>
                    <span className="break-words">{comment.comment}</span>
                </div>
            })
            }

        </>
    )
}
