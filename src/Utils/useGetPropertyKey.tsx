interface MyObject {
	[key: string]: string;
}

/** data 객체와 name 문자열을 받아서, data 객체 내에 name 값에 해당하는 키을 반환하는 함수입니다. */
export function getValueByKey(obj: MyObject, value: string) {
	const foundKey = Object.keys(obj).find((key: string) => obj[key] === value);
	return foundKey === undefined ? '' : foundKey;
}
