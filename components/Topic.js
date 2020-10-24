import React, { useEffect, useState } from 'react'
import { archiveSVG, upvoteSVG, downvoteSVG, trashSVG } from './Svgs';


function Topic({topic}) {
    
    const [ upVotes, setUpVotes ] = useState([]);
    const [ downVotes, setDownVotes ] = useState([]);
    let [ discussedOn, setDiscussedOn] = useState([]);

    function UpdateDownVotes() {
        const downVotes = topic.downvotes;
        setDownVotes(downVotes)
    }

    function UpdateUpVotes() {
        const upVotes = topic.upvotes;
        setUpVotes(upVotes)
    }

    function UpdateDiscussedOn() {
        let discussedOn = topic.discussedOn;
        setDiscussedOn(discussedOn)
    }


    useEffect(() => {
        UpdateDownVotes()
        UpdateUpVotes()
        UpdateDiscussedOn()
    }, [])
    const discussedOnDate = new Date(Number(discussedOn));
    return (
        <article>
            <div>
                {!discussedOn 
                ? 
                <button onClick={() => setDiscussedOn(discussedOn = Date.now())} className="archive">
                {archiveSVG}
                </button>
                : 
                <button className="delete">
                    {trashSVG}
                </button>
                }
                <h5>{topic.title}</h5>
                {!discussedOn 
                ? 
                <div className="votes">
                    <button onClick={() => setUpVotes(upVotes + 1)}  className="upvote">
                        {upvoteSVG}
                    </button>
                    <span className="upvote-number">{upVotes}</span>
                    <button onClick={() => setDownVotes(downVotes + 1)} className="downvote">
                        {downvoteSVG}
                    </button>
                    <span className="upvote-number">{downVotes}</span>
                </div>
                : 
                <p>Discussed on {discussedOnDate.toLocaleDateString()}</p>
                }
            </div>
        </article>
    )
}

export default Topic