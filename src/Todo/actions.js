const fetchToDosURL = 'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/get';
const apiKey = 'PMAK-65a6d95a73d7f315b0b3ae13-28f9a3fada28cc91e0990b112478319641';

export async function getTodos() {
    try {
        const res = await fetch(fetchToDosURL, {
            headers: {
              "X-Api-Key": apiKey,
            }
        });
        if (!res.ok) {
            throw new Error(`Server error, status was ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        console.error("Error fetching todos");
        throw new Error(err.message);
    }
}