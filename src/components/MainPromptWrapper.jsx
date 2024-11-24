import OutputWrapper from "@/components/OutputWrapper.jsx";
import PromptInput from "@/components/PromptInput.jsx";
import { useState } from 'react';

function MainPromptWrapper(props) {
    const [error, setError] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [history, setHistory] = useState([]);
    const [prompt, setPrompt] = useState(null);

    const handleResponse = (dataset, model, response) => {
        setIsWaiting(false);
        setError(null);
        setHistory((prevHistory) => [
            ...prevHistory,
            { prompt, dataset, model, response},
        ]);
    };

    const handleError = (errorMessage) => {
        setIsWaiting(false);
        setError(errorMessage);
    };

    const handlePromptSubmit = (prompt) => {
        setPrompt(prompt)
        setIsWaiting(true);
    };

    return (
        <div className={'flex flex-col w-full p-8 gap-2 min-h-screen'}>
            {/*<DragAndDrop></DragAndDrop>*/}
            <OutputWrapper
                history={history}
                error={error}
                isWaiting={isWaiting}
            />
            <PromptInput
                onResponse={handleResponse}
                onError={handleError}
                onPromptSubmit={handlePromptSubmit}
            />
        </div>
    );
}

export default MainPromptWrapper;