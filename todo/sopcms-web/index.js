import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { createStore } from 'redux'

import TemplateService from './services/TemplateService'
import TemplateCreator from './components/TemplateCreator'
import TemplateList from './components/TemplateList'
import templateCreator  from './reducers'

const store = createStore(templateCreator);
const rootEl = document.getElementById('root')

class TemplateListWrp extends Component {
    render() {
        return (
            <TemplateList
                state={store.getState()}
                store={store}
            />
        )
    }
}

function saveTemplate() {
    TemplateService.save(store.getState())
}

class TemplateCreatorWrp extends Component {
    render() {
        return (
            <TemplateCreator
                value={store.getState()}
                store={store}
                onAddHeader={() => store.dispatch({ type: 'ADD_HEADER' })}
                onAddFooter={() => store.dispatch({ type: 'ADD_FOOTER' })}
                onAddBody={() => store.dispatch({ type: 'ADD_BODY' })}
                onSave={() => saveTemplate()}
            />
        )
    }
}

function render() {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={TemplateListWrp}/>
            <Route path="/list" component={TemplateListWrp}/>
            <Route path="/create" component={TemplateCreatorWrp}/>
        </Router>,
        rootEl
    )
}

render()
store.subscribe(render)
