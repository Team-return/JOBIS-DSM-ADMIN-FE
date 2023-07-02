export function searchInArray<T>(arr: T[], search: T[]) {
	return search.filter((element) => arr.includes(element));
}
