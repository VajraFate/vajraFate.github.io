function Bird(options) {
    this.ctx = options.ctx;
    this.img = options.img;
    this.widthFrame = options.widthFrame;
    this.heightFrame = options.heightFrame;
    this.w = this.img.width / this.widthFrame;
    this.h = this.img.height / this.heightFrame;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.speed = options.speed || 3;
    this.direction=options.direction||0
    this.aSpeed = 0.3;
    this.index = 0;
    this.maxRandian = Math.PI / 4;
    this.minRandian = -Math.PI / 3;
    this.randian = Math.PI / 18;

    // 刷新太快 人物动得太厉害,通过加一个伐 来限制速度
    this.flash=0;
}

until.extend(Bird.prototype, {
    draw: function () {
        var radian = this.randian * this.speed;
        radian=radian>this.maxRandian?this.maxRandian:radian;
        radian=radian>this.minRandian?radian:this.minRandian;
        this.ctx.save();
        // 使小鸟旋转
        this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        
        this.ctx.rotate(radian);

        this.ctx.drawImage(this.img,
            this.w * this.index, this.direction*this.h, this.w, this.h,
            -this.w/2, -this.h/2, this.w, this.h);

        this.ctx.restore();
        this.updata();
    },
    updata: function () {
        if(++this.flash%5==0){
            this.index++;
        }
        this.index = this.index % this.widthFrame;
        this.y += this.speed;
        this.speed += this.aSpeed;


    },
    flappyUp: function () {
        this.speed = -5;
    }
})