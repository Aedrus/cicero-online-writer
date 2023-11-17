// Module Imports
import { useCallback, useState } from 'react';
import { createEditor, BaseEditor, Descendant, Editor, Element as SlateElement, Node, Transforms, NodeEntry } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { isKeybindPressed } from '../lib/writerMethods';
import '../style.css';

// Component Imports
import Navbar from '../components/Topbar';
// import CommentPanel from '../components/CommentPanel';
// import LeftSidebar from '../components/LeftSidebar';
// import RightSidebar from '../components/RightSidebar';
// import TypePanel from '../components/TypePanel';
// import MenuPanel from '../components/MenuPanel';

// Slate Marks


// Type Declerations - Slate
type CustomText = { text: string };
type CustomElement = { type: string, align?: string, children: CustomText[] };

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor,
        Element: CustomElement,
        Text: CustomText,
    }
}

// Defines default value for Slate's editable area.
const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'Write your text here.' }]
    }
]

// Hotkey objects
const MARK_HOTKEYS = {
    ctrl: {
        mod: {ctrlKey: true},
        b: 'bold',
        i: 'italic',
        u: 'underline',
        '`': 'code',
        '[': 'increase',
        ']': 'decrease',
    },
    ctrl_alt: {
        mod: {ctrlKey: true, altKey: true},
        x: 'strikethrough',
    }
};

const TYPE_HOTKEYS = {
    alt: {
        mod: { altKey: true },
        l: 'left',
        r: 'right',
        t: 'center',
        j: 'justify',
    },
    ctrl: {
        mod: { ctrlKey: true },
        '1': 'heading-one',
        '2': 'heading-two',
        '3': 'heading-three',
        '4': 'heading-four',
        '5': 'heading-five',
        '6': 'heading-six',
        'o': 'paragraph',
    },
    ctrl_alt: {
        mod: { ctrlKey: true, altKey: true },
        o: 'numbered-list',
        u: 'bulleted-list',
    }
}

const UTIL_HOTKEYS = {
    mod: {},
    backspace: 'Backspace',
    tab: 'Tab',
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
                    toggleList(editor, event, UTIL_HOTKEYS.backspace);
                    insertIndent(editor, event, UTIL_HOTKEYS.tab);
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
    for (const item in styleObj) {
        if (typeof styleObj[item] === 'object' && styleObj[item] !== null) {
            applyCustomStyle(editor, event, styleObj[item], toggleStyle);  
        }

        else {
            const mod = styleObj.mod;

            if (isKeybindPressed(event, item, mod)) {
                event.preventDefault();
                const format = styleObj[item];
                toggleStyle(editor, format);
            }
        }
    }
} 

const toggleTypeProp = (editor: Editor, format: string) => {
    const isTypeActive = isTypePropActive(editor, format, 'type');
    const isAlignActive = isTypePropActive(editor, format, 'align');
    const hasAlign = Object.values(TYPE_HOTKEYS.alt).includes(format);
    const hasList = Object.values(TYPE_HOTKEYS.ctrl_alt).includes(format);

    Transforms.unwrapNodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          Object.values(TYPE_HOTKEYS.ctrl_alt).includes(n.type) &&
          !hasAlign,
        split: true,
      })

    let newProperties: Partial<SlateElement>;
    if (hasAlign) {
        newProperties = { align: format }
    }
    else {
        newProperties = { type: isTypeActive ? undefined : hasList ? 'list-item': format}
    }

    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isAlignActive && hasList) {
        const list = { type: format, children: [] };
        Transforms.wrapNodes(editor, list);
    }
    if (isTypeActive && hasList) {
        Transforms.liftNodes(editor);
    }
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

const toggleList = (editor: Editor, event: any, key: any) => {
    const { selection } = editor;
    if (!selection) { return false };

    const isEmptyString: boolean = Node.leaf(editor, selection.anchor.path).text === "" ? true : false;
    const isList: boolean = isTypePropActive(editor, 'list-item', 'type');

    if (isKeybindPressed(event, key) && isEmptyString && isList) {
        event.preventDefault();

        let newProperties: Partial<SlateElement>;
        newProperties = { type: 'paragraph' };

        Transforms.setNodes<SlateElement>(editor, newProperties, { at: selection });
        Transforms.liftNodes(editor);
    }
}

const insertIndent = (editor: Editor, event: any, key: any) => {
    const { selection } = editor;
    if (!selection) {
        return false 
    };

    // Check to make sure we are pressing tab key and we are on a list item.
    if (isKeybindPressed(event, key)) {
        event.preventDefault();
        Transforms.insertNodes(
            editor,
            {
              text: "\t",
            },
            {
              at: selection,
            }
        )
    }
}

const incrementTextSize = (editor: Editor, event: any, key: any, mark: any) => {
    // Trying to figure out how to select the text, break it apart, add a new 'font-size' style that
    // increments it based on the previous value, and then wraps it back together. May need a span.
    if (isKeybindPressed(event, key)) {
        event.preventDefault();
        console.log("Ctrl + [ or ] pressed");
        Editor.addMark(editor, mark, true);
    }
}

// ========================
// Helper Functions
// ========================
const isTypePropActive = (editor: Editor, format: string, type: 'type' | 'align'): boolean => {
    const { selection } = editor;

    if (!selection) {
        return false;
    }

    const [match] = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n[type] === format,
        })
      )

    return !!match;
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
    let alignStyle = { textAlign: TYPE_HOTKEYS.alt.l };

    switch (element.align) {
        case 'left': {
            alignStyle = { textAlign: TYPE_HOTKEYS.alt.l }
            break;
        }
        case 'right': {
            alignStyle = { textAlign: TYPE_HOTKEYS.alt.r }
            break;
        }
        case 'center': {
            alignStyle = { textAlign: TYPE_HOTKEYS.alt.t }
            break;
        }
        case 'justify': {
            alignStyle = { textAlign: TYPE_HOTKEYS.alt.j }
            break;
        }
    }

    switch (element.type) {
        case 'heading-one': {
            return <h1 style={alignStyle} {...attributes}>{children}</h1>
        }
        case 'heading-two': {
            return <h2 style={alignStyle} {...attributes}>{children}</h2>
        }
        case 'heading-three': {
            return <h3 style={alignStyle} {...attributes}>{children}</h3>
        }
        case 'heading-four': {
            return <h4 style={alignStyle} {...attributes}>{children}</h4>
        }
        case 'heading-five': {
            return <h5 style={alignStyle} {...attributes}>{children}</h5>
        }
        case 'heading-six': {
            return <h6 style={alignStyle} {...attributes}>{children}</h6>
        }
        case 'paragraph': {
            return <p style={alignStyle} {...attributes}>{children}</p>
        }
        case 'numbered-list': {
            return <ol style={alignStyle} {...attributes}>{children}</ol>
        }
        case 'bulleted-list': {
            return <ul style={alignStyle} {...attributes}>{children}</ul>
        }
        case 'list-item': {
            return <li style={alignStyle} {...attributes}>{children}</li>
        }
        default: {
            return <p style={alignStyle} {...attributes}>{children}</p>
        }

    }
}