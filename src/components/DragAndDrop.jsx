import React from 'react';

function DragAndDrop(props) {
    return (
        <div
            className={'border-dashed border-2  border-border w-full h-32 ' +
                'rounded-2xl flex flex-col gap-2 justify-center items-center opacity-60'}>
            <h1 className={'text-4xl font-bold text-border'}>
                Drop file
            </h1>
            <p className={'text-xl text-border'}>
                Supported format: .csv
            </p>
        </div>
    );
}

export default DragAndDrop;