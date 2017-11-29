import { Golbal } from "./Golbal";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //题目内容
    @property(cc.Label)
    lblQ: cc.Label = null;

    //答案数组
    @property([cc.Label])
    lblAnswer: cc.Label[] = [];

    @property(Golbal)
    golbal: Golbal = null;


    @property(cc.Node)
    zhongzi: cc.Node = null;

    @property(cc.Label)
    jifen: cc.Label = null;


    //生命状态图集
    @property(cc.SpriteAtlas)
    lifeSpriteAtlas: cc.SpriteAtlas = null;

    @property(cc.Sprite)
    lifeState: cc.Sprite = null


    @property(cc.Node)
    jiaoShui: cc.Node = null;


    @property(cc.Node)
    huafei: cc.Node = null;

    @property(cc.Node)
    chucao: cc.Node = null;

    @property(cc.Node)
    zacaoAnim: cc.Node[] = [];

    @property(cc.Node)
    yangguang: cc.Node = null;

    numLifeState: number = 0;
    currentJiFen: number = 0;
    currentQuestion: number = 0;//当前题目（总共5题，从0开始）
    arrQuestion: any = [];
    isLoading: boolean = false;


    // onLoad () {},
    start() {
        this.loadQuestion(this.currentQuestion);
        //设置光标
        this.lblAnswer.forEach(element => {
            element.node.on(cc.Node.EventType.MOUSE_ENTER, this.golbal.setCursor, this);
            element.node.on(cc.Node.EventType.MOUSE_LEAVE, this.golbal.clearCursor, this);
            element.node.on("touchstart", this.selectAnswer, this);
        })
    }
    //加载问题
    loadQuestion(currentQuestion) {
        let self = this;
        cc.loader.loadRes("subject", (err, result) => {
            self.arrQuestion = result;
            self.lblQ.string = result[currentQuestion].question;
            self.lblAnswer.forEach((element, index) => {
                element.string = result[currentQuestion].answer[index];
            });
        })
    }
    //选择答案
    selectAnswer(event) {
        if (this.isLoading) return false;
        this.isLoading = true;
        let answer = event.target.getComponent(cc.Label).string;//选择的答案
        let answerOk = this.arrQuestion[this.currentQuestion].answerOk;//正确答案
        if (answer == answerOk) {
            cc.log("答案正确")

            if (this.currentQuestion == 0) {
                let anim_ZhongZi = this.zhongzi.getComponent(cc.Animation);
                anim_ZhongZi.play("zhongzi");
                anim_ZhongZi.once("finished", this.onZhongZhiFinished, this);//种子动画结束
            } else if (this.currentQuestion == 1) {
                let anim_jaoShui = this.jiaoShui.getComponent(cc.Animation);
                anim_jaoShui.play("jaoshui");
                anim_jaoShui.once("finished", this.onJiaoShuiFinished, this);//浇水动画结束
            } else if (this.currentQuestion == 2) {
                let anim_huafei = this.huafei.getComponent(cc.Animation);
                anim_huafei.play("huafeipass");
                anim_huafei.once("finished", this.onHuaFeiFinished, this);//浇水动画结束
            } else if (this.currentQuestion == 3) {
                let anim_chucao = this.chucao.getComponent(cc.Animation);
                anim_chucao.play("chucaopass");
                anim_chucao.once("finished", this.onChuCaoFinished, this);//浇水动画结束
            } else if (this.currentQuestion == 4) {
                let anim_yangguang = this.yangguang.getComponent(cc.Animation);
                anim_yangguang.play("yangguangpass");
                anim_yangguang.once("finished", this.onYangGuangFinished, this);//浇水动画结束
            }
        } else {
            cc.log("答案错了")

            if (this.currentQuestion == 0) {
                let anim_ZhongZi = this.zhongzi.getComponent(cc.Animation);
                anim_ZhongZi.play("error1");
                anim_ZhongZi.once("finished", this.onZhongZiError, this);
            }
            else if (this.currentQuestion == 1) {
                let anim_jaoShui = this.jiaoShui.getComponent(cc.Animation);
                anim_jaoShui.play("error2");
                anim_jaoShui.once("finished", this.onJaoShuiError, this);
            }
            else if (this.currentQuestion == 2) {
                let anim_huafei = this.huafei.getComponent(cc.Animation);
                anim_huafei.play("huafei");
                anim_huafei.once("finished", this.onHuaFeiError, this);
            } else if (this.currentQuestion == 3) {
                let anim_chucao = this.chucao.getComponent(cc.Animation);
                anim_chucao.play("chucao");
                anim_chucao.once("finished", this.onChuCaoError, this);
            } else if (this.currentQuestion == 4) {
                let anim_yangguang = this.yangguang.getComponent(cc.Animation);
                anim_yangguang.play("sunerror");
                anim_yangguang.once("finished", this.onYangGuangError, this);
            }
        }
    }
    //正确答案回调
    onZhongZhiFinished() {
        this.currentJiFen = this.currentJiFen + 20;
        this.jifen.string = this.currentJiFen.toString();
        this.currentQuestion = this.currentQuestion + 1;
        this.loadQuestion(this.currentQuestion);
        this.isLoading = false;
    }
    //错误答案回调
    onZhongZiError() {
        this.checkLifeState();
        this.lifeState.spriteFrame = this.lifeSpriteAtlas.getSpriteFrame("life" + this.numLifeState);
        this.isLoading = false;
    }
    //浇水错误
    onJaoShuiError() {
        this.checkLifeState();
        this.lifeState.spriteFrame = this.lifeSpriteAtlas.getSpriteFrame("life" + this.numLifeState);
        this.isLoading = false;
    }
    //浇水完成
    onJiaoShuiFinished() {
        cc.log("浇水");
        this.currentJiFen = this.currentJiFen + 20;
        this.jifen.string = this.currentJiFen.toString();
        this.currentQuestion = this.currentQuestion + 1;
        this.loadQuestion(this.currentQuestion);
        this.isLoading = false;
    }
    //施肥错误
    onHuaFeiError() {
        cc.log("化肥");
        this.checkLifeState();
        this.lifeState.spriteFrame = this.lifeSpriteAtlas.getSpriteFrame("life" + this.numLifeState);
        this.isLoading = false;
    }
    //施肥完成
    onHuaFeiFinished() {
        this.currentJiFen = this.currentJiFen + 20;
        this.jifen.string = this.currentJiFen.toString();
        this.currentQuestion = this.currentQuestion + 1;
        this.loadQuestion(this.currentQuestion);
        this.isLoading = false;
    }
    //除草错误
    onChuCaoError() {
        this.zacaoAnim.forEach(element => {
            element.active = false;
        });
        this.checkLifeState();
        this.lifeState.spriteFrame = this.lifeSpriteAtlas.getSpriteFrame("life" + this.numLifeState);
        this.isLoading = false;
    }

    //除草完成
    onChuCaoFinished() {
        this.currentJiFen = this.currentJiFen + 20;
        this.jifen.string = this.currentJiFen.toString();
        this.currentQuestion = this.currentQuestion + 1;
        this.loadQuestion(this.currentQuestion);
        this.isLoading = false;
    }

    //阳光照射错误
    onYangGuangError() {
        this.checkLifeState();
        this.lifeState.spriteFrame = this.lifeSpriteAtlas.getSpriteFrame("life" + this.numLifeState);
        this.isLoading = false;
    }
    //阳光照射完成
    onYangGuangFinished() {
        cc.log("游戏成功了");
    }

    //检查生命值
    checkLifeState() {
        if (this.numLifeState == 2) {
            cc.log("游戏结束");
        } else {
            this.numLifeState++;
        }
    }


}
