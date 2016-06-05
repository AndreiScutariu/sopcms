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

function title() {
    return "Title"
}

function simpleSection() {
    return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}

export  function rightSection1() {
    return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}

export function leftSection1() {
    return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}


export default {
    header: header,
    body: body,
    footer: footer,
    title: title,
    simpleSection: simpleSection,
    rightSection1: rightSection1,
    leftSection1: leftSection1
}