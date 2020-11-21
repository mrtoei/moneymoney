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
