const randomKey = (key) => {
    for (let i = 0; i < 5; i++) {
        key += Math.random().toString(32).slice(2);
    }

    return key;
}

export default randomKey;