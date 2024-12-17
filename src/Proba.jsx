import { useRef, useEffect, useState } from "react";

function Example() {
    const countRef = useRef(0);
    const [count, setCount] = useState(0);

    const increment = () => {
        countRef.current += 1;
        setCount(count + 1);
    }

    return (
        <div>
            <p>Счетчик: {count}</p>
            <p>Хранимое значение: {countRef.current}</p>
            <button onClick={increment}>Увеличить</button>
        </div>
    )
}

export default Example