export default function shortFilter(value, length = 20, startingPosition = 0, linkInsteadOfDots = '') {
    return value.length < length 
        ? value 
        : !linkInsteadOfDots 
            ? `${value.substring(startingPosition, length)}..` 
            : `${value.substring(startingPosition, length)}..` ; //TODO: add raw html <a href="linkInsteadOfDots" ></a> here
}
