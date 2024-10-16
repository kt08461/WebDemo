// 取得時間秒數
export const getTimestamp = () => {
    return new Date().getTime();
};

// Object's value to String
export const ObjValJoin = (obj, separator=',') => {
    let string = '';
    for (const idx in obj) {
        if (!obj[idx]) continue;
        string += obj[idx] + separator;
    }
    return string.substring(0, string.length-1);
};

export const convertCamelToSnake = (str) => {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g,'$1_').toLowerCase();
};
