import { useState } from "react";

const useForceRerender = () => {
	const [_, setState] = useState(0);

	return () => setState((state) => state + 1);
};

export default useForceRerender;
