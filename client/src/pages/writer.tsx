// Module Imports
import { useState } from 'react';
import { createEditor, BaseEditor, Descendant, Element, Editor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

// Component Imports
import Navbar from '../components/Topbar';
// import CommentPanel from '../components/CommentPanel';
// import LeftSidebar from '../components/LeftSidebar';
// import RightSidebar from '../components/RightSidebar';
// import TypePanel from '../components/TypePanel';
// import MenuPanel from '../components/MenuPanel';

// Typescript Declerations - Slate
type CustomText = { text: string };
type CustomElement = { type: 'paragraph'; children: CustomText[] };

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



const NewLine = (props: any) => {
    return (
        <article {...props.children}>
            
        </article>
    )
}

// Writer Component
export const Writer = () => {
    const [editor] = useState(() => withReact(createEditor()));
    return (
    <main>
        <Navbar />
        <Slate editor={editor} initialValue={initialValue} >
            <Editable
                renderElement={NewLine}
                id='canvas'
                as={'article'}
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