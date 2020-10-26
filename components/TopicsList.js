import React, { useEffect, useState } from 'react'
import Topic from './Topic'

const API_URL = 
"https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json";

function TopicsList() {
    const [ topics, setTopics ] = useState([]);
    const [addTopic, setAddTopic ] = useState('');
    

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
        const addTopic = {
            title: addTopic,
            upvotes: 0,
            downvotes: 0,
            discussedOn: '',
            id: Date.now(),
        }
        topics.push(addTopic);
        setTopics([...topics])
        setAddTopic('')
        console.log(topics)
    }

    
    useEffect(() => {
        getTopics();
        
    }, [])

    let nextTopics = topics.filter(topic => !topic.discussedOn);
    nextTopics = nextTopics.sort((topicA, topicB) => {
		const ratioA = topicA.upvotes - topicA.downvotes;
		const ratioB = topicB.upvotes - topicB.downvotes;
		return ratioB - ratioA;
    });
    
    let previousTopics = topics.filter(topic => topic.discussedOn);
    return (
        <div>
            <h1>Hello World</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={addTopic} onChange={(e) => setAddTopic(e.target.value)} name="title"/>
                <button type="submit">Add</button>
            </form>
            <div>
                <h4>Next topics</h4>
                <div className="next--topics">
                    {nextTopics.map(topic => (
                        <Topic handleArchive={handleArchive} key={topic.id} topic={topic}/>
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