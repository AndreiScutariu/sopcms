import HtmlBuiler from "./../logic/HtmlBuilder"

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
            state.model.header = 'Some header text :)'
            state.template.header = HtmlBuiler.header()
            return state
        case 'ADD_FOOTER':
            state.model.footer = 'Some footer text :)'
            state.template.footer = HtmlBuiler.footer()
            return state
        case 'ADD_BODY':
            state.model.body = 'Some body text :)'
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
        default:
            return state
    }
}
