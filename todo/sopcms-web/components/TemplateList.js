import React, { Component, PropTypes } from 'react'
import TemplateItem from './TemplateItem'
import TemplateService from './../services/TemplateService'

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
        console.log(elements)
        var templatesNodes = elements.map(function (elem) {
            return (
                <TemplateItem
                    key={elem.id}
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
            </div>
        )
    }
}

TemplateList.propTypes = {
    state: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

export default TemplateList
