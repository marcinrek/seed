/* 
 * {{module_name}}
 * @author {{author}}
 * @version {{version}}
 *
 * @param {TYPE} NAME - DESCRIPTION
 * @returns {TYPE} - DESCRIPTION
 */

function sumArray(intArray) {
 	let sumVal = 0;

 	intArray.map(function(item, i){
 		sumVal+=item;
 	});

 	return sumVal;
 }

export default function sum(intArray) {
	return sumArray(intArray);
}
