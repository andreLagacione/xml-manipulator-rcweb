const removeSpecialChars = (value) => {
    return value.replace(/[`~!@#$%^&*()_|+\-=?;:¨'",.<>{}[\]\\/\s]/gi, '');
}

export default removeSpecialChars;