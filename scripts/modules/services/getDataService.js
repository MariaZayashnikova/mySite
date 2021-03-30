const getData = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Error. Status: ${res.status}`);
    }

    return await res.json();
};

export default getData;