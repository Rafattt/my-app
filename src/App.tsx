import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";
import './App.css';

const openAi = new OpenAIApi(
    new Configuration({
        apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
    })
);

function App() {
    const [input, setInput] = useState("");
    const [output, seOutput] = useState("");


    const handleInput = async () => {
        const response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
        })

        if (response.data.choices[0].message != undefined) {
            console.log(response.data.choices[0].message.content)
            seOutput(response.data.choices[0].message.content);
        }


        setInput("");

    }

    const handleKeyDown = (e:any) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleInput();
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
                <button id="testtt" onClick={handleInput}>Send</button>
                <p>{output}</p>
            </header>

        </div>
    );
}

export default App;
