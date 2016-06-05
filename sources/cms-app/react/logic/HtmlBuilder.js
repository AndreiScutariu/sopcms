function buildHeader() {
    return '<div id="header">{{header}}</div>'
}

function buildBody() {
    return '<div id="body">{{body}}</div>'
}

function buildFooter() {
    return '<div id="footer">{{footer}}</div>'
}

function title() {
    return '<h2 id="title">{{title}}</h2>'
}

function simpleSection() {
    return '<p id="simpleSection">{{simpleSection}}</p>'
}

function rightSection1() {
    return '<div class="col-lg-6 nopadding" id="rightSection1">{{rightSection1}}</div>'
}

function leftSection1() {
    return '<div class="col-lg-6 nopadding" id="leftSection1">{{leftSection1}}</div>'
}

function buildHtmlCode() {
    var html = ""
    var template = this.template

    if (template.header !== undefined)
        html += template.header + "\n"

    if (template.body !== undefined)
        html += template.body + "\n"

    if (template.title !== undefined)
        html += template.title + "\n"

    if (template.simpleSection !== undefined)
        html += template.simpleSection + "\n"

    if (template.leftSection1 !== undefined)
        html += template.leftSection1 + "\n"

    if (template.rightSection1 !== undefined)
        html += template.rightSection1 + "\n"

    if (template.footer !== undefined)
        html += template.footer

    return html
}

export default {
    header: buildHeader,
    footer: buildFooter,
    body: buildBody,
    getHtml: buildHtmlCode,
    title: title,
    simpleSection: simpleSection,
    rightSection1: rightSection1,
    leftSection1: leftSection1
}
