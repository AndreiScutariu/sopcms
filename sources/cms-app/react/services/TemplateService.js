import Http from 'http'

var host = 'localhost:9000'
var uri = '/api/templates'

function getData(callback) {
    return Http.get({
        host: host,
        path: uri
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
}

function saveTemplate (state) {

    var model = {}
    model.name = state.name;
    model.category = state.category;
    model.template = state.getHtml();
    model.model = JSON.stringify(state.model);

    var post_options = {
        host: host,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var post_req = Http.request(post_options, function(res) {
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(JSON.stringify(model));
    post_req.end();
}

export default {
    getAll: getData,
    save: saveTemplate
}
