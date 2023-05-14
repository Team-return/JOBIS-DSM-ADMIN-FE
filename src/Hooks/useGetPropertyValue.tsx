/** data 객체와 name 문자열을 받아서, data 객체 내에 name 키에 해당하는 값을 반환하는 함수입니다. */
export function getPropertyValue(data: {}, name: string) {
	const propertyValueMap: { [key: string]: string } = data;
	return propertyValueMap[name] || '';
}
