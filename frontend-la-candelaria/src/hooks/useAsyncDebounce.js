export default function useAsyncDebounce(callback, delay) {
	let timer;
	
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), delay)
	}
}