function Timer(options){
    this.ctx=options.ctx;
    this.x=options.x||this.ctx.canvas.width;
    this.y=options.y||0;
    this.textAlign=options.textAlign||"right";
    this.textBaseline=options.textBaseline||"top";
    this.fillStyle=options.fillStyle||'hotpink';
    this.font=options.font||'20px 微软雅黑';
    this.gameRunTimer=options.gameRunTimer||0;
    this.lastTime=options.lastTime||Date.now();
}
    until.extend(Timer.prototype,{
        draw:function(){
            this.updata();
            this.ctx.save();

            var text=this.format();
            this.ctx.textAlign=this.textAlign;
            this.ctx.textBaseline=this.textBaseline;
            this.ctx.fillStyle=this.fillStyle;
            this.ctx.font=this.font;
            this.ctx.fillText(text,this.x,this.y);
            // this.ctx.fill();

            this.ctx.restore();
        },
        updata:function(){
            var now=Date.now();
            this.gameRunTimer+=now-this.lastTime;
            this.lastTime=now;
            // console.log( this.gameRunTime);
        },
        format:function(){
            var min=Math.floor(this.gameRunTimer/1000/60);
            var secend=Math.floor(this.gameRunTimer/1000%60);
            var os=Math.floor(this.gameRunTimer%100);
            var oss=Math.floor(this.gameRunTimer%10);

            return "坚挺了"+min+"min"+secend+"."+os+""+oss+"s";
        }



    })