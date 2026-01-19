import { TextButton } from "./widgets.js";

export function createtext(scene){
    scene.add.text(10, 10, 'Press G to generate new noise', { font: '16px Courier', fill: '#00ff00' });
        scene.add.text(10, 26, 'Press UP/DOWN to change scale', { font: '16px Courier', fill: '#00ff00' });
        scene.add.text(10, 42, 'Press LEFT/RIGHT to change octaves', { font: '16px Courier', fill: '#00ff00' });
        scene.scaletext = scene.add.text(500, 26, `Scale: ${scene.settings.options.scale}`+  `     Octaves: ${scene.settings.options.octaves}` + `     Seed: ${scene.settings.seed}`,
             { font: '16px Courier', fill: '#00ff00' });
}
export function buttons(scene){
    let genButton = new TextButton(scene, 100, 100, "Generate Noise", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.scene.get('NoiseScene').generate_new_noise();
    });
    let scaleinc = new TextButton(scene, 100, 140, "Increase Scale", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.settings.options.scale += 5;
    });
    let scaledec = new TextButton(scene, 100, 180, "Decrease Scale", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.settings.options.scale -= 5;
        if(scene.settings.options.scale < 1){
                scene.settings.options.scale = 1;
            }
    });
    let octaveinc = new TextButton(scene, 100, 220, "Increase Octaves", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.settings.options.octaves += 1;
    });
    let octavedec = new TextButton(scene, 100, 260, "Decrease Octaves", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.settings.options.octaves -= 1;
        if(scene.settings.options.octaves < 1){
                scene.settings.options.octaves = 1;
            }
    });
    let seedinput = new TextButton(scene, 100, 300, "Input Seed", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.scene.launch('inputscene');
    });
}
export function input(scene){
    let keyObject = scene.input.keyboard.addKey("G", false, false);
        keyObject.on('down', () => {
            scene.scene.get('NoiseScene').generate_new_noise();
        });
        scene.input.keyboard.on('keydown-UP', () => {
            scene.settings.options.scale += 5;
        });
        scene.input.keyboard.on('keydown-DOWN', () => {
            scene.settings.options.scale -= 5;
            if(scene.settings.options.scale < 1){
                scene.settings.options.scale = 1;
            }
        });
        scene.input.keyboard.on('keydown-LEFT', () => {
            scene.settings.options.octaves -= 1;
        });
        scene.input.keyboard.on('keydown-RIGHT', () => {
            scene.settings.options.octaves += 1;
            if(scene.settings.options.octaves < 1){
                scene.settings.options.octaves = 1;
            }
        });
}
export function updateUi(scene){
    scene.scaletext.setText(`Scale: ${scene.settings.options.scale}`+`      Octaves: ${scene.settings.options.octaves}`+`      Seed: ${scene.settings.seed}`, { font: '16px Courier', fill: '#00ff00' });
}