import {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(20);
        return (
            <div>
                <p>{count}</p>
                <button onClick={() => setCount (count - 1)}>-1</button>
                <button onClick={() => setCount (count + 1)}>+1</button>
            </div>
        )
}

export default Counter;
