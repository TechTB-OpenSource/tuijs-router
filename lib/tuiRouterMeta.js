import { checkIsObject } from 'ttbjs';

export function metaUpdateHead(metaData) {
    try {
        if (!checkIsObject(metaData)) {
            throw 'Data provided is not an object.'
        }
        if (metaData.title) {
            document.title = metaData.title;
        }
        if (metaData.name) {
            Object.keys(metaData.name).forEach(key => {
                const keyValue = metaData.name[key];
                metaUpdateTag('name', key, keyValue);
            });
        }
        if (metaData.property) {
            Object.keys(metaData.property).forEach(key => {
                const keyValue = metaData.property[key];
                metaUpdateTag('property', key, keyValue);
            });
        }
        if (metaData.itemprop) {
            Object.keys(metaData.itemprop).forEach(key => {
                const keyValue = metaData.itemprop[key];
                metaUpdateTag('itemprop', key, keyValue);
            });
        }
        return;
    } catch (er) {
        throw new Error(er);
    }
}

function metaUpdateTag(label, labelValue, content) {
    try {
        const existingMetaTag = document.querySelector(`meta[${label}="${labelValue}"]`);
        if (existingMetaTag) {
            existingMetaTag.remove();
        }
        const metaTag = document.createElement('meta');
        metaTag.setAttribute(label, labelValue);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
        return;
    } catch (er) {
        throw new Error(er);
    }
}

function metaRemoveTag(label, labelValue) {
    try {
        const existingMetaTag = document.querySelector(`meta[${label}="${labelValue}"]`);
        if (existingMetaTag) {
            existingMetaTag.remove();
        }
        return;
    } catch (er) {
        throw new Error(er);
    }
}
