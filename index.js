'use strict';

// LOWDOWN, an NPM Functional Library Project //

/** 
* identity: Designed to return a value unchanged. 
* When called this function returns the argument given to it, unchanged. 
* 
* @param: Any value. 
* 
* @return: any value passed as an argument, unchanged.
* 
*/

function identity (value) { 
    return value;
}
module.exports.identity = identity; 

/** 
* typeOf: The typeof Function is designed to return the name of the data type of the value passed to it.
* 
* @param {Any Datatype}: value: A value to be tested. 
* 
* @return {String}: Returns the datatype of the given value in string format.
* 
* @info: Types are one of:
* 
*          - "string"
*          - "array"
*          - "object"
*          - "undefined"
*          - "number"
*          - "boolean"
*          - "null"
*          - "function"
* 
*/

function typeOf (value){
    if (Array.isArray(value)){
        return "array";
    } else if (value === null){
        return "null";
    } 
    return typeof(value);
}
module.exports.typeOf = typeOf; 

/** 
* first: Takes an array and a number, and returns the nth first elements in an array. Where N is the number 
* of elements you'd like to see returned. If an array is not given, it will return an empty array. 
* 
* @param {Array}: array: an Array to be queried on that won't be changed. Any number of elements.
* @param {Number}: number OR n: a number (could be used as n, because it will represent a variable of a number of elements.
* 
* @return {Array} Returns the nth first elements that appear in an array. Where N is the number of elements you'd like to see returned.
*/

function first(array, number){
    if(!Array.isArray(array) || number < 0){
        return [];
    }else if(isNaN(number)){
        return array[0];
    } else if(number > array.length){
        return array;
    }else if(typeof(number) === "number"){
        return array.slice(0, number);
    }
}
module.exports.first = first;

/** 
* last: Takes an array and a number, and returns the nth last elements in an array. Where N is the number 
* of elements you'd like to see returned. If no array is given, create an empty array.
* 
* @param {Array}: array: an Array to be queried on that won't be changed. Any number of elements.
* @param {Number}: number: a number (could be used as n, because it will represent a variable of a number of elements.
* 
* @return {Array} Returns returns the nth last elements in an array.
*/

function last (array, number){
    if(!Array.isArray(array) || number < 0){
        return [];
    }else if(isNaN(number)){
        return array[array.length -1];
    } else if(number > array.length){
        return array;
    }else if(typeof(number) === "number"){
        return array.slice(1, array.length);
    }
}
module.exports.last = last;

/** 
* indexOf: Takes an array and a value, and returns the index of the array where value first appears.
* @param {Array}:array: The array to be searched upon. 
* @param {A value(any datatype)}: a value, could be a string a number or any dataype. 
* 
* @return {Number} Returns the index of the array item in which the value given as an argument first appears. If no match, return -1.
* 
* @details: Created a for loop which loops through the array, and stops IF the index of array is stricty 
* equal to the value parameter, then returns i and exites the loop.  If no value matches the array, return -1.
*/

function indexOf (array, value) {
     for(let i = 0; i < array.length; i++){
         if(array[i] === value){
             return i;
         } 
    } return -1;
}
module.exports.indexOf = indexOf;


/**
* contains: Takes an array and a value, and returns a boolean (true or false) if the array 
* contains the value. Loop through the array and stricty compare each item in array to the value given.
* If no value given, or not in array, will return false.
* 
* @param {Array}: An array of items to be searched upon. 
* @param: {value} value: a value to be compared to each element in argument array. 
* 
* @return {Boolean}: returns true of false if value appears in array.  
*/

function contains (array, value) {
    for(let i = 0; i < array.length; i++){
        if (array[i] === value) {
            return true;
        } 
    }   return false;
}
module.exports.contains = contains;

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * 
 * @return {Array or Object}: Returns a newArray or Object with each element within updated by function. 
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
* unique: Takes an array as an argument and returns a new array of all elements in array with any duplicates removed.
* This will result in array of all unique values. 
* We loop through the array and push the first instance of array item to a new arrayusing to IndexOf to check if that item is already in the array,
* if so the indexOf function will skip over it. 
* 
* @param {Array}: array: An array with duplicate values.
* 
* @return {Array}: newArray: returns a new array of all elements in given array but with duplicates removed. 
*/
function unique(array){
    let newArr = [];
    for(let i = 0; i < array.length; i++){
        if(indexOf(newArr, array[i]) === -1){  
            newArr.push(array[i]);
        }
    }
    return newArr;
}
module.exports.unique = unique;

