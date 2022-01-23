import { useEffect, useState } from "react";

const useEditorAutosave = (autosaveCb: () => Promise<void>) => {
	const [needsSync, setNeedsSync] = useState(false);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (needsSync) {
				autosaveCb();
				setNeedsSync(false);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [needsSync, autosaveCb]);

	return {
		needsSync,
		setNeedsSync,
	};
};

export default useEditorAutosave;
