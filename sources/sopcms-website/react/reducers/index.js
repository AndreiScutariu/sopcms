import HtmlBuiler from "./../logic/HtmlBuilder"
import ModelBuilder from "./../logic/ModelBuilder"

var defaultState = {
    template: {},
    model: {},
    name: '',
    category: '',
    list: []
}

export default function templateCreator (state = defaultState, action) {

    state.getHtml = HtmlBuiler.getHtml;

    switch (action.type) {
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
        case 'UPDATE_NAME':
            state.name = action.newValue
            return state
        case 'UPDATE_CATEGORY':
            state.category = action.newValue
            return state
        case 'UPDATE_LIST':
            state.list = action.list
            return state
        case 'CURRENT_TEMPLATE_ID':
            state.currentTemplateId = action.value
            return state
        default:
            return state
    }
}
