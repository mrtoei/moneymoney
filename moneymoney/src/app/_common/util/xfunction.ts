import * as dayjs from 'dayjs';

dayjs().format();


export function empty(value){
    if(typeof value === 'undefined'){
        return true;
    }
    else if(value === null || value===false || value===0 || value==='0' || value===''){
        return true;
    }
    else if(typeof value ==='object' && value instanceof Array ){
        return value.length < 1;
    }
    else{
        return false;
    }
}

export function nEmpty(value)
{
    return !empty(value);
}

export function localDate(date){
    return dayjs(date).format('YYYY-MM-DD');
}

export function toUtcDate(date){
    return dayjs(date).format('YYYY-MM-DD');
}

/**ASSETS METHODs*************************************/
let weekday3A = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export function weekday3(dateYMD?:string)
{
    let date = new Date(dateYMD);
    return weekday3A[date.getDay()];
}

export let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export let monthFullNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function dateText(dateYMD)
{
    if(dateYMD) {
        let dateArray = dateYMD.split('-');
        let year = dateArray[0];
        let month = intVal(dateArray[1]);
        let m = monthFullNames[month-1];
        let day = intVal(dateArray[2]);

        return weekday3(dateYMD) + ', ' + day + ' ' + m + ' ' + year;
    }
    else{
        return '';
    }
}

export function dateText3(dateYMD)
{
    if(dateYMD) {
        let dateArray = dateYMD.split('-');
        let year = dateArray[0];
        let month = intVal(dateArray[1]);
        let m = monthNames[month-1];
        let day = intVal(dateArray[2]);

        return day + ' ' + m + ' ' + year;
    }
    else{
        return '';
    }
}

/**MATH METHODs*************************************/
export function intVal(strVal)
{
    if(strVal && strVal.length > 0){
        return parseInt(strVal, 10);
    }
    else{
        return strVal;
    }
}
export function numberVal(strVal)
{
    if(strVal && strVal.length > 0){
        return parseFloat(strVal);
    }
    else{
        return strVal;
    }
}
export function numF(val:number)
{
    if(val){
        return numberVal(val).toLocaleString('en', { maximumFractionDigits: 2 });
    }
    else{
        return val;
    }
}
