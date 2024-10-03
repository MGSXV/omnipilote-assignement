import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, isLoading, error };
}

export default useFetch;