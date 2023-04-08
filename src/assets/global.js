// Display Date format function
//   Input: string date: yyyy-mm-dd
//   Return: string format:  mm-dd-yyyy

export function displayDateFormat (inputDate) {
    return(inputDate.substr(5,2) + '-' +
            inputDate.substr(8,2) + '-' +
            inputDate.substr(0,4))
}