/**
  * filter: Designed to filter values in a collection based on a test. 
  * Takes a collection, Array or Object, and passes each value 
  * in the collection through a test Function. The test Function returns 
  * true if the value passes the test, false otherwise. Values that pass 
  * the test are collected and returned in an output Array.
  * 
  * @param {Array or Object} collection: The collection to filter.
  * @param {Function} test: The Function to be applied to each value in 
  * the collection. The test Function must return a Boolean based on some 
  * logic which tests the value given to it.
  * 
  * @return {Array}: An Array containing the filtered collection values. 
  * The Array will contain only the values that passed the test.
  * 
  * Usage: 
  * 
  *      const letters = ['a', 'b', 'b', 'c'];
  *      const onlyBs = filter(letters, function(letter) {
  *          return letter === 'b';
  *      });
  *      console.log(onlyBs); // -> ['b', 'b']
  */
function filter (array, func1) {
        let newArr = [];
        each(array, function(element, index, array){
          if(func1(element, index, array) === true) {
              newArr.push(element);
            }
        });
    return newArr;
}
module.exports.filter = filter;

/**
* reject: Takes an array and a function as an argument, returns a new array with all the items in the array
* that did not meet the argument function's conditions. 
* Create a new Array, and use filter function to pass array arg to function arg and test it's conditions. 
* If the result is false we push it to a new array, then return the array. 
* 
* @param {Array} An array to be searched upon. 
* @param {Function}: A function that tests an array item for some condition and returns a boolean
* 
* @return {Array}: a new array, consisting of items from the given array that did not pass the argument function's conditions i.e falsey. 
*/

function reject(array, func1) {
    let newArr = [];
        filter(array, function(element, index, array){
          if(func1(element, index, array) === false) {
              newArr.push(element);
            }
        });
    return newArr;
}
module.exports.reject = reject;

/** 
* partition: Returns an array that is made up of two sub-arrays. When given an array, the function argument tests it for conditions
* and if true, adds it to an array containing other truthy values from the array. If false, it adds it to a different array 
* with the other falsey values from the original array. Then both arrays are pushed into a Final array, consiting of the two 
* true/false arrays. 
* 
* @param {Array}: array: an Array of values to be passed to a function for testing.
* @param: {Function} func1: Tests whether a given value in an array is a truthy or falsy value, it adds the value after being tested
* to the corresponding new Array 
* 
* @return {Array}: This array will have two arrays inside of it. One of truthy values the other of falsey.
*/

function partition(array, func1){
    let newArrayTrue = [];
    let newArrayFalse = [];
    let newArrayFinal = [];
    each(array, function(element, index, array){
          if(func1(element, index, array) === true) {
              newArrayTrue.push(element);
            }
        });
        newArrayFinal.push(newArrayTrue);
    filter(array, function(element, index, array){
          if(func1(element, index, array) === false) {
              newArrayFalse.push(element);
            }
        });
        newArrayFinal.push(newArrayFalse);
    return newArrayFinal;
    
}
module.exports.partition = partition;

/** 
* map: Takes a collection (an array or an object) and calls the argument function for each item in array.
* 
* map calls a provided callback function once for each element in an array, in order, and constructs a new array from the results. 
* callback is invoked only for indexes of the array which have assigned values, including undefined. 
*
* @param {Array}: collection, an array of elements to be passed as arguments to a function.
* @param {Function} func: a funciton that loops through an array and calls a function for each element in the array. 
* 
* @Return {Array} newArray: a New array consisting of the collection after having the argument function performed upon each element.
*/

function map (collection, func3) {
   var newArray = [];
   each(collection, function(element, index, array) {
       newArray.push(func3(element, index, array));
   });
   return newArray;
}
module.exports.map = map;

/** 
* pluck: Takes an array of objects, and a property as arguments. 
* Returns the map function which in turn, returns the value of each object property passed through it.  
* This happens, because map loops over items in a collection and returns collections(specifically objects)
* that pass the argument functions conditions. i.e. iterate through object, and pluck out values from a sepecific key. 
* @param {Array of Objects}: A collection to be searched upon.
* @param {Object Property}: an object property. 
* 
* @return {Array}: Returns a list of keys in an object of a given property .
*/

