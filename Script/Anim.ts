
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //埋种子
    @property(cc.Node)
    maiZhongZi: cc.Node = null;

    @property(cc.Node)
    star: cc.Node = null

    @property(cc.Node)
    yezi: cc.Node = null

    @property(cc.Node)
    guangxian: cc.Node = null


    //动画回调方法
    onMaiZhongZi() {
        cc.log("埋种子动画")
        let anim_maiZhongZi = this.maiZhongZi.getComponent(cc.Animation).play("maizhongzi");//埋种子动画
    }


    onJiaoShui() {
        this.star.active = this.yezi.active = this.guangxian.active = true;
        let anim_star = this.star.getComponent(cc.Animation);
        anim_star.play("xingguang");
        anim_star.once("finished", function () {
            this.star.active = false;
        }, this)
        let anim_yezi = this.yezi.getComponent(cc.Animation);
        anim_yezi.play("faya");
        let anim_guangxian = this.guangxian.getComponent(cc.Animation);
        anim_guangxian.play("guangxian");
        anim_guangxian.once("finished", function () {
            this.guangxian.active = false;
        }, this)

    }
}
