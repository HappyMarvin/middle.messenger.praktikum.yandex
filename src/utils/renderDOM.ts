import Block from "./block";

export function renderDOM(query: string, block: Block) {
    const root = document.querySelector(query);

    console.log('root', root);
    

    if (!root) {
        throw new Error('Not found root element')
    }

    root.innerHTML = '';
    if( block.getContent()?.nodeType === document.ELEMENT_NODE ) root?.appendChild && root?.appendChild(block.getContent());
    block.dispatchComponentDidMount();
    return root;
  } 