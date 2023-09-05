import { useState, useRef } from "react";

function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): T {
    const lastCalledRef = useRef<number | null>(null);
    const [lastResult, setLastResult] = useState<any>();

    function throttledFunction(...args: Parameters<T>) {
        if (lastCalledRef.current === null || Date.now() - lastCalledRef.current > delay) {
            lastCalledRef.current = Date.now();
            setLastResult(callback(...args));
        }
    }

    return (throttledFunction as unknown) as T;
}

export default useThrottle;