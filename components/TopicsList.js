import React, { useEffect, useState } from 'react'
import Topic from './Topic'

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

    function handleArchive(id) {
        let findTopicsToArchive = topics.find(topic => topic.id === id)
        findTopicsToArchive.discussedOn = Date.now();
        setTopics([...topics])
    }

    function handleDelete(id) {
        let filterTopicsToDelete = topics.filter(topic => topic.id !== id)
        setTopics(filterTopicsToDelete);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const title = e.target.topic.value;
        if (!title) return;
		const addTopic = {
			title,
			upvotes: 0,
            downvotes: 0,
			id: Date.now(),
		};
        
        const newTopicList = [...topics, addTopic];
		setTopics(newTopicList);
		e.target.reset();
    }

    useEffect(() => {
        getTopics();
        
    }, [])

    function sortTopic(topicA, topicB) {
		const rateTopicA = topicA.upvotes - topicA.downvotes;
		const rateTopicB = topicB.upvotes - topicB.downvotes;
		return rateTopicB - rateTopicA;
    }
    
    let nextTopics = topics.filter(topic => !topic.discussedOn).sort(sortTopic);
    

    function upvoteTopic(topicId) {
		const newTopicList = topics.map(topic => {
			if (topic.id === topicId) {
				return {
					...topic,
					upvotes: topic.upvotes + 1,
				};
			}
			return topic;
		});
		setTopics(newTopicList);
    }
    
    function downvoteTopic(topicId) {
		const newTopicList = topics.map(topic => {
			if (topic.id === topicId) {
				return {
					...topic,
					downvotes: topic.downvotes + 1,
				};
			}
			return topic;
		});
		setTopics(newTopicList);
	}
    
    let previousTopics = topics.filter(topic => topic.discussedOn).sort(sortTopic);
    return (
        <div>
            <h1>Tea time topic</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input required
						type="text"
						name="topic"/>
                <button type="submit">Add</button>
            </form>
            <div>
                <h4>Next topics</h4>
                <div className="next--topics">
                    {nextTopics.map(topic => (
                        <Topic handleArchive={handleArchive} upvoteTopic={upvoteTopic} downvoteTopic={downvoteTopic} key={topic.id} topic={topic}/>
                    ))}
                </div>
            </div>
            <div>
                <h4>Past topics</h4>
                <div className="previous--topics">
                    {previousTopics.map(topic => (
                        <Topic handleDelete={handleDelete} key={topic.id} topic={topic}/>
                    ))}
                </div>
            </div>
            
        </div> 
    )
}

export default TopicsList