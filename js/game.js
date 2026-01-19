import { noise_generator } from './noise.js';
import { updateCamera } from './camera.js';
import { setupCamera } from './camera.js';

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
        generator.seed(Math.floor(Math.random()*100000));
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
        this.options = { scale: 40, octaves: 4, persistence: 0.5, lacunarity: 2 };
        this.settings = {noisewidth: 100, noiseheight: 90, seed: "djwqoerf72", options: this.options};
        
    }
    preload (){
    }
    create (){
        this.add.text(10, 10, 'Press G to generate new noise', { font: '16px Courier', fill: '#00ff00' });
        this.add.text(10, 26, 'Press UP/DOWN to change scale', { font: '16px Courier', fill: '#00ff00' });
        this.add.text(10, 42, 'Press LEFT/RIGHT to change octaves', { font: '16px Courier', fill: '#00ff00' });
        this.scaletext = this.add.text(500, 26, `Scale: ${this.settings.options.scale}`+  `     Octaves: ${this.settings.options.octaves}`, { font: '16px Courier', fill: '#00ff00' });
        let keyObject = this.input.keyboard.addKey("G", false, false);
        keyObject.on('down', () => {
            this.scene.get('NoiseScene').generate_new_noise();
        });
        this.input.keyboard.on('keydown-UP', () => {
            this.settings.options.scale += 5;
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.settings.options.scale -= 5;
            if(this.settings.options.scale < 1){
                this.settings.options.scale = 1;
            }
        });
        this.input.keyboard.on('keydown-LEFT', () => {
            this.settings.options.octaves -= 1;
        });
        this.input.keyboard.on('keydown-RIGHT', () => {
            this.settings.options.octaves += 1;
        });
    }
    update (){
        this.scaletext.setText(`Scale: ${this.settings.options.scale}`+ `     Octaves: ${this.settings.options.octaves}`, { font: '16px Courier', fill: '#00ff00' });
        
    }
}
class StartScene extends Phaser.Scene{
    constructor ()
    {
        super({ key : 'StartScene', active: false});
    }
    preload (){}
    create (){
        //this.scene.start('uiscene');
        //this.scene.start('NoiseScene');
    }
    update (){
        //this.scene.start('uiscene');
        //this.scene.start('NoiseScene'); 
        //this.scene.stop('StartScene');
    }

}
var config = {
    type: Phaser.AUTO,
    inputTouch: true,
    pixelArt: true,
    scrolling: false,
    backgrundColor: '#c52222ff',
    scene: [NoiseScene, uiscene, StartScene], 
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1200,
        height: 800,
        expandParent: true,
        resizeInterval: 50,
      },
};

var game = new Phaser.Game(config);
