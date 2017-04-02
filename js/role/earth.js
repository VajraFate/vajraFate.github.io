
    var Earth = (function () {
        var earthTotal = 0;

        function Earth(options) {
            this.ctx = options.ctx;
            this.img = options.img;
            this.w = this.img.width;
            this.h = this.img.height;
            this.speed = options.speed || 5;
            this.x = options.x || 0;
            this.y = options.y || 0;
            earthTotal++;
        }
        Earth.prototype = {
            draw: function () {
                this.ctx.drawImage(this.img, this.x, this.y);
                this.updata();
            },
            updata: function () {

                this.x -= this.speed;
                if (this.x <= -this.w) {
                    this.x += this.w * earthTotal;
                    // console.log(this.x);
                }
            }
        }
        return Earth
    })();
