import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Item from './Item'

import TemplateService from './../../services/TemplateService'

class WebsiteTemplates extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { state, store } = this.props
        TemplateService.getAll(function (data) {
            store.dispatch({ type: 'UPDATE_LIST', list: data })
        })
    }

    render() {
        const { state, store } = this.props
        var selectedTemplates = state.selectedTemplates.map(function (elem) {
            return (
                <div key={elem._id}>
                    {elem.name}
                </div>
            );
        });
        var elements = state.list.map(function (elem) {
            return (
                <Item
                    key={elem._id}
                    store={store}
                    model={elem}
                    />
            )
        })
        return (
            <div>
                {elements}
                <div className="col-lg-12 col-sm-12 col-xs-12">
                    <h4>Your selection: </h4>
                    {selectedTemplates}
                    <hr />
                    <Link className="col-sm-2 btn btn-primary" to="/create">
                        Create Website
                    </Link>
                </div>
            </div>
        );
    }
}

WebsiteTemplates.propTypes = {
    state: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

export default WebsiteTemplates
