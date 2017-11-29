
import { Golbal } from "./Golbal"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnStart: cc.Node = null;

    @property(cc.Node)
    btnMusic: cc.Node = null;

    @property(cc.Node)
    title: cc.Node = null;

    isLoading: boolean = false;

    @property(cc.Node)
    lizi: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    bg2: cc.Node = null;

    @property(Golbal)
    golbal: Golbal = null;

    // onLoad() {
    // }

    start() {

        cc.director.setDisplayStats(false);
        this.btnStart.on(cc.Node.EventType.TOUCH_START, this.startGame, this);
        this.btnStart.on(cc.Node.EventType.MOUSE_ENTER, this.golbal.setCursor, this);
        this.btnStart.on(cc.Node.EventType.MOUSE_LEAVE, this.golbal.clearCursor, this);
        this.btnStart.on(cc.Node.EventType.TOUCH_START, this.startGame, this);
        this.btnMusic.on(cc.Node.EventType.MOUSE_ENTER, this.golbal.setCursor, this);
        this.btnMusic.on(cc.Node.EventType.MOUSE_LEAVE, this.golbal.clearCursor, this);

        let anim = this.title.getComponent(cc.Animation);
        anim.play("showTitle");
        cc.game.addPersistRootNode(this.btnMusic);
    }
    startGame() {

        if (this.isLoading) return false;
        this.isLoading = true;
        if (this.lizi.active) {
            cc.director.loadScene("game");
        } else {
            cc.director.preloadScene("game", function () {
                cc.log("game场景加载完成");
            });
            this.bg.active = false;
            this.bg2.active = true;
            this.lizi.active = true;
            //隐藏Title
            let anim = this.title.getComponent(cc.Animation);
            anim.play("hideTitle");
            anim.once("finished", function () {
                this.title.active = false;
            }, this)
            //显示梨子
            let anim_showLiZi = this.lizi.getComponent(cc.Animation);
            anim_showLiZi.play("showLiZi");
            anim_showLiZi.once("finished", function () {
                this.isLoading = false;
            }, this)
        }
    }

    onDestroy() {
        this.btnStart.off(cc.Node.EventType.TOUCH_START, this.startGame, this);
        this.btnStart.off(cc.Node.EventType.MOUSE_ENTER, this.golbal.setCursor, this);
        this.btnStart.off(cc.Node.EventType.MOUSE_LEAVE, this.golbal.clearCursor, this);
        this.btnStart.off(cc.Node.EventType.TOUCH_START, this.startGame, this);
        this.btnMusic.off(cc.Node.EventType.MOUSE_ENTER, this.golbal.setCursor, this);
        this.btnMusic.off(cc.Node.EventType.MOUSE_LEAVE, this.golbal.clearCursor, this);
        this.golbal.clearCursor();
    }
}
