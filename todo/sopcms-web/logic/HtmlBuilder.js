function buildHeader() {
    return '<header><h3>{{header}}</h3></header>'
}

function buildBody() {
    return '<body>{{body}}</body>'
}

function buildFooter() {
    return '<footer><h5>{{footer}}</h5></footer>'
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
