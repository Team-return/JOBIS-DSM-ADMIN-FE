import { useEffect, useState } from 'react';

export const useDidMountEffect = (func: () => void, deps: Array<any>) => {
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		if (didMount) func();
		else setDidMount(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};
