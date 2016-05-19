import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { createStore } from 'redux'

import TemplateService from './services/TemplateService'
import TemplateCreator from './components/Templates/Form'
import TemplateList from './components/Templates/List'

import WebsiteTemplates from './components/Websites/Templates'
import WebsiteCreate from './components/Websites/Create'

import templateReducer  from './reducers'

const store = createStore(templateReducer);

function saveTemplate() {
    TemplateService.save(store.getState())
}

class TemplateListWrp extends Component {
    render() {
        return (
            <TemplateList
                state={store.getState() }
                store={store}
                />
        )
    }
}

class TemplateCreatorWrp extends Component {
    render() {
        return (
            <TemplateCreator
                value={store.getState() }
                store={store}
                onAddHeader={() => store.dispatch({ type: 'ADD_HEADER' }) }
                onAddFooter={() => store.dispatch({ type: 'ADD_FOOTER' }) }
                onAddBody={() => store.dispatch({ type: 'ADD_BODY' }) }
                onSave={() => saveTemplate() }
                />
        )
    }
}

class WebsiteFormWrp extends Component {
    render() {
        return (
            <WebsiteTemplates state={store.getState() } store={store} />
        )
    }
}

class WebsiteCreateWrp extends Component {
    render() {
        return (
            <WebsiteCreate state={store.getState() } store={store} />
        )
    }
}

function render() {

    const templateEl = document.getElementById('template-root')
    const websiteEl = document.getElementById('website-root')

    if (templateEl !== null) {
        ReactDOM.render(
            <Router history={hashHistory}>
                <Route path="/" component={TemplateListWrp}/>
                <Route path="/list" component={TemplateListWrp}/>
                <Route path="/create" component={TemplateCreatorWrp}/>
            </Router>,
            templateEl
        )
    }

    if (websiteEl !== null) {
        ReactDOM.render(
            <Router history={hashHistory}>
                <Route path="/" component={WebsiteFormWrp}/>
                <Route path="/list" component={WebsiteFormWrp}/>
                <Route path="/create" component={WebsiteCreateWrp}/>
            </Router>,
            websiteEl
        )
    }
}

render()
store.subscribe(render)
