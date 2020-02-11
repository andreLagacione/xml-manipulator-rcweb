const datePipe = (date) => {
    if (date) {
        let day = new Date(date).getDay();
        let month = new Date(date).getMonth() + 1;
        let year = new Date(date).getFullYear();

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        return day + '/' + month + '/' + year;
    }

    return;
};

export default datePipe;