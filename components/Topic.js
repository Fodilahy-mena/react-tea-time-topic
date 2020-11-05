import React, { useEffect, useState } from 'react'
import { archiveSVG, upvoteSVG, downvoteSVG, trashSVG } from './Svgs';


function Topic({topic, handleArchive, handleDelete, upvoteTopic, downvoteTopic}) {
    
    let [ discussedOn, setDiscussedOn] = useState([]);

    function UpdateDiscussedOn() {
        let discussedOn = topic.discussedOn;
        setDiscussedOn(discussedOn)
    }

    useEffect(() => {
        UpdateDiscussedOn()
    }, [])
    
    const discussedOnDate = new Date(Number(discussedOn));
    return (
        <article>
            <div>
                {!discussedOn 
                ? 
                <button onClick={() => handleArchive(topic.id)} className="archive">
                {archiveSVG}
                </button>
                : 
                <button onClick={() => handleDelete(topic.id)} className="delete">
                    {trashSVG}
                </button>
                }
                <h5>{topic.title}</h5>
                {!discussedOn 
                ? 
                <div className="votes">
                    <button onClick={() => upvoteTopic(topic.id)}  className="upvote">
                        {upvoteSVG}
                    </button>
                    <span className="upvote-number">{topic.upvotes}</span>
                    <button onClick={() => downvoteTopic(topic.id)} className="downvote">
                        {downvoteSVG}
                    </button>
                    <span className="upvote-number">{topic.downvotes}</span>
                </div>
                : 
                <p>Discussed on {discussedOnDate.toLocaleDateString()}</p>
                }
            </div>
        </article>
    )
}

export default Topic