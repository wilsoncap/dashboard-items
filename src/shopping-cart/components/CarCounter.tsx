'use client';

import { useState } from "react";

interface Props {
    value?: number;
}

export const CarCounter = ({value = 10}: Props) => {
const [count, setCount] = useState(value);

const incrementar = () => setCount(count + 1);
const decrementar = () => setCount(count - 1);
return (
<>
    <span className="text-9xl">{count}</span>

    <div className="flex">
        <button
            className="flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 transitio-all w-(100px) mr-2"
            onClick={incrementar}>
            +1
        </button>

        <button onClick={decrementar}
            className="flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 transitio-all w-(100px) mr-2">
            -1
        </button>

    </div>
</>
)
}
