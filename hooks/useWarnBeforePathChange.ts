import { useRouter } from "next/router";
import { useEffect } from "react";

const useWarnBeforePathChange = (unsavedChanges: boolean, cb: () => boolean) => {
	const router = useRouter();

	useEffect(() => {
		if (unsavedChanges) {
			const routeChangeStart = () => {
				const userConfirmed = cb();

				if (!userConfirmed) {
					router.events.emit("routeChangeError");
					throw "Abort route change. Please ignore this error.";
				}
			};

			router.events.on("routeChangeStart", routeChangeStart);

			return () => {
				router.events.off("routeChangeStart", routeChangeStart);
			};
		}
	}, [unsavedChanges, cb, router.events]);
};

export default useWarnBeforePathChange;
