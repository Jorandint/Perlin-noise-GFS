import { noise_generator } from './noise.js';
import { updateCamera } from './camera.js';
import { setupCamera } from './camera.js';
import { input } from './ui.js';
import { createtext } from './ui.js';
import { updateUi } from './ui.js';
import { buttons } from './ui.js';
import { setupinput } from './inputscene.js';
import { updateinput } from './inputscene.js';

class NoiseScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key : 'NoiseScene', active: true});
        this.tilemap = null;
        this.mainlayer = null;
    }
    preload ()
    {
        console.log("preloading noisescene")
        this.load.image("tile", "assets/gradientTiles.png")
    }


    create ()
    {
        this.generate_new_noise();
        setupCamera(this);
        console.log(this)
    }


    update ()
    {
       updateCamera(this);
    }


    generate_new_noise(){
        this.tilemap = null;
        this.mainlayer = null;
        let parameters = this.scene.get('uiscene').settings;
        console.log(parameters);
        let generator = new noise_generator();
        generator.seed(parameters.seed);
        this.tilemap = this.make.tilemap({tileWidth: 1, tileHeight: 1, width: parameters.noisewidth, height: parameters.noiseheight});
        const tileset = this.tilemap.addTilesetImage("tile");
        
        this.mainlayer = this.tilemap.createBlankLayer(0, tileset, 0, 0);
        this.mainlayer.setScale(4);
        
        const tilesCount = (tileset && tileset.total) ? tileset.total : 26;

        for(let y = 0; y < parameters.noiseheight; y++){
            for(let x = 0; x < parameters.noisewidth; x++){
                const v = generator.noise(x, y, parameters.options);
                const index = Math.floor(v * (tilesCount - 1));
                this.mainlayer.putTileAt(index+3, x, y);
            }   
        } 
        generator = null;
        }
}  
class uiscene extends Phaser.Scene{
    constructor ()
    {
        super({ key : 'uiscene', active: true});
        this.tempinf = "";
        this.options = { scale: 40, octaves: 4, persistence: 0.5, lacunarity: 2 };
        this.settings = {noisewidth: 300, noiseheight: 200, seed: "000000", options: this.options};
    }
    preload (){
        this.updateseed = false;
        this.updatewidth = false;
        this.updateheight = false;
    }
    create (){
        createtext(this);
        input(this);
        buttons(this);
    }
    update (){
        updateUi(this);
        
    }
}
class inputscene extends Phaser.Scene{
    constructor ()
    {
        super({ key : 'inputscene', active: false});
        this.currentcont = "";
    }
    preload (){

    }
    create (){
        setupinput(this);
    }
    update (){
        updateinput(this);
    }

}
var config = {
    type: Phaser.AUTO,
    inputTouch: true,
    pixelArt: true,
    scrolling: false,
    backgrundColor: '#c52222ff',
    scene: [NoiseScene, uiscene, inputscene], 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1200,
        height: 600,
        expandParent: true,
        resizeInterval: 50,
      },
};

var game = new Phaser.Game(config);
