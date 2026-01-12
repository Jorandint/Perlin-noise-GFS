import { noise_generator } from './noise.js';
import { updateCamera } from './camera.js';
import { setupCamera } from './camera.js';

class NoiseScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key : 'NoiseScene', active: true});
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
        let parameters = this.scene.get('uiscene').settings;
        console.log(parameters);
        const generator = new noise_generator();
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
                this.mainlayer.putTileAt(index, x, y);
            }   
        }
    }
}
class uiscene extends Phaser.Scene{
    constructor ()
    {
        super({ key : 'uiscene', active: true});
        this.options = { scale: 40, octaves: 4, persistence: 0.5, lacunarity: 2 };
        this.settings = {noisewidth: 500, noiseheight: 400, seed: "djwqoerf72", options: this.options};
        
    }
    preload (){
    }
    create (){
        
    }
    update (){

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
        height: 600,
        expandParent: true,
        resizeInterval: 50,
      },
};

var game = new Phaser.Game(config);