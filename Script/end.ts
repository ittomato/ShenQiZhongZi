const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnRestart: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.btnRestart.on("touchstart", this.reStart, this);
    }
    reStart() {
        cc.director.loadScene("game");
    }
}
