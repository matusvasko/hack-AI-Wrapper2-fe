import { Button } from "@/components/ui/button.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import { Input } from "@/components/ui/input.jsx";
import { API_ENDPOINTS } from "@/config/apiConfig";
import axios from "axios";
import { Brain, ChevronsUpDown, Database, Send } from "lucide-react";
import { useEffect, useState } from 'react';

function PromptInput({ onResponse, onError, onPromptSubmit }) {
    const [pickedDataset, setPickedDataset] = useState("covid-slovakia")
    const [pickedModel, setPickedModel] = useState("gpt-4o")
    const [promptText, setPromptText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentUuid, setCurrentUuid] = useState(null);
    const [retryCount, setRetryCount] = useState(0);


    useEffect(() => {
        let pollInterval = null;

        const checkStatus = async () => {
            if (!currentUuid) return;

            if (retryCount >= 30) {
                clearInterval(pollInterval);
                setIsLoading(false);
                onError?.("Timed out after 30 retries.");
                setRetryCount(0);
                return;
            }

            axios.get(API_ENDPOINTS.STATUS + `/${currentUuid}`)
            .then((response) => {
                const { data } = response;

                if (data.status === 'finished') {
                    clearInterval(pollInterval);
                    setCurrentUuid(null);
                    setIsLoading(false);
                    setRetryCount(0);
                    onResponse?.(pickedDataset, pickedModel, data.response);
                } else if (data.status === 'failed') {
                    clearInterval(pollInterval);
                    setCurrentUuid(null);
                    setIsLoading(false);
                    setRetryCount(0);
                    onError?.("Prompt processing failed.");
                } else {
                    setRetryCount(prevCount => prevCount + 1);
                }
                console.log('get-- GOT RESPONSE:', response)
            })
            .catch((error) => {
                console.error('Error checking status:', error);
                clearInterval(pollInterval);
                setCurrentUuid(null);
                setIsLoading(false);
                setRetryCount(0);
                onError?.("Error checking status.");
            });
        };

        if (currentUuid) {
            pollInterval = setInterval(checkStatus, 3000);
        }

        return () => {
            if (pollInterval) {
                clearInterval(pollInterval);
            }
        };
    }, [currentUuid, retryCount, onResponse, onError]);


    const handleSubmit = async () => {
        if (!promptText.trim() || isLoading) return;

        const currentPrompt = promptText; // Store the prompt text locally
        setPromptText(""); // Clear the input field immediately after submission

        onError?.(null);
        setIsLoading(true);
        onPromptSubmit(currentPrompt);

        axios.post(API_ENDPOINTS.PROMPT, {
            prompt: currentPrompt
        })
        .then((response) => {
            const { data } = response;
            console.log('post-- GOT RESPONSE:', response)
            setCurrentUuid(data.uuid);
        })
        .catch((error) => {
            console.error('Error submitting prompt:', error);
            setIsLoading(false);
            onError?.("Prompt processing failed.");
        });
    };


    return (
        <div>
            <div className={'w-full flex gap-4 opacity-40 p-2'}>
                <div className={'flex gap-2 items-center'}>
                    <Database size={16}/>
                    {pickedDataset}
                </div>
                <div className={'flex gap-2 items-center'}>
                    <Brain size={16}/>
                    {pickedModel}
                </div>
            </div>

            <div className={'w-full flex gap-2'}>
            <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className={'w-20'} variant="outline">
                            <Database/>
                            <ChevronsUpDown className={'opacity-50'}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup value={pickedDataset} onValueChange={setPickedDataset}>
                            <DropdownMenuRadioItem value="covid-slovakia">covid-slovakia</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="covid-czech-republic">covid-czech-republic</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="covid-austria">covid-austria</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className={'w-20'} variant="outline">
                            <Brain/>
                            <ChevronsUpDown className={'opacity-50'}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup value={pickedModel} onValueChange={setPickedModel}>
                            <DropdownMenuRadioItem value="gpt-4o">gpt-4o</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Input type="text"
                       placeholder="prompt"
                       value={promptText}
                       onChange={(e) => setPromptText(e.target.value)}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               handleSubmit();
                           }
                       }}
                />

                <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !promptText.trim()}
                >
                    <Send/>
                </Button>
            </div>
        </div>
    );
}

export default PromptInput;