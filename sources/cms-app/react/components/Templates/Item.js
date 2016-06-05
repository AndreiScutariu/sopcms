import React, { Component, PropTypes } from 'react'

class TemplateItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { model } = this.props
        return (
            <tr>
              <td>{model.name}</td>
              <td>{model.category}</td>
              <td>Edit</td>
              <td>Delete</td>
              <td>Preview</td>
            </tr>
        )
    }
}

TemplateItem.propTypes = {
    model: PropTypes.object.isRequired
}

export default TemplateItem
