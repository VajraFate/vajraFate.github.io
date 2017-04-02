   var Sky = (function () {
        var skyTotal = 0;

        function Sky(options) {
            this.ctx = options.ctx;
            this.img = options.img;
            this.x = options.x || 0;
            this.y = 0;
            this.w = this.img.width;
            this.h = this.img.height;
            this.speed = options.speed || 5;
            skyTotal++;
        }
        until.extend(Sky.prototype, {
            draw: function () {
                this.ctx.drawImage(this.img, this.x, this.y);
                this.updata();
            },
            updata: function () {

                this.x -= this.speed;
                if (this.x <= -this.w) {
                    this.x += this.w * skyTotal;
                }
            }
        })
        return Sky;
    })();