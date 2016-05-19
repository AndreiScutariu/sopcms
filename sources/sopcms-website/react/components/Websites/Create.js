import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Handlebars from 'handlebars'

class WebsiteCreator extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { state, store } = this.props
        return (
            <div>something</div>
        );
    }
}

WebsiteCreator.propTypes = {
    state: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

export default WebsiteCreator