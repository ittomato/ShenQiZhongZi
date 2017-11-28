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

    numLifeState: number = 0;

    currentJiFen: number = 0;
    currentQuestion: number = 0;//当前题目（总共5题，从0开始）
    arrQuestion: any = []

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
        }
    }
    //正确答案回调
    onZhongZhiFinished() {
        this.currentJiFen = this.currentJiFen + 20;
        this.jifen.string = this.currentJiFen.toString();
        this.currentQuestion = this.currentQuestion + 1;
        this.loadQuestion(this.currentQuestion);
    }
    //错误答案回调
    onZhongZiError() {
        this.numLifeState++;
        this.lifeState.spriteFrame = this.lifeSpriteAtlas.getSpriteFrame("life" + this.numLifeState);
    }
    onJaoShuiError() {
        this.numLifeState++;
        this.lifeState.spriteFrame = this.lifeSpriteAtlas.getSpriteFrame("life" + this.numLifeState);
    }
    onJiaoShuiFinished() {
        cc.log("浇水");
        this.currentJiFen = this.currentJiFen + 20;
        this.jifen.string = this.currentJiFen.toString();
        this.currentQuestion = this.currentQuestion + 1;
        this.loadQuestion(this.currentQuestion);
    }
}
