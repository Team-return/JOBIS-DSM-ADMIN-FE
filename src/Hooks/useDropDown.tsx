import { useState } from 'react';

/** DropDown 상태를 관리하는 함수입니다.*/
export function useDropDown<T>(initialState: T) {
	const [selectedItem, setSelectedItem] = useState<T>(initialState);

	const handleSelectedItem = (
		name: string,
		value: string | number | boolean
	) => {
		setSelectedItem((prevSelectedItem) => ({
			...prevSelectedItem,
			[name]: value,
		}));
	};

	return { selectedItem, setSelectedItem, handleSelectedItem };
}
