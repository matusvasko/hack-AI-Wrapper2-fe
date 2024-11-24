import OutputWrapper from "@/components/OutputWrapper.jsx";
import PromptInput from "@/components/PromptInput.jsx";
import { useState } from 'react';

function MainPromptWrapper(props) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [prompt, setPrompt] = useState(null);
    const [dataset, setDataset] = useState(null);
    const [model, setModel] = useState(null);

    const handleResponse = (prompt, response, dataset, model) => {
        setIsWaiting(false);
        setPrompt(prompt)
        setResponse(response);
        setDataset(dataset);
        setModel(model);
        setError(null);
    };

    const handleError = (errorMessage) => {
        setIsWaiting(false);
        setError(errorMessage);
        setResponse(null);
    };

    const handlePromptSubmit = (prompt) => {
        setPrompt(prompt)
        setIsWaiting(true);
    };

    return (
        <div className={'flex flex-col w-full p-8 gap-2 min-h-screen'}>
            {/*<DragAndDrop></DragAndDrop>*/}
            <OutputWrapper
                prompt={prompt}
                response={response}
                dataset={dataset}
                model={model}
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