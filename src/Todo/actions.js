const fetchToDosURL = 'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/get';
const apiKey = `${process.env.REACT_APP_TODO_API_KEY}`;

export async function getTodos() {
    try {
        const res = await fetch(fetchToDosURL, {
            headers: {
              "X-Api-Key": apiKey,
            }
        });
        if (!res.ok) {
            if (res.status === 401) {
                alert("API Key is missing, make sure REACT_APP_TODO_API_KEY is set in .env");
            }
            throw new Error(`Server error, status was ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        console.error("Error fetching todos");
        throw new Error(err.message);
    }
}