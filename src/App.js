import 'react-complex-tree/lib/style.css';
import { useState } from "react";
import { ControlledTreeEnvironment, Tree } from "react-complex-tree";

const initialTreeState = {
  root: {
    foo: {
      foo_child1: null,
    },
    bar: {
      baz1: null
    }
  }
}
const shortTreeTemplate = {
  root: {
    container: {
      item0: null,
      item1: null,
      item2: null,
      item3: {
        inner0: null,
        inner1: null,
        inner2: null,
        inner3: null
      },
      item4: null,
      item5: null
    }
  }
};


const readTemplate = (template: any, data: any = { items: {} }) => {
  for (const [key, value] of Object.entries(template)) {
    data.items[key] = {
      index: key,
      canMove: true,
      hasChildren: value !== null,
      children: value !== null ? Object.keys(value) : undefined,
      data: key,
      canRename: true
    };

    if (value !== null) {
      readTemplate(value, data);
    }
  }
  return data;
};
const newTreeState = readTemplate(
  initialTreeState
).items;

export function TreeView (){
  const [ focusedItem, setFocusedItem ] = useState();
  const [ expandedItems, setExpandedItems ] = useState([`foo`, `bar`, `foo_child1`]);
  const [ selectedItems, setSelectedItems ] = useState([]);
  const [ treeState, setTreeState ] = useState(newTreeState);

  const onDrop = (treeItems, target) => {
    debugger
  };



        return <div className='tree-view'>
          <ControlledTreeEnvironment
            canDragAndDrop={true}
            canDropOnItemWithChildren={true}
            canDropOnItemWithoutChildren={true}
            canReorderItems={true}
            onDrop={onDrop}
            items={treeState}
            // onFocusItem={onFocusItem}
            // onExpandItem={onExpandItem}
            // onCollapseItem={onCollapseItem}
            // onSelectItems={onSelectItems}
            getItemTitle={() => {
              return `foo`
            }}
            viewState={{
              tree : {
                focusedItem,
                expandedItems,
                selectedItems,
              },
            }}
          >
            <Tree
              treeId='tree'
              rootItem='root'
              treeLabel='Tree view'
            />
          </ControlledTreeEnvironment>
        </div>
}

function App() {
  return (
    <div className="App">
      <TreeView />
    </div>
  );
}

export default App;
