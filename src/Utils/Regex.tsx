export const file_name_regex = (url: string) => {
	return url.replace(/(?:.*?-){5}(.*)/, '$1').replaceAll('+', ' ');
};
