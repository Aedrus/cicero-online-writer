// Module Imports
import { useCallback, useState } from 'react';
import { createEditor, BaseEditor, Descendant, Editor, Element as SlateElement, Transforms } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { isKeyLast, findIndexOf } from '../lib/writerMethods'

// Component Imports
import Navbar from '../components/Topbar';
// import CommentPanel from '../components/CommentPanel';
// import LeftSidebar from '../components/LeftSidebar';
// import RightSidebar from '../components/RightSidebar';
// import TypePanel from '../components/TypePanel';
// import MenuPanel from '../components/MenuPanel';

// Typescript Declerations - Slate
type CustomText = { text: string };
type CustomElement = { type: 'paragraph', align?: string, children: CustomText[] };

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor,
        Element: CustomElement,
        Text: CustomText
    }
}

// Defines default value for Slate's editable area.
const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'Write your text here.' }]
    }
]

// Hotkey object for marks and types.
const MARK_HOTKEYS = {
    // shift_keys: {},
    // shift_ctrl_keys: {},
    // shift_alt_keys: {},
    // shift_ctrl_alt_keys: {},
    // alt_keys: {},
    ctrl: {
        mod: {ctrlKey: true},
        b: 'bold',
        i: 'italic',
        u: 'underline',
        '`': 'code'
    },
    alt: {
        mod: {ctrlKey: true, altKey: true},
        x: 'strikethrough'
    }
};

let TYPE_HOTKEYS = {
    mod: { altKey: true },
    l: 'left',
    r: 'right',
    t: 'center',
    j: 'justify'
}

// Object with CSS Classes for elements.
const STYLE_TYPES = {
    alignCenter: 'center',
    alignRight: 'right',
    alignLeft: 'left',
    alignJustify: 'justify',
}


// Writer Component
export const Writer = () => {
    const [editor] = useState(() => withReact(createEditor()));

    const newLine = useCallback((props: any) => {
        return <Element {...props} />
    }, [])

    const newLeaf = useCallback((props: any) => {
        return <Leaf {...props} />
    }, [])

    return (
    <main>
        <Navbar />
        <Slate editor={editor} initialValue={initialValue} >
            <Editable
                spellCheck
                id='canvas'
                as={'article'}
                renderElement={newLine}
                renderLeaf={newLeaf}
                onKeyDown={event => {
                    applyCustomStyle(editor, event, MARK_HOTKEYS, toggleMark);
                    applyCustomStyle(editor, event, TYPE_HOTKEYS, toggleTypeProp);
                }}            
            />
        </Slate>
        {/* <CommentPanel />
        <TypePanel />
        <MenuPanel />
        <LeftSidebar />
        <RightSidebar /> */}
    </main>
    );
}

/* 
================================================
1: Text Styling Methods
================================================
*/

const applyCustomStyle = (editor: Editor, event: any , styleObj: any, toggleStyle: Function) => {
    for (let item in styleObj) {
        if (typeof styleObj[item] === 'object' && styleObj[item] !== null) {
            applyCustomStyle(editor, event, styleObj[item], toggleStyle);  
        }

        else {
            const mod = styleObj.mod;

            if (isKeybindPressed(item, event, mod)) {
                event.preventDefault();
                const prop = styleObj[item];
                toggleStyle(editor, prop);
            }
        }
    }
} 

