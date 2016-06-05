import _ from "underscore"

import HtmlBuiler from "./../logic/HtmlBuilder"
import ModelBuilder from "./../logic/ModelBuilder"

var defaultState = {
    template: {},
    model: {},
    name: '',
    category: '',
    list: [],
    selectedTemplates: []
}

export default function templateCreator(state = defaultState, action) {

    state.getHtml = HtmlBuiler.getHtml;

    var event = action.type;

    switch (event) {

        /*
         * Template creator
         */
        case 'ADD_HEADER':
            state.model.header = ModelBuilder.header()
            state.template.header = HtmlBuiler.header()
            return state
        case 'ADD_FOOTER':
            state.model.footer = ModelBuilder.footer()
            state.template.footer = HtmlBuiler.footer()
            return state
        case 'ADD_BODY':
            state.model.body = ModelBuilder.body()
            state.template.body = HtmlBuiler.body()
            return state

        case 'ADD_TITLE':
            state.model.title = ModelBuilder.title()
            state.template.title = HtmlBuiler.title()
            return state

        case 'ADD_MAIN_SECTION':
            state.model.simpleSection = ModelBuilder.simpleSection()
            state.template.simpleSection = HtmlBuiler.simpleSection()
            return state

        case 'ADD_LEFT_SECTION_1':
            state.model.leftSection1 = ModelBuilder.leftSection1()
            state.template.leftSection1 = HtmlBuiler.leftSection1()
            return state

        case 'ADD_RIGHT_SECTION_1':
            state.model.rightSection1 = ModelBuilder.rightSection1()
            state.template.rightSection1 = HtmlBuiler.rightSection1()
            return state

        /*
         * Template details
         */
        case 'UPDATE_NAME':
            state.name = action.newValue
            return state
        case 'UPDATE_CATEGORY':
            state.category = action.newValue
            return state
        case 'UPDATE_LIST':
            state.list = action.list
            return state

        /*
         * Website creator
         */
        case 'BasePage':
            var added = action.value
            state.basePage = added
            if (!_.contains(state.selectedTemplates, added))
                state.selectedTemplates.push(added)
            return state

        case 'BasicSection':
            var added = action.value
            state.section = added
            if (!_.contains(state.selectedTemplates, added))
                state.selectedTemplates.push(added)
            return state

        default:
            return state
    }
}
