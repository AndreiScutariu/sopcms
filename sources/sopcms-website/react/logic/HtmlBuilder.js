function buildHeader() {
    return '<div id="header">{{header}}</div>'
}

function buildBody() {
    return '<div id="body">{{body}}</div>'
}

function buildFooter() {
    return '<div id="footer">{{footer}}</div>'
}

function buildHtmlCode() {
    var html = ""
    var template = this.template

    if(template.header !== undefined)
        html += template.header + "\n"

    if(template.body !== undefined)
        html += template.body + "\n"

    if(template.footer !== undefined)
        html += template.footer

    return html
}

export default {
    header: buildHeader,
    footer: buildFooter,
    body: buildBody,
    getHtml: buildHtmlCode
}
