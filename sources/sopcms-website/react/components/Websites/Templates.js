import React, { Component, PropTypes } from 'react'

import Item from './Item'

import TemplateService from './../../services/TemplateService'

class WebsiteTemplates extends Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        const { state, store } = this.props
        TemplateService.getAll(function(data) {
            console.log(data);
            store.dispatch({ type: 'UPDATE_LIST', list: data })
        })
    }
    
    render() {
        const { state, store } = this.props
        var elements = state.list.map(function (elem) {
            return (
                <Item
                    key={elem.id}
                    store={store}
                    model={elem}
                />
            )
        })
        return (
            <div>
                {elements}
            </div>
        );
    }
}

WebsiteTemplates.propTypes = {
    state: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

export default WebsiteTemplates
