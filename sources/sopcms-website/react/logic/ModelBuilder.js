import http from "http"

function header() {
    return "Header"
}

function body() {
    return "Body text"
}

function footer() {
    return "Footer"
}

export default {
    header: header,
    body: body,
    footer: footer
}
