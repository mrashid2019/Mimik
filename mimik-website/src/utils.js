
const createAudioElement = (audioUrl, elementId) => {
    let audioEl = new Audio(audioUrl);
    audioEl.id = elementId;
    audioEl.style.marginLeft = '10px';
    audioEl.style.marginRight = '10px';
    audioEl.controls = true;
    return audioEl;
}

const createAudioElementFromBlob = (blob, elementId) => {
    const url = URL.createObjectURL(blob);
    let audioEl = createAudioElement(url, elementId);
    return audioEl
}

function extractBlob(target) {
    // console.log(target)
    const file = target.files[0];

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
        reader.onload = function () {
            try {
                const blob = new Blob([reader.result], { type: 'audio/wav' });
                resolve(blob)
            } catch (error) {
                reject(error)
            }
        };
    }).catch(err => { console.log(err) })
}

const filterAudioContainer = (container, elementId) => {
    container.childNodes.forEach(
        (child) => {

            if (child.id === elementId) {
                console.log(child);
                container.removeChild(child);
            }
        }
    )
}

const addElementToContainer = (el, containerId) => {
    let container = document.getElementById(containerId);
    filterAudioContainer(container, el.id)
    container.append(el);
    return container;
}

export { addElementToContainer, createAudioElementFromBlob, extractBlob, filterAudioContainer }