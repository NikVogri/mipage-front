import { EditorState } from "draft-js";
import { selectNeedsSync, setNeedsSync } from "features/page/pagesSlice";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

const useEditorAutosave = (editorState: EditorState, autosaveCb: () => Promise<void>) => {
	const dispatch = useAppDispatch();
	const needsSync = useAppSelector(selectNeedsSync);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const createAutosaveTimeout = (newState: EditorState) => {
		if (stateChanged(newState) && !needsSync) {
			dispatch(setNeedsSync(true));
		}
	};

	const stateChanged = (newState: EditorState): boolean => {
		const oldStateContent = editorState.getCurrentContent();
		const newStateContent = newState.getCurrentContent();

		return !isEqual(oldStateContent, newStateContent);
	};

	useEffect(() => {
		if (!needsSync && timeoutId) {
			clearTimeout(timeoutId);
		}

		if (needsSync && !timeoutId) {
			const timeout = setTimeout(() => {
				dispatch(setNeedsSync(false));
				setTimeoutId(null);
				console.log("autosaving now");
				autosaveCb();
			}, 5000); // 5 seconds before autosaving;

			setTimeoutId(timeout);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [needsSync, timeoutId, dispatch]);

	return { createAutosaveTimeout, autosaveActive: !!timeoutId };
};

export default useEditorAutosave;
