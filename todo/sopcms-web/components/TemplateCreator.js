import React, { Component, PropTypes } from 'react'
import Handlebars from 'handlebars'
import RandomModelBuilder from './../logic/RandomModelBuilder'

function createMarkup (value) {
    var theTemplate = Handlebars.compile(value.getHtml());
    //RandomModelBuilder.randomPopulate(value.model);
    var theCompiledHtml = theTemplate(value.model);
    return {__html: theCompiledHtml};
};

class TemplateCreator extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { value, store, onAddHeader, onAddFooter, onAddBody, onSave } = this.props
        return (
            <div>
                <div className="col-md-6 box">
                    HTML Template: <br/>
                    <textarea disabled className="width100 height200" value = {value.getHtml()}></textarea>
                </div>
                <div className="col-md-6 box">
                    Live preview: <br/>
                    <div id="livePreview" className="width100" dangerouslySetInnerHTML={createMarkup(value)} />
                </div>
                <div className="col-md-12 box">
                    <button onClick={onAddHeader} className="btn btn-primary btn-xs margin3">Add Header</button>
                    <button onClick={onAddBody} className="btn btn-primary btn-xs margin3">Add Body</button>
                    <button onClick={onAddFooter} className="btn btn-primary btn-xs margin3">Add Footer</button>
                </div>
                <div className="col-md-12 box">
                    <h3>Save this template</h3>
                    <input ref={node => {this.name = node}} onChange={() => store.dispatch({ type: 'UPDATE_NAME', newValue: this.name.value })} className="margin3" type="text" placeholder="Template Name" />
                    <input ref={node => {this.category = node}} onChange={() => store.dispatch({ type: 'UPDATE_CATEGORY', newValue: this.category.value })} className="margin3" type="text" placeholder="Template Category" />
                </div>
                <div className="col-md-12 box">
                    <button onClick={onSave} className="btn btn-primary btn-sm margin3">Save</button>
                </div>
            </div>
        )
    }
}

TemplateCreator.propTypes = {
    value: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    onAddHeader: PropTypes.func.isRequired,
    onAddFooter: PropTypes.func.isRequired,
    onAddBody: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}

export default TemplateCreator
