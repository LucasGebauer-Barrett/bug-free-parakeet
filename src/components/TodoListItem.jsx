import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'


function TodoListItem({ className, name, onComplete, onChange }) {
    return (
        <ul className={className}>
            <input class="toDoListItem" onChange={onChange} value={name} />
            <button class="doneButton" onClick={onComplete}>Done?</button>
        </ul>
    )
}

export default styled(observer(TodoListItem))`
.toDoListItem{
    color: white;
    background-color: purple;
    border: none;
    margin: 0px 0px;
    border-radius: 15px;
}

.doneButton{
    color: white;
    background-color: green;
    border: none;
    margin: 0px 5px;
    border-radius: 15px;

}
`
