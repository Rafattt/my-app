import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
import './App.scss';

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
    })
);

function App() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState("");


    const handleInput = async () => {
        
        const response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
        })
        

        if (response.data.choices[0].message != undefined) {
            
            console.log(response.data.choices[0].message.content)
            setOutput(response.data.choices[0].message.content);
        }


        setInput("");

    }

    const handleKeyDown = (e: any) => {
        setLoading("Loading")
        if (e.keyCode === 13) {
            e.preventDefault();
            handleInput();
            setOutput('')
        }
    }
    if (output) {
        return (
            <div className="App">
                <div className="chat-container">
                    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
                    <button onClick={handleInput}>Send</button>
                    
                    <div className="output-box">
                        <span>{output}</span>
                    </div>

                </div>
            </div>
        );
    } else {
        return (
            <div className="App">
                <div className="chat-container">
                    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
                    <button onClick={handleInput}>Send</button>
                    <div className="loading">{loading}</div>

                </div>
            </div>
        );
    }
    
}

export default App;
