// Display Date format function
//   Input: string date: yyyy-mm-dd
//   Return: string format:  mm-dd-yyyy

export function displayDateFormat (inputDate) {
    return(inputDate.substr(5,2) + '-' +
            inputDate.substr(8,2) + '-' +
            inputDate.substr(0,4))
}


// Object Sort by Stirng - Name
//   Input:  an array occurence that contain the object gl_Name
//   Return: Return: 1   - a.gl_ Name is > b.gl_ Name
//           Return: -1  - a.gl_ Name is < b.gl_ Name
//           Return: 0   - the values are equal

export function byName(a,b) {
    if (a.gl_Name.toUpperCase() > b.gl_Name.toUpperCase() ) {
        return 1; 
    } else if (a.gl_Name.toUpperCase() < b.gl_Name.toUpperCase())  { 
        return -1;
    } else {
        return 0;
    }
}


// Object Sort by date - gl_StartDate
//   Input:  an array occurence that contain the object gl_StartDate
//   Process: to process the date correctly, the date must be converted to a date
//   Return: Return new Date (a.gl_StartDate).valueOf() - new Date (b.gl_StartDate).valueOf();

export function byStartDate(a,b) {
    return new Date (a.gl_StartDate).valueOf() - new Date (b.gl_StartDate).valueOf();
}


// Object Sort by date - gl_EndDate
//   Input:  an array occurence that contain the object gl_EndDate
//   Process: to process the date correctly, the date must be converted to a date
//   Return: Return new Date (a.gl_EndDate).valueOf() - new Date (b.gl_EndDate).valueOf();

export function byEndDate(a,b) {
    return new Date (a.gl_EndDate).valueOf() - new Date (b.gl_EndDate).valueOf();
}


// Object Sort by Interger - gl_SortOrder
//   Input:  an array occurence that contain the object gl_SortOrder
//   Process: to process the sort order correctly, the sort order must be 
//            converted to an integer
//   Return:  parseInt(a.gl_SortOrder) - parseInt(b.gl_SortOrder)
export function byPriority(a,b) {

    return parseInt(a.gl_SortOrder) - parseInt(b.gl_SortOrder)

}

// Object Sort by date - gl_StartDate by Month, Day
//   Input:  an array occurence that contain the object gl_StartDate
//   Process: to process the date correctly, the date must be converted to a date.  then
//             the data is sorted into month day order (bypassing the year)
//   Return: 
//           Return: 1   - d1.getUTCMonth() > d2.getUTCMonth())
//           Return: -1  - d1.getUTCMonth() < d2.getUTCMonth()
//           Return: 0   - d1.getUTCDate() - d2.getUTCDate()

export function byStartDateMonthDay(a,b) {
    // by month and then by day
    let d1 = new Date(a.gl_StartDate);
    let d2 = new Date(b.gl_StartDate);
    if (d1.getUTCMonth() > d2.getUTCMonth()) {
        return 1;
    } else if (d1.getUTCMonth() < d2.getUTCMonth()) {
        return -1
    } else {
        return d1.getUTCDate() - d2.getUTCDate()
    }

}

// read from user storage
//   Input:  user storage keyword (required)
//   Return: return storage value

export function getItemStorage (storageKeyName) {
        return localStorage.getItem(storageKeyName) 
}
// set to user storage
//   Input:  user storage keyword (required)
//   return: 0 

export function setItemStorage (storageKeyName, storageKeyValue) {
        localStorage.setItem(storageKeyName, storageKeyValue)
        return 0
}

// remove from User Storage
//   Input:  user storage keyword (required)
//   Return: 0
export function removeItemStorage (storageKeyName) {
        localStorage.removeItem(storageKeyName) 
        return 0  
}

// Determine Sort Type
//   Input:  data - an array of objects
//           sortby:  priority, name, startdate or enddate - if invalid
//                    sort by, defaults to sort by name
//   Return: sorted data - an array of objects

export function determineSortBy(data, sortBy) {
    let work_sortData = []
    console.log()
    switch (sortBy) {
        case 'priority':
            work_sortData = data.sort(byPriority)
            break;
        case 'name':  
            work_sortData = data.sort(byName)  
            break; 
        case 'start date':  
            work_sortData = data.sort(byStartDate)  
            break; 
        case 'end date':  
            work_sortData = data.sort(byEndDate)  
            break;   
        default:
            work_sortData = data.sort(byName)
            break;               
    } 
    return work_sortData;
}