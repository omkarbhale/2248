
export const log = function(type, message) {
    if (typeof message === 'string') {
        console.log(`[${type.toUpperCase()}] ${message}`);
    } else {
        console.log(`[${type.toUpperCase()}]:`);
        console.log(message);
    }
};
