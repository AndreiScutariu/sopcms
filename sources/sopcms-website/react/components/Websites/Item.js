import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Handlebars from 'handlebars'

function createMarkup(value) {
    var theTemplate = Handlebars.compile(value.template);
    var theCompiledHtml = theTemplate(JSON.parse(value.model));
    return { __html: theCompiledHtml };
};

function useThisButtonHandler(history, store, model) {
    store.dispatch({ type: 'CURRENT_TEMPLATE_ID', value: model._id });
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
                        <body>
                            <div dangerouslySetInnerHTML={createMarkup(model) }></div>
                        </body>
                    </div>
                    <div className="panel-footer">
                        <button className="col-sm-2 btn btn-primary btn-xs" onClick={() => useThisButtonHandler(history, store, model) }>
                            <span className="fa fa-plus"></span>Use this
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