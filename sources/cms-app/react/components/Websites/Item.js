import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Handlebars from 'handlebars'

function createMarkup(value) {
    var theTemplate = Handlebars.compile(value.template);
    var theCompiledHtml = theTemplate(JSON.parse(value.model));
    return { __html: theCompiledHtml };
};

function useThisButtonHandler(history, store, model) {
    store.dispatch({ type: model.category, value: model });
}

class TemplateItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { store, model } = this.props
        var history = this.props.history
        return (
            <div className="col-sm-6 col-xs-12">
                <div className="panel">
                    <div className="panel-heading">
                        <b>{model.name}</b>
                        <span className="label label-primary pull-right">{model.category}</span>
                    </div>
                    <div className="panel-body">
                        <div>
                            <div dangerouslySetInnerHTML={createMarkup(model) }></div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <button className="btn btn-primary btn-sm" onClick={() => useThisButtonHandler(history, store, model) }>
                            <span className="fa fa-plus"></span>Select
                        </button>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}

TemplateItem.propTypes = {
    store: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired
}

export default TemplateItem