// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                //puts the mario character
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {
                    return (new me.Rect(0, 0, 30, 128)).toPolygon();
                }

            }]);

        this.renderable.addAnimation("idle", [3]);
        //creates an animation for the character walking without powerups called smallwalk
        //adds an arrey of values 8-13 which are the pictures for the animation 
        //the speed for the character
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);

        this.renderable.setCurrentAnimation("idle");

        //the first number sets the speed mario moves on x aaxis, the second sets the speed ont the y axis
        this.body.setVelocity(5, 20);
        
        //makes the screen(viewport) follow mario's position(pos) on both x and y axes
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },
    update: function(delta) {
        //checks if the right key is pushed down
        if (me.input.isKeyPressed("right")) {
            //adds value to mario's x position based on the x value from setVelocity above
            //me.timer.tick smooths the animation for irregular updates
            this.body.vel.x += this.body.accel.x * me.timer.tick;

        } else {
            //velocity of x equals 0
            this.body.vel.x = 0;
        }
        
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        this._super(me.Entity, "update", [delta]);
        return true;

    },
    
    collideHandler: function(response) {
        
    }

});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, settings]);
        //sets what happens wwhen this body collides with something to a function called onCollision and 
        //passes this level trigger as a hidden parameter
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    
    onCollision: function(){
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        //pass through the level trigger it will load the second level
        me.levelDirector.loadLevel(this.level);
        //where to spawn Mario on the second map
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
    
});

game.BadGuy = me.Entity.extend({
    init: function(x, y, settings) {
          this._super(me.Entity, 'init', [x, y, {
                  //puts the Bad Guy character
                image: "slime",
                spritewidth: "60",
                spriteheight: "28",
                width: 60,
                height: 28,
                getShape: function() {
                    return (new me.Rect(0, 0, 60, 28)).toPolygon();
                }

            }]);
        
        this.spritewidth = 60;
        var width = settings.width;
        x = this.pos.x;
        this.StartX = x;
        this.endX = x + width - this.spritewidth;
        this.pos.x = x + width - this.spritewidth;
        this.updateBounds();
        
        this.alwaysUpdate = true;
        
        this.walkLeft = false;
        //the Bad Guy will start alive
        this.alive = true;
        this.type = "badguy";
        
        //this.renderable.addAnimation("run", [0, 1, 2], 80);
        //this.renderable.setCurrentAnimation("run");
        
        this.body.setVelocity(4, 6);
        
    },
    
    update: function(delta) {
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if(this.alive){
            if(this.walkLeft && this.pos.x <= this.startX){
                this.walkLeft = false;
            }else if(!this.walkLeft && this.pos.x >= this.endX){
                this.walkLeft = true;
            }
            this.flipX(!this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
            
        }else{
            me.game.world.removeChild(this);
        }
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(){
        
    }
    
});