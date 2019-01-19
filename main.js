'use strict';

const findJsonMimeType = function (header) {
    if (header.name === undefined) {
        return false;
    }
    return header.name.toLowerCase() === 'content-type' && header.value.includes('json');
};

const isJsonFile = function (url) {
    if (url === undefined) {
        return false;
    }
    return url.split('?').shift().endsWith('.json');
};

const overrideJsonHeader = function (request) {
    return new Promise((resolve) => {
        if (request.responseHeaders.find(findJsonMimeType) || isJsonFile(request.url)) {
            const jsonHeader = {
                name: 'Content-Type',
                value: 'application/json'
            };
            request.responseHeaders.push(jsonHeader);
        }

        resolve({responseHeaders: request.responseHeaders});
    });
};

browser.webRequest.onHeadersReceived.addListener(
    overrideJsonHeader,
    {
        urls: [ '<all_urls>' ]
    },
    [
        'blocking',
        'responseHeaders'
    ]
);

exports.findJsonMimeType = findJsonMimeType;
exports.overrideJsonHeader = overrideJsonHeader;
