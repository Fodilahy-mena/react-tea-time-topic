import React, { useEffect, useState } from 'react'

const API_URL = 
"https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json";

function TopicsList() {
    const [ topics, setTopics ] = useState([]);

    const getTopics = async () => {
        try {
            const res = await fetch(API_URL);
            const topics = await res.json();
            setTopics(topics)
            console.log(topics);
        }catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getTopics();
    }, [])
    // let nextTopics = topics.filter(topic => !topic.discussedOn);
    // let sortTopics = topics.sort((topicA, topicB) => {
	// 	const ratioA = topicA.upvotes - topicA.downvotes;
	// 	const ratioB = topicB.upvotes - topicB.downvotes;
	// 	return ratioB - ratioA;
    // });
    return (
        <div className="topic__card">
            <h1>Hello World</h1>
            {/* {} */}
            <ul>

            </ul>
        </div> 
    )
}

export default TopicsList