function CreatFlyBird(options) {
    

    this.bgMusic=bgMusic;
    this.dieMusic=dieMusic;
    this.jumpMusic=jumpMusic;

    this.container = options.container;
    this.imgSrc = options.imgSrc;
    //检查是否狗带
    this.Die = false;
    // 检测是否按了作弊按钮
    this.isOn = false;

    // 所有对象的整合
    this.roles = {
        skyArr: [],
        pipeArr: [],
        landArr: [],
        timeArr: [],
        birdArr: [],
    };

    this.BirdwidthFrame=options.BirdwidthFrame||3;
    this.BirdheightFrame=options.BirdheightFrame||1;
    this.Birddirection=options.Birddirection||0;

    // 背景音乐
    this.bgMusic=options.bgMusic||0;



}


CreatFlyBird.prototype = {

    // 运行 渲染js 渲染游戏                  
    run: function () {
        imgLoad(this.imgSrc, function (objImg) {

            // 获取对应图片
            this.ctx = until.getCtx(this.container, objImg.sky.width, objImg.sky.height);
            this.ctxW = this.ctx.canvas.width;
            this.ctxH = this.ctx.canvas.height;
            this.objImg = objImg;


            // 加入相应的公共属性 生成相应的工厂函数
            this.factory = factory({
                ctx: this.ctx
            });


            // 创建对应 实例
            this.initRole();


            // 刷新 帧 更新每个实例的相应状态 重新渲染画面 
            this.loop();

            // 注册相应事件
            this.bind();


        }.bind(this));

    },

    // 检查 是否 狗带
    godie: function () {
        var roles = this.roles;
        var bird = roles.birdArr[0];
        var bX = bird.x + bird.w / 2;
        var bY = bird.y + bird.h / 2;
        var ctx = this.ctx;
        if (bY <= 0 || bY >= roles.landArr[0].y - 10) {
            // clearInterval(loop);
            this.isDie = true;
        } else if (ctx.isPointInPath(bX, bY)) {
            // clearInterval(loop);
            console.log('in');
            this.isDie = true;
        } else {
            this.isDie = false;
        }
    },

    // 求需要图片的数量,给下面 主渲染画面的函数 
    getNum: function (ctxW, landW) {
        return Math.ceil(ctxW / landW) + 1
    },

    // 计算出对应 对象的位置，并且创建对应的 对象实例
    initRole: function () {
        var objImg = this.objImg;
        var ctx = this.ctx;
        var ctxW = ctx.canvas.width;
        var ctxH = ctx.canvas.height;

        var roles = this.roles;
        var getNum = this.getNum;


        var BirdwidthFrame=this.BirdwidthFrame;
        var BirdheightFrame=this.BirdheightFrame;
        var Birddirection=this.Birddirection;

        // 获取land数量
        var landLength = getNum(ctxW, objImg.earth.width);

        // 获取sky数量

        var skyLength = getNum(ctxW, objImg.sky.width);

        // 获取pipe数量
        var pipeLength = getNum(ctxW, objImg.pipeDown.width + 150);

        // 应用工厂函数创建相应的 实例:::
        var factory = this.factory;


        // 创建 地板实例
        for (var i = 0; i < landLength; i++) {
            roles.landArr.push(factory("Earth", {
                // ctx: ctx,
                img: objImg.earth,
                y: objImg.sky.height - objImg.earth.height,
                x: objImg.earth.width * i
            }))
        }

        // 创建 背景实例
        for (var i = 0; i < landLength; i++) {
            roles.skyArr.push(factory("Sky", {
                // ctx: ctx,
                img: objImg.sky,
                x: objImg.sky.width * i
            }))
        }

        // 创建 管道实例
        for (var i = 0; i < pipeLength; i++) {
            roles.pipeArr.push(factory("Pipe", {
                // ctx: ctx,
                imgUp: objImg.pipeUp,
                imgDown: objImg.pipeDown,
                LRSpace: 250,
                TBSpace: 125,
                x: 250 + (objImg.pipeUp.width + 250) * i,
            }))
        }



        // 创建 时间 实例
        roles.timeArr.push(factory("Timer"))

        // 创建 小鸟实例
        roles.birdArr.push(factory("Bird", {
            // ctx: ctx,
            img: objImg.bird,
            widthFrame: 4,
            heightFrame: 4,
            direction :2

        }))


    },

    // 注册相应事件
    bind: function () {
        var ctx = this.ctx;
        var roles = this.roles;
        var jumpMusic=this.jumpMusic;
        // var isDie = this.isDie;
        // var isOn = this.isOn;

        ctx.canvas.addEventListener('click', function () {
            roles.birdArr[0].flappyUp();
            // jumpMusic.play();
            // console.log(111);
        })
        window.onkeydown = function (e) {
            if (e.keyCode == 86) {
                // console.log('vvv');
                this.isDie = false;
                this.isOn = true;
            }
            window.onkeyup = function () {
                this.isOn = false;
                // isDie = true;
            }.bind(this);
        }.bind(this);
    },

// 重新渲染画面 在里面判断是否死亡,是否需要继续执行 渲染
    loop: function () {
        var ctx = this.ctx;
        var roles = this.roles;
        var godie = this.godie;
        var isDie = this.isDie;
        var isOn = this.isOn;
        var loop = this.loop;
        var ctxW = this.ctxW;
        var ctxH = this.ctxH;
        var self = this;

        requestAnimationFrame(function () {
            ctx.clearRect(0, 0, ctxW, ctxH);
            ctx.beginPath();
            // 检测是否狗带   

            // 更新每个实例 相应的状态
            for (var key in roles) {
                roles[key].forEach(function (key, i) {
                    // 计算相应对象的相应状态
                    key.draw();
                })
            }

            //判断是否按下,按下不判断 刷新死亡判断
            if (!isOn) {
                self.godie();
            }

            // 判断是否死了,死了不刷新
            if (!isDie) {
                self.loop();
            }
            else{
                bgMusic.pause();
                dieMusic.play();
            }

        });
    }

}