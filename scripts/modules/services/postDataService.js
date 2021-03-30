const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    if(!res.ok){
        throw new Error(`Error. Status: ${res.status}`);
    }

    return await res.json();
};

export default postData;