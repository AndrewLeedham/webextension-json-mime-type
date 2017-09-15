'use strict';

function getContentTypes() {
    return browser.storage.sync.get('contentTypes');
}

function addContentType() {
    const contentTypesPromise = getContentTypes();
    contentTypesPromise.then((res) => {
        let contentTypes = res.contentTypes;
        console.log('prepare to save' + res.contentTypes);
        if (!contentTypes) {
            contentTypes = [];
        }

        // we use a set here in order to avoid duplicated values
        let contentTypesSet = new Set(contentTypes);
        contentTypesSet.add(document.querySelector('#contentType').value);

        browser.storage.sync.set({
            contentTypes: Array.from(contentTypesSet)
        });
    });
}

function restoreOptions() {
    const contentTypes = getContentTypes();
    contentTypes.then((res) => {
        if (res.contentTypes && res.contentTypes.length > 0) {
            console.log('content types to restore : ' + res.contentTypes);
            for (const contentType of res.contentTypes) {
                console.log('add to the list : ' + contentType);
                const li = document.createElement('li');
                const text = document.createTextNode(contentType);
                li.appendChild(text);
                document.getElementById('overriddenContentTypes').appendChild(li);
            }
        }
    });
}

function deleteOptions() {
    browser.storage.sync.clear();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('add').addEventListener('click', addContentType);
document.getElementById('deleteAll').addEventListener('click', deleteOptions);
