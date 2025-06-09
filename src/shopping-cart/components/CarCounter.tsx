'use client';

import { addOne, initCounterState, substractOne, useAppDispatch, useAppSelector } from "@/store/counter/counterSlice";
import { useEffect } from "react";

interface Props {
    value?: number;
}

export const CarCounter = ({value = 10}: Props) => {

 const count = useAppSelector((state) => state.counter.count);
 const dispatch = useAppDispatch();

 useEffect(() => {
    dispatch(initCounterState(value));
 }, [dispatch, value]);
return (
<>
    <span className="text-9xl">{count}</span>

    <div className="flex">
        <button
            onClick={() => dispatch(addOne())}
            className="flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 transitio-all w-(100px) mr-2"
            >
            +1
        </button>

        <button 
            onClick={() => dispatch(substractOne())}
            className="flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 transitio-all w-(100px) mr-2">
            -1
        </button>

    </div>
</>
)
}
