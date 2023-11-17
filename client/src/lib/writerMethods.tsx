/*
Overview
================================================
This file contains a variety of helper methods to perform small, routine
operations within the writer.tsx component. Simply import them into your
component file and start coding. 

Some methods are used in others, while most can be used standalone as needed.
================================================
*/

/* 
----------------------------------------------------------------
Object & Array Methods
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

/* 
----------------------------------------------------------------
Key Event Methods
----------------------------------------------------------------
*/

    /**
    Returns true if the given keybind modifiers are being pressed during event. Otherwise, returns false.
    * @param keybinds - The list of keybinds being checked.
    * @param event - The event to check against the keybinds.
    **/ 
    export const modPreCheck = (keybinds: any, event: any): boolean => {
        const LENGTH = Object.keys(keybinds).length;
    
        if (LENGTH > 1) {
            // Combo 1: Control + Alt
            if (event.getModifierState('Control') && event.getModifierState('Alt') && !event.getModifierState('Shift')) {
    
                for (let item in keybinds) {
                    if ( (item === 'ctrlKey' || item === 'altKey')) {
                        if (!isKeyLast(keybinds , findIndexOf(keybinds, item))) {
                            continue;
                        }
    
                        else { return true }
                    }
    
                    else { return false }
                }
            }
            // Combo 2: Control + Shift
            if (event.getModifierState('Control') && !event.getModifierState('Alt') && event.getModifierState('Shift')) {
    
                for (let item in keybinds) {
                    if ( (item === 'ctrlKey' || item === 'shiftKey')) {
                        if (!isKeyLast(keybinds , findIndexOf(keybinds, item))) {
                            continue;
                        } 
    
                        else { return true }
                    }
    
                    else { return false }
                }
            }
            // Combo 3: Alt + Shift
            if (!event.getModifierState('Control') && event.getModifierState('Alt') && event.getModifierState('Shift')) {
    
                for (let item in keybinds) {
                    if ( (item === 'altKey' || item === 'shiftKey')) {
                        if (!isKeyLast(keybinds , findIndexOf(keybinds, item))) {
                            continue;
                        } 
    
                        else { return true }
                    }
    
                    else { return false }
                }
            }
            // Combo 4: Ctrl + Alt + Shift
            if (event.getModifierState('Control') && event.getModifierState('Alt') && event.getModifierState('Shift')) {
    
                for (let item in keybinds) {
                    if ( (item === 'ctrlKey' || item === 'altKey' || item === 'shiftKey')) {
                        if (!isKeyLast(keybinds , findIndexOf(keybinds, item))) {
                            continue;
                        } 
    
                        else { return true }
                    }
    
                    else { return false }
                }
            }
        }
    
        else {
            // Combo 5: Ctrl Only
            if (event.getModifierState('Control') && !event.getModifierState('Alt') && !event.getModifierState('Shift')) {
    
                for (let item in keybinds) {
                    if (item === 'ctrlKey') { 
                        return true
                    }
    
                    else { return false }
                }
            }
            // Combo 6: Alt Only
            if (!event.getModifierState('Control') && event.getModifierState('Alt') && !event.getModifierState('Shift')) {
    
                for (let item in keybinds) {
                    if (item === 'altKey') { 
                        return true
                    }
    
                    else { return false }
                }
            }
            // Combo 7: Shift Only
            if (!event.getModifierState('Control') && !event.getModifierState('Alt') && event.getModifierState('Shift')) {
    
                for (let item in keybinds) {
                    if (item === 'shiftKey') { 
                        return true
                    }
    
                    else { return false }
                }
            }
        }
        return false;
    }

    /**
    Returns true if the given key + modifiers are being pressed during key event. Otherwise, returns false.
    * @param event - The event to check against the key.
    * @param key - The key to check. Not a modifier key.
    * @param  mod (Optional) - The modifiers to check alongside the key. Not a regular key.
    **/ 
    export const isKeybindPressed = (event: any, key: string, mod?: any): boolean => {
        if (key === event.key) {
            if (mod !== undefined) {
                if (modPreCheck(mod, event)) {
                    return true;
                }
                return false;
            }
            
            else {
                return true;
            }
        }
    
        return false;
    }