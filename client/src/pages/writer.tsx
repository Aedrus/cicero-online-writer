// Module Imports
import { useCallback, useState } from 'react';
import { createEditor, BaseEditor, Descendant, Editor, Element as SlateElement , Transforms } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

// Component Imports
import Navbar from '../components/Topbar';
import { match } from 'assert';
// import CommentPanel from '../components/CommentPanel';
// import LeftSidebar from '../components/LeftSidebar';
// import RightSidebar from '../components/RightSidebar';
// import TypePanel from '../components/TypePanel';
// import MenuPanel from '../components/MenuPanel';

// Typescript Declerations - Slate
type CustomText = { text: string };
type CustomElement = { type: 'paragraph', children: CustomText[] };

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor,
        Element: CustomElement,
        Text: CustomText
    }
}

// Hotkey objects for marks and types.
const MARK_HOTKEYS = {
    b: 'bold',
    i: 'italic',
    u: 'underline',
    '`': 'code'
}
const TYPE_HOTKEYS = {
    j: 'center',
    l: 'left',
    r: 'right',
}

// Object with CSS Classes for elements.
const STYLE_TYPES = {
    alignCenter: 'center',
    alignRight: 'right',
    alignLeft: 'left'
}


// Defines default value for Slate's editable area.
const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'Write your text here.' }]
    }
]

// Writer Component
export const Writer = () => {
    // Create editor with state.
    const [editor] = useState(() => withReact(createEditor()));

    // Custom Element renderer for new line.
    const newLine = useCallback((props: any) => {
        return <Element {...props} />
    }, [])

    // Custom Leaf Renderer for bold text.
    const newLeaf = useCallback((props: any) => {
        return <Leaf {...props} />
    }, [])

    return (
    <main>
        <Navbar />
        <Slate editor={editor} initialValue={initialValue} >
            <Editable
                id='canvas'
                as={'article'}
                renderElement={newLine}
                renderLeaf={newLeaf}
                onKeyDown={event => {
                    let markHotkeys: keyof typeof MARK_HOTKEYS;
                    let typeHotkeys: keyof typeof TYPE_HOTKEYS;

                    for (markHotkeys in MARK_HOTKEYS) {
                        if (isKeybindPressed(markHotkeys, event)) {
                            event.preventDefault();
                            const mark = MARK_HOTKEYS[markHotkeys];
                            toggleMark(editor, mark);
                        }
                    }

                    for (typeHotkeys in TYPE_HOTKEYS) {
                        if (isKeybindPressed(typeHotkeys, event)) {
                            event.preventDefault();
                            const align = TYPE_HOTKEYS[typeHotkeys];
                            toggleType(editor, align);
                        }
                    }

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

// Method to check if a key is being pressed during event.
const isKeybindPressed = (key: string, event: any) => {
    if (key === event.key && event.ctrlKey) {
        return true;
    }
    else {
        return false;
    }
}

// Method to toggle type on currently selected text node.
const toggleType = (editor: Editor, format: string) => {
    let newProperties: Partial<SlateElement>;
    const isActive = isTypeActive(editor, format);

    newProperties = {
        align: STYLE_TYPES.alignLeft
    } as Partial<SlateElement>

    Transforms.setNodes<SlateElement>(editor, newProperties);
}

// Check to see if the current format (alignment) is on the selected elements.
const isTypeActive = (editor: Editor, format: string): boolean => {
    const { selection } = editor;
    if (!selection) {
        return false;
    }
    // Trying to find out how to check for the align value on selected elements.
    return false;
}

// Method to toggle mark on currently selected text node.
const toggleMark = (editor: Editor, mark: string) => {
    const isActive = isMarkActive(editor, mark);

    if (isActive) {
        Editor.removeMark(editor, mark);
    } else {
        Editor.addMark(editor, mark, true);
    }
}

// Check if the mark argument is active in the current editor's selected area.
const isMarkActive = (editor: Editor, mark: string): boolean => {
    // Stores the current marks in document.
    const marks = Editor.marks(editor);

    // Checks if the mark argument is found in the marks array.
    return marks ? marks[mark as keyof typeof marks] === true : false;
}
// Create new leaf for each type of mark.
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
    if (leaf.code) {
        children = <code>{children}</code>
    }
    return <span {...attributes}>{children}</span>
}

const Element = ({attributes, children, element}: any) => {
    // Fill this out and figure out how to align text.
    let style = { textAlign: STYLE_TYPES.alignCenter };

    if (element.align === 'left') {
        style = { textAlign: STYLE_TYPES.alignLeft}
    }
    if (element.align === 'right') {
        style = { textAlign: STYLE_TYPES.alignRight}
    }
    if (element.align === 'center') {
        style = { textAlign: STYLE_TYPES.alignCenter}
    }

    return <p style={style} {...attributes}>{children}</p>;
}