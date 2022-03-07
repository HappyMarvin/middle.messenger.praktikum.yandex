import Block from "./block";

export function renderDOM(query: string, block: Block) {
    const root = document.querySelector(query);

    if (!root) {
        throw new Error('Not found root element')
    }

    root.innerHTML = '';
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
    return root;
  } 