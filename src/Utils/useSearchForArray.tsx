/** 한 배열의 값들 중에 들어있는 특정 배열안에 값들만 filter해주는 함수입니다. */
export function searchInArray<T>(arr: T[], search: T[]) {
	return search.filter((element) => arr.includes(element));
}
