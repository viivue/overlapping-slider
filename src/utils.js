/**
 * Debounce (ignore all, run the last)
 * https://www.freecodecamp.org/news/javascript-debounce-example/
 * @param func
 * @param timeout
 * @returns {(function(...[*]): void)|*}
 */
export function debounce(func, timeout = 150){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


/**
 * Debounce leading (run the first, ignore the rest)
 * https://www.freecodecamp.org/news/javascript-debounce-example/
 * @param func
 * @param timeout
 * @returns {(function(...[*]): void)|*}
 */
export function debounceLeading(func, timeout = 150){
    let timer;
    return (...args) => {
        if(!timer){
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}


/**
 * Get array with unique values
 * https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
 * @param array
 * @returns {*}
 */
export function arrayUnique(array){
    function onlyUnique(value, index, self){
        return self.indexOf(value) === index;
    }

    return array.filter(onlyUnique);
}


/**
 * Sort array of integers
 * @param array
 * @param asc
 * @returns {*}
 */
export function arraySortInteger(array, asc = true){
    return array.sort(function(a, b){
        return asc ? a - b : b - a;
    });
}


/**
 * Set CSS
 * @param target
 * @param props
 */
export function setCSS(target, props){
    Object.assign(target.style, props);
}


/**
 * Console log
 * @param context
 * @param status
 * @param message
 */
export function log(context, status, ...message){
    if(context.options.dev){
        console?.[status](...message);
    }
}


/**
 * Generate unique ID
 */
export function uniqueId(prefix = ''){
    return prefix + (+new Date()).toString(16) +
        (Math.random() * 100000000 | 0).toString(16);
}


export function getNextIndex(count, index, isLoop = true){
    let newIndex = index + 1;

    if(newIndex >= count){
        if(isLoop){
            newIndex = 0;
        }else{
            newIndex = count - 1;
        }
    }
    return newIndex;
}

export function getPreviousIndex(count, index, isLoop = true){
    let newIndex = index - 1;

    if(newIndex < 0){
        if(isLoop){
            newIndex = count - 1;
        }else{
            newIndex = 0;
        }
    }

    return newIndex;
}

export function loopFromIndex(count, index, callback, isForward = true){
    let tempIndex = index;
    for(let i = 0; i < count; i++){
        callback(tempIndex, count);
        if(isForward){
            tempIndex = getNextIndex(count, tempIndex);
        }else{
            tempIndex = getPreviousIndex(count, tempIndex);
        }
    }
}


/**
 * Check if index is going forward (not true if there is only 2 items)
 * @param lastIndex
 * @param newIndex
 * @returns {boolean}
 */
export function isGoingForward(lastIndex, newIndex){
    if(newIndex === 0){
        return lastIndex !== 1;
    }
    if(lastIndex === 0){
        return newIndex === 1;
    }
    return lastIndex < newIndex;
}


/**
 * Check if value is an empty string
 * @param value
 * @returns {boolean}
 */
export function isEmptyString(value){
    return typeof value === 'string' && value.length === 0;
}