const modPreCheck = (object: any, event: any): boolean => {
    const LENGTH = Object.keys(object).length;

    if (LENGTH > 1) {
        // Combo 1: Control + Alt
        if (event.getModifierState('Control') && event.getModifierState('Alt') && !event.getModifierState('Shift')) {

            for (let item in object) {
                if ( (item === 'ctrlKey' || item === 'altKey')) {
                    if (!isKeyLast(object , findIndexOf(object, item))) {
                        continue;
                    }

                    else { return true }
                }

                else { return false }
            }
        }
        // Combo 2: Control + Shift
        if (event.getModifierState('Control') && !event.getModifierState('Alt') && event.getModifierState('Shift')) {

            for (let item in object) {
                if ( (item === 'ctrlKey' || item === 'shiftKey')) {
                    if (!isKeyLast(object , findIndexOf(object, item))) {
                        continue;
                    } 

                    else { return true }
                }

                else { return false }
            }
        }
        // Combo 3: Alt + Shift
        if (!event.getModifierState('Control') && event.getModifierState('Alt') && event.getModifierState('Shift')) {

            for (let item in object) {
                if ( (item === 'altKey' || item === 'shiftKey')) {
                    if (!isKeyLast(object , findIndexOf(object, item))) {
                        continue;
                    } 

                    else { return true }
                }

                else { return false }
            }
        }
        // Combo 4: Ctrl + Alt + Shift
        if (event.getModifierState('Control') && event.getModifierState('Alt') && event.getModifierState('Shift')) {

            for (let item in object) {
                if ( (item === 'ctrlKey' || item === 'altKey' || item === 'shiftKey')) {
                    if (!isKeyLast(object , findIndexOf(object, item))) {
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

            for (let item in object) {
                if (item === 'ctrlKey') { 
                    return true
                }

                else { return false }
            }
        }
        // Combo 6: Alt Only
        if (!event.getModifierState('Control') && event.getModifierState('Alt') && !event.getModifierState('Shift')) {

            for (let item in object) {
                if (item === 'altKey') { 
                    return true
                }

                else { return false }
            }
        }
        // Combo 7: Shift Only
        if (!event.getModifierState('Control') && !event.getModifierState('Alt') && event.getModifierState('Shift')) {

            for (let item in object) {
                if (item === 'shiftKey') { 
                    return true
                }

                else { return false }
            }
        }
    }
    return false;
}

const isKeybindPressed = (key: string, event: any, mod: any) => {
    if (key === event.key) {
        if (modPreCheck(mod, event)) {
            return true;
        }
    }
    else {
        return false;
    }
}

const toggleTypeProp = (editor: Editor, format: string) => {
    const isActive = isTypePropActive(editor, format);
    let newProperties: Partial<SlateElement>;

    newProperties = {
        align: format
    } as Partial<SlateElement>

    if (!isActive) {
        Transforms.setNodes<SlateElement>(editor, newProperties)
    } 
    else {
        return;
    }
}

const checkNodeForAlignment = (editor: Editor, node: any, format: string): boolean => {
    if (!Editor.isEditor(node) && SlateElement.isElement(node) && node.align === format) {
        return true;
    }
    
    else {
        return false;
    }
}

const isTypePropActive = (editor: Editor, format: string): boolean => {
    let isPropActive: boolean = false;
    const { selection } = editor;

    if (!selection) {
        return false;
    }

    const [selectedNodes] = Array.from( Editor.nodes( editor, { at: Editor.unhangRange( editor, selection )}));

    let node: keyof typeof selectedNodes;
    for (node in selectedNodes) {
        if (checkNodeForAlignment(editor, node, format)) {
            isPropActive = true;
        }

        else {
            isPropActive = false;
            break;
        }
    }

    return isPropActive;
}

const toggleMark = (editor: Editor, mark: string) => {
    const isActive = isMarkActive(editor, mark);

    if (isActive) {
        Editor.removeMark(editor, mark);
    } 
    
    else {
        Editor.addMark(editor, mark, true);
    }
}

const isMarkActive = (editor: Editor, mark: string): boolean => {
    const marks = Editor.marks(editor);

    return marks ? marks[mark as keyof typeof marks] === true : false;
}

/* 
================================================
2: Custom Slate Nodes
================================================
*/

const Leaf = ({attributes, children, leaf}: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    if (leaf.strikethrough) {
        children = <s>{children}</s>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    return <span {...attributes}>{children}</span>
}

const Element = ({attributes, children, element}: any) => {
    let alignStyle = { textAlign: STYLE_TYPES.alignLeft };

    if (element.align === 'left') {
        alignStyle = { textAlign: STYLE_TYPES.alignLeft}
    }

    if (element.align === 'right') {
        alignStyle = { textAlign: STYLE_TYPES.alignRight}
    }

    if (element.align === 'center') {
        alignStyle = { textAlign: STYLE_TYPES.alignCenter}
    }

    if (element.align === 'justify') {
        alignStyle = { textAlign: STYLE_TYPES.alignJustify}
    }

    return <p style={alignStyle} {...attributes}>{children}</p>;
}