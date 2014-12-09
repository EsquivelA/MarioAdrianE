game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
        //image for background tiles
        {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
        //image for meta tiles
        {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
        //image for mario character
        {name: "mario", type:"image", src: "data/img/player1.png"},
        //image for title screen
        {name: "title-screen", type:"image", src: "data/img/title-screen.png"},
        //image for Bad Guy character
        {name: "slime", type:"image", src: "data/img/slime-spritesheet.png"},
        //image for mushroom power up
         {name: "mushroom", type:"image", src: "data/img/mushroom.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
        //gets the maps I made on Tiled
        {name: "Level01", type: "tmx", src: "data/map/level04.tmx"},
        {name: "Level02", type: "tmx", src: "data/map/level05.tmx"}

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
