import { TextButton } from "./widgets.js";
export function setupinput(scene){
    scene.text1 = scene.add.text(500, 126, `${scene.currentcont}`, { font: '16px Courier', fill: '#00ff00' });
    let onebutton = new TextButton(scene, 200, 100, "1", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "1";
        console.log(scene.currentcont);
    });
    let twobutton = new TextButton(scene, 200, 130, "2", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "2";
    });
    let threebutton = new TextButton(scene, 200, 160, "3", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "3";
    });
    let fourbutton = new TextButton(scene, 230, 100, "4", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "4";
    });
    let fivebutton = new TextButton(scene, 230, 130, "5", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "5";
    });
    let sixbutton = new TextButton(scene, 230, 160, "6", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "6";
    });
    let sevenbutton = new TextButton(scene, 260, 100, "7", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "7";
    });
    let eightbutton = new TextButton(scene, 260, 130, "8", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "8";
    });
    let ninebutton = new TextButton(scene, 260, 160, "9", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "9";
    });
    let zerobutton = new TextButton(scene, 200, 190, "0", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = scene.currentcont + "0";
    });
    let clearbutton = new TextButton(scene, 230, 190, "C", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        scene.currentcont = "";
    });
    let donebutton = new TextButton(scene, 260, 190, "q", { font: '16px Courier', fill: '#00ff00' }, (scene) => {
        done(scene);
    });
}
export function updateinput(scene){
    scene.text1.setText(`${scene.currentcont}`, { font: '16px Courier', fill: '#00ff00' });
}
function done(scene){
    scene.scene.get('uiscene').tempinf = scene.currentcont;
    
    scene.scene.stop('inputscene');
}



