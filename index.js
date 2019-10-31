'use strict';

// LOWDOWN, an NPM Functional Library Project //

/** 
* identity: Designed to return a value unchanged. 
* When called this function returns the argument given to it, unchanged. 
* @param: Any value. 
* @return: any value passed as an argument, unchanged.
*/

function identity (value) { 
    return value;
}
module.exports.identity = identity; 

/** 
* typeOf: The typeof Function is designed to return the name of the data type of the value passed to it.
* @param: Any value. 
* @return: Returns the datatype of the given value in string format.
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
* first: Takes an array and a number, and returns the first element in array that matches the number argument given.
* If an array is not given, it will return an empty array. 
* @param: An Array
* @param: A Number 
* @return: Returns the first value in array that matches the number given as a argument.
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
* last: Designed to return the last item in an array that matches the number argument given. 
* If no array is given, create an empty array.
* @param: An Array
* @param: A Number 
* @return: Returns the last value in array that matches the number given as a argument.
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
* @param: An array
* @param: A value
* @return: returns the index of the array item which matches the value given.  If no match, return -1.
* Details: Created a for loop which loops through the array, and stops IF the index of array is stricty 
* equal to the value parameter, then returns i and exites the loop.  If no value matches the array, return -1.
* Escape the loop. 
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
* @param: An array
* @param: A value
* @return: A boolean. 
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
* @param: An array
* @return: returns a new array of all elements in given array but with duplicates removed. 
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
* @param: An array
* @param: A function
* @return: a new array, consisting of items from the given array that did not pass the argument function's conditions. 
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
* @param: An array
* @param: A function
* @return: An array. This array will have two arrays inside of it. One of truthy values the other of falsey.
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
* @param: a collection 
* @param: a function
* @Return: a New array consisting of the collection after having the argument function performed upon them.
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
* @param: an Array (of objects)
* @param: a Property
* @Returns: returns a list of values in an object of a given property 
*/

function pluck (arr,prop){
    return map(arr, function(object,i, collection){
        return object[prop];
    });
}

module.exports.pluck = pluck;

/** 
* every: Takes a collection and a function as arguments, and calls the function on each item in the collection.
* First it checks if the function is no given or undefined, and
* If the collection passes the conditions set in the argument function, return true, otherwise false. 
* If function is not given or undefined, return false. 
* 
* @param: A collection
* @param: A function
* @return: A boolean
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
* and returns a Boolean value. 
* 
* @param: a collection
* @param: a function
* @return: a boolean
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
* @param: An array
* @param: A function
* @param: A seed (a accumulator value)
* @return: the seed ( the final value of seed after all conditions are checked.)
* 
* 
*/
function reduce(array, func, seed){
    if(seed === undefined){
        for(let i = 0; i < array.length; i++){
            if (i === 0){
              seed = array[0];
            }
            else seed = func(seed, array[i], i);
        }
    } else {
        for(let i = 0; i < array.length; i++){
                seed = func(seed, array[i], i);
        }
    }
    return seed;
}
module.exports.reduce = reduce;

/**
* extend: Copies one object's(or multiple objects') set of properties to another object. Returns the updated object.
* @param: An Object
* @param: Another Object or Object(s)
* @return: Returns the first object argument, but with added new properties and values populated by/copied from 
* the other objects given as arguments.
* 
* In class example:
* _.extend = function(object1, ...objects){
*  console.log(object1);
*  console.log(objects);
*  for (let i = 0; i < objects.length; i++){
*    for (let key in objects[i]){
*      let currentObj = objects[i];
*      object1[key] = currentObj[key];
*    }
*  }
*  return object1;
*}
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
