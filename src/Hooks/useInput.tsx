import { ChangeEvent, useState } from 'react';

/** input 상태를 관리하는 함수입니다.*/
export function useInput<T>(initialState: T) {
	const [form, setForm] = useState<T>(initialState);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm(e.target.value as unknown as T);
	};

	return { form, setForm, handleChange };
}
