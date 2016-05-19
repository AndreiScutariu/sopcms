import Http from 'http'

function randomText() {
    
}

function iterate(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property]);
            }
            else {
                obj[property] = '';
            }
        }
    }
}

function populateModel (model) {
    iterate(model)
    return model
}

export default {
    randomPopulate: populateModel
}
