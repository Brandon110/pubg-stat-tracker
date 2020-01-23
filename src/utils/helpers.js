// Rounds number to the nearest 10
export const roundNum = (num) => {
    return Math.round(num * 10) / 10;
}

// Remove '-' and '_' characters from string and replaces it with white space
export const humanizeString = (string) => {
    string = string.split('-').join(' ');
    string = string.split('_').join(' ');

    return string;
}