function pluck (arr,prop){
    return map(arr, function(object,i, collection){
        return object[prop];
    });
}

module.exports.pluck = pluck;

/** 
* every: Takes a collection and a function as arguments, and calls the function on each item in the collection.
* First it checks if the function is not given or undefined, and
* If the collection passes the conditions set in the argument function, return true, otherwise false. 
* If function is not given or undefined, every will check the "truthyness" or "falsiness" of each valuein collection
* to determine it's boolean output. 
* 
* @param {An array or an Object}: collection: collection of elements to be passed to the argument function to be tested. 
* @param {Function}: func: function to be called on each item in collection.
* 
* @return{Boolean}: true or false / will return true if all elements pass the test conditions in function. If no function given, it will return 
* true if all elements in collection have truthy values.
*/
function every(collection, func) {
    if (func === undefined){
        func = function(hello){
            if(!!hello === true){
                return true;
            }else {
                return false;
            }
        };
    }
    if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
              if (func(collection[i], i, collection) === false) {
                return false;
              }
        }return true;
    }
    if(typeof collection === "object"){
        for(let key in collection){
              if (func(collection[key], key, collection) === false) {
                return false;
              }
        }return true;
    }
}
module.exports.every = every;

/** 
* some: tests whether at least one element in the array passes the test implemented by the provided function.
* and returns a Boolean value.  To be more specific, If the callback function returns even one "truthy" value, 
* the output will return true. 
* 
* @param {Array or object): a collection to be searched an queries upon.
* @param {A function}: func: a function to test the conditions of an array items truthiness and falseyness.
* 
* @return {Boolean}: true / false. *will return a boolean for truthy/falsy values in test results. 
* 
*/

function some(collection, func) {
    if (func === undefined){
        func = function(hello){
            if(!!hello === true){
                return true;
            }else {
                return false;
            }
        };
    }
    if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
              if (func(collection[i], i, collection) === true) {
                return true;
              }
        }return false;
    }
    if(typeof collection === "object"){
        for(let key in collection){
              if (func(collection[key], key, collection) === true) {
                return true;
              }
        }return false;
    }
}
module.exports.some = some;

/** 
* reduce: The reduce () method reduces the array to a single value. 
* The reduce() method executes a provided function for each value of the array (from left-to-right). 
* The return value of the function is stored in an accumulator (result/total).
* 
* @param {Array}: array 
* @param {Function}: test
* @param {AnyDataType}: seed, seed is an accumlator or value that is used to increment and re-set each time the filter function loops. It will be 
* the previous value of the loop at all times, and can be intitally set by a 0, or an string/array/object literal. 
* 
* @return: the seed (the final value of seed after all conditions are checked.)
* 
* In class Example:
 
 function reduce(array, test, seed){
   let seedDefined = 0;
   if (seed === undefined){
       seed = array[0];
       seedDefined = 1;
   }
   for (let i = seedDefined; i < array.length; i++){
       seed = test(seed, array[i], i);
   }   return seed;
}

*/

function reduce(array, func, seed) {
    if (seed === undefined) {
        for (let i = 0; i < array.length; i++) {
            if (i === 0) {
                seed = array[0];
            }
            else {
                seed = func(seed, array[i], i);

            }
        }
    }
    else {
        for (let i = 0; i < array.length; i++) {
            seed = func(seed, array[i], i);
        }
    }
    return seed;
}
module.exports.reduce = reduce;

/**
* extend: Copies one object's(or multiple objects') set of properties to another object. Returns the updated object.
* 
* @param {Object}: An Object that will be mutated if it lacks properties from a given object.
* @param {Object(s)}: An object or objects that will share it's properties with first Object given. 
* 
* @return: Returns the first object argument, but with added new properties and values populated by/copied from 
* the other objects given as arguments.
*
*/

function extend (out) {
         out = out || {};
         for (var i = 1; i < arguments.length; i++) {
           if (!arguments[i])
             continue;
           for (var key in arguments[i]) {
             if (arguments[i].hasOwnProperty(key))
               out[key] = arguments[i][key];
           }
         }
         return out;
}
module.exports.extend = extend;
