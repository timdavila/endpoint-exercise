const apiBaseURL = 'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io';
const apiKey = `${process.env.REACT_APP_TODO_API_KEY}`;

function validateApiResponse(res) {
    if (!res.ok) {
        if (res.status === 401) {
            alert("API Key is missing, make sure REACT_APP_TODO_API_KEY is set in .env");
        }
        throw new Error(`Server error, status was ${res.status}`);
    }
}

export async function getTodos() {
    try {
        const res = await fetch(`${apiBaseURL}/get`, {
            headers: {
              "X-Api-Key": apiKey,
            }
        });
        validateApiResponse(res);
        return await res.json();
    } catch (err) {
        console.error("Error fetching todos");
        throw new Error(err.message);
    }
}

export async function updateTodoStatus(id, completed) {
    try {
        const res = await fetch(`${apiBaseURL}/patch/${id}`, {
            method: 'PATCH',
            headers: {
              "X-Api-Key": apiKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({isComplete: completed})
        });
        validateApiResponse(res);
        return await res.status === "success";
    } catch (err) {
        console.error("Error updating todo");
        throw new Error(err.message);
    }
}