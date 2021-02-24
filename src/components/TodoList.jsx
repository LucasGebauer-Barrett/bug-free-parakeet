import React, { useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { observable } from 'mobx';
import { v4 as uuid} from 'uuid';

import TodoListItem from './TodoListItem'


function TodoList({ className }) {
    const [ store ] = useState(createTodoStore);

    return (
        <div className={className}>
            <header>
                <h1 className="title">TODO List Example</h1>
            </header>
            <section>
                <ul>
                    {store.activeItems.map(item => (
                        <TodoListItem
                            key={item.id}
                            name={item.name}
                            isComplete={item.isComplete}
                            onComplete={() => store.setCompleted(item.id)}
                            onChange={(e) => store.setItemName(item.id, e.target.value)}
                        />
                    ))}
                </ul>
                <button class="addItemButton" onClick={store.addItem}>
                    Add New Item
                </button>
            
            </section>
            <footer>
                <h2 className="completedTitle">Completed Items</h2>
                <ul>
                    {store.completedItems.map(item => (
                        <li key={item.id}>
                            {item.name}
                            <button class="removeItemButton" onClick={store.removeItem}>
                                Remove Item
                            </button>
                            <button class="addTagButton" onClick={store.addTag}>
                                Add Tag
                            </button>
                        </li>
                
                    ))}
                </ul>
            </footer>
        </div>
    )
}

function createTodoStore() {
    const self = observable({
        items: [{
            id: uuid(),
            name: "Item 0",
            isComplete: false,
        }],

        get activeItems() {
            return self.items.filter(i => !i.isComplete);
        },
        get completedItems() {
            return self.items.filter(i => i.isComplete);
        },

        addItem() {
            self.items.push({
                id: uuid(),
                name: `Item ${self.items.length}`,
            });
        },
        removeItem(id) {
            self.items.pop({
                // id: uuid(),
                name: `Item ${self.items.id}`,
            });
        },
        addTag() {
            var x = document.createElement("INPUT");
            x.setAttribute("type", "text");
            x.setAttribute("value", "Add tag here");
            document.body.appendChild(x);
        },
        setItemName(id, name) {
            const item = self.items.find(i => i.id === id);
            item.name = name;
        },
        setCompleted(id) {
            const item = self.items.find(i => i.id === id);
            item.isComplete = true;
        },
    })

    return self;
}

export default styled(observer(TodoList))`
    background-color: white;

    .title, .completedTitle {
        color: purple;
    }

    .addItemButton{
        color: white;
        background-color: black;
        border: none;
        margin-left: 80px;
        border-radius: 15px;
    }

    .removeItemButton{
        color: white;
        background-color: red;
        border: none;
        margin: 0px 5px;
        border-radius: 15px;
    }
    .addTagButton{
        color: white;
        background-color: blue;
        border: none;
        border-radius: 15px;
    }
`
