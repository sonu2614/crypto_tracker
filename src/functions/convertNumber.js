export const convertNumber = (number) => {
    const num = number.toLocaleString();
    const arr = num.split(",");
    if (arr.length === 2) {
        return arr[0] + "." + arr[1].slice(0, 2) + "k";
    } else if (arr.length === 3) {
        return arr[0] + "." + arr[1].slice(0, 2) + "M";
    } else if (arr.length === 4) {
        return arr[0] + "." + arr[1].slice(0, 2) + "B";
    } else if (arr.length === 4) {
        return arr[0] + "." + arr[1].slice(0, 2) + "T";
    } else return num;
};
