/* 
 * global JS
 * @version {{version}}
 */

/*
 *  Helpers
 */

// 1.1 Debounce
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, 
            args = arguments,
            later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            },
            callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) { 
            func.apply(context, args); 
        }
    };
};

// Example usage
// var myEfficientFn = debounce(function() {
//     // All the taxing stuff you do
// }, 250);

// window.addEventListener('resize', myEfficientFn);
