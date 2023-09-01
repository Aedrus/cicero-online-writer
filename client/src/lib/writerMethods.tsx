/*
Overview
================================================
This file contains a variety of helper methods to perform small, routine
operations within the writer.tsx component. Simply import them into your
component file and start coding.
================================================
*/

/* 
----------------------------------------------------------------
Object Methods
----------------------------------------------------------------
*/ 

    /**
    Returns the index of the first occurence of a matching value in an object. Otherwise, returns undefined.
    * @param obj - The object to iterate through.
    * @param key - The key to match against each property in the object.
    **/ 
    export const findIndexOf = (obj: object, key: any) => {
        const keysArray = Object.keys(obj);
        for (let i = 0; i < keysArray.length; i++) {
            if (keysArray[i] === key) {
                return keysArray.indexOf(key);
            }
        }
        return undefined;
    }

    /**
    Returns true if the given key index is the last index of an object. Otherwise, returns false.
    * @param obj - The object to compare against.
    * @param index - The index to check against the last index of the object.
    **/ 
    export const isKeyLast = (obj: object, index: any): boolean => {
        const keysArray = Object.keys(obj);
        const LENGTH = keysArray.length - 1;

        if (index === LENGTH) {
            return true;
        }
        return false;
    }
