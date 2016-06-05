import React, { Component, PropTypes } from 'react'

class SectionBuilder extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { state, store } = this.props

        var onChange = function name(type) {
            store.dispatch({ type: type });
        }

        return (
            <div className="col-md-6 box">
                <h6>Define a body section: </h6>
                <div className="col-lg-12 nopadding">
                    <button onClick={() => onChange("ADD_TITLE") } className="col-lg-12 btn btn-default btn-xs">Title</button>
                </div>
                <div className="col-lg-12 nopadding">
                    <button onClick={() => onChange("ADD_MAIN_SECTION") } className="col-lg-12 btn btn-default btn-xs">Main Section</button>
                </div>
                <div className="col-lg-12 nopadding">
                    <button onClick={() => onChange("ADD_LEFT_SECTION_1") } className="col-lg-6 btn btn-default btn-xs">Left Section</button>
                    <button onClick={() => onChange("ADD_RIGHT_SECTION_1") } className="col-lg-6 btn btn-default btn-xs">Right Section</button>
                </div>
                <div className="col-lg-12 nopadding">
                    <button className="col-lg-4 btn btn-default btn-xs">Left Section</button>
                    <button className="col-lg-4 btn btn-default btn-xs">Middle Section</button>
                    <button className="col-lg-4 btn btn-default btn-xs">Right Section</button>
                </div>
            </div>
        );
    }
}

SectionBuilder.propTypes = {
    state: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

export default SectionBuilder
