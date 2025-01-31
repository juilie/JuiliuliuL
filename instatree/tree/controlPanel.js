let controls = {};

function sendValue(name, value) {
    window.opener.postMessage({
        type: 'control',
        name: name,
        value: value
    }, '*');
}

function createControl(name, element) {
    controls[name] = element;
    return element;
}

function setup() {
    noCanvas();
    
    // Animations
    createControl('rotationRange', 
        createSlider(0, 1000, 20)
            .parent(createDiv('Rotation Range').parent(select('#animations')))
            .input(() => sendValue('rotationRange', controls.rotationRange.value()))
    );

    createControl('rotationMod',
        createSlider(0, 360, 0)
            .parent(createDiv('Rotation Mod').parent(select('#animations')))
            .input(() => sendValue('rotationMod', controls.rotationMod.value()))
    );

    // Misc Controls
    createControl('eggMode',
        createCheckbox('Egg Mode', false)
            .parent(select('#misc'))
            .changed(() => sendValue('eggMode', controls.eggMode.checked()))
    );

    createControl('threeDMode',
        createCheckbox('3D Mode', false)
            .parent(select('#misc'))
            .changed(() => sendValue('threeDMode', controls.threeDMode.checked()))
    );

    // Leaves
    createControl('leafSize',
        createSlider(0, 580, 0)
            .parent(createDiv('Leaf Size').parent(select('#leaves')))
            .input(() => sendValue('leafSize', controls.leafSize.value()))
    );

    // Continue with all other controls...
    // [Additional control creation code following the same pattern]

    // Sync initial values
    Object.entries(controls).forEach(([name, control]) => {
        if (control.value) {
            sendValue(name, control.value());
        } else if (control.checked) {
            sendValue(name, control.checked());
        }
    });
}

// Prevent accidental window closing
window.onbeforeunload = function() {
    return "Closing this window will disconnect the controls. Continue?";
}; 