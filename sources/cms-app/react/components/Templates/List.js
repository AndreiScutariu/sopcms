import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import TemplateItem from './Item'
import TemplateService from './../../services/TemplateService'

class TemplateList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { host, state, store } = this.props
        TemplateService.getAll(function(data) {
            store.dispatch({ type: 'UPDATE_LIST', list: data })
        })
    }
    render() {
        const { state, store } = this.props
        var elements = state.list
        var templatesNodes = elements.map(function (elem) {
            return (
                <TemplateItem
                    key={elem._id}
                    model={elem}
                />
            )
        })
        return (
            <div>
            <table className="table table-striped table-hover margin15">
                <thead>
                    <tr>
                        <th>Template Name</th>
                        <th>Template Category</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {templatesNodes}
                </tbody>
            </table>
            <hr />
            <Link className="col-sm-2 btn btn-primary" to="/create">
                <span className="fa fa-plus"></span>Add Template
            </Link>
            </div>
        )
    }
}

TemplateList.propTypes = {
    state: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

export default TemplateList
