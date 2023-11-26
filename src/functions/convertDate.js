export const convertDate = (number) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const myDate = new Date(number);
    return [myDate.getDate(), months[myDate.getMonth()]];
}