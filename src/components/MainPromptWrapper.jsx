import React, {useState} from 'react';
import { Input } from "@/components/ui/input"
import DragAndDrop from "@/components/DragAndDrop.jsx";
import PromptInput from "@/components/PromptInput.jsx";
import OutputWrapper from "@/components/OutputWrapper.jsx";

function MainPromptWrapper(props) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);

    const handleResponse = (response) => {
        setResponse(response);
        setError(null);
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setResponse(null);
    };

    const handlePromptSubmit = () => {
        setIsWaiting(true);
    };

    return (
        <div className={'flex flex-col w-full p-8 gap-2 min-h-screen'}>
            {/*<DragAndDrop></DragAndDrop>*/}
            <OutputWrapper
                response={response}
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