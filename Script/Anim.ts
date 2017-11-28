
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //埋种子
    @property(cc.Node)
    maiZhongZi: cc.Node = null;

    @property(cc.Node)
    star: cc.Node = null;

    @property(cc.Node)
    yezi: cc.Node = null;

    @property(cc.Node)
    guangxian: cc.Node = null;


    @property(cc.Node)
    damiao: cc.Node = null;

    @property(cc.Node)
    zacao: cc.Node = null;

    @property(cc.Node)
    xiaocao: cc.Node[] = [];

    //动画回调方法
    onMaiZhongZi() {
        cc.log("埋种子动画")
        let anim_maiZhongZi = this.maiZhongZi.getComponent(cc.Animation).play("maizhongzi");//埋种子动画
    }

    //浇水闪星动画
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
    onHuaFei() {
        this.star.active = this.damiao.active = this.guangxian.active = this.zacao.active = true;
        this.yezi.active = false;
        let anim_star = this.star.getComponent(cc.Animation);
        anim_star.play("xingguang");
        anim_star.once("finished", function () {
            this.star.active = false;
        }, this)
        let anim_damiao = this.damiao.getComponent(cc.Animation);
        anim_damiao.play("damiao");
        let anim_guangxian = this.guangxian.getComponent(cc.Animation);
        anim_guangxian.play("guangxian");
        anim_guangxian.once("finished", function () {
            this.guangxian.active = false;
        }, this)
    }
    onZhangCao1() {

        this.xiaocao.forEach(element => {
            element.active = true;
        });
        let anim_xiao = this.xiaocao[0].getComponent(cc.Animation);
        anim_xiao.play("zhangcao");
    }
    onZhangCao2() {
        let anim_xiao = this.xiaocao[1].getComponent(cc.Animation);
        anim_xiao.play("zhangcao");
    }
    onZhangCao3() {
        let anim_xiao = this.xiaocao[2].getComponent(cc.Animation);
        anim_xiao.play("zhangcao");
        anim_xiao.once("finished", function () {
            this.xiaocao.forEach(element => {
                anim_xiao.stop();
                element.active = false;
            });
        }, this)
    }
}
