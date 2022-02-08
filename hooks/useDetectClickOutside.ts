import { RefObject, useEffect } from "react";

const useDetectClickOutside = <T extends HTMLElement>(itemRef: RefObject<T>, cb: () => void): void => {
	useEffect(() => {
		const handleClickOutside = (event: Event) => {
			if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
				cb();
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [itemRef, cb]);
};

export default useDetectClickOutside;
