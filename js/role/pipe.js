var Pipe = (function () {

    var pipeLength = 0;

    function Pipe(options) {

        this.imgDown = options.imgDown;
        this.imgUp = options.imgUp;
        this.ctx = options.ctx;
        this.LRSpace = options.LRSpace;
        this.TBSpace = options.TBSpace||200;
        this.yMax = options.yMax || 350;
        this.yMin = options.yMin || 125;
        this.w = this.imgDown.width
        this.h = this.imgDown.height;
        this.speed = options.speed || 5;
        this.aspeed = options.aspeed || 0.003;

        this.x = options.x||150;
        this.y = 0;
        this.yBottom = 0;

        pipeLength++;
        this.randomY();
    }

    until.extend(Pipe.prototype, {
        draw: function () {
            
            this.ctx.drawImage(this.imgDown, this.x, this.y);
            this.ctx.drawImage(this.imgUp, this.x, this.yBottom);
            this.ctx.rect(this.x,this.y, this.w, this.h);
            this.ctx.rect(this.x,this.yBottom, this.w, this.h);
            // this.ctx.lineWidth=10;
            // this.ctx.stroke();
            this.updata();
            
        },
        randomY: function () {
            
            this.y = until.getRandom(this.yMin, this.yMax) - this.h;
            this.yBottom = this.h+this.y + this.TBSpace;
        },
        updata: function () {
            this.x -= this.speed;
            this.speed += this.aspeed;
            if (this.x <= -this.w) {
                this.x += (this.w + this.LRSpace) * pipeLength;
                this.randomY();
            }
        }

    })

    return Pipe;
})();