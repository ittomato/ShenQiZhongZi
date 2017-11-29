
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

    @property(cc.Node)
    huangtudi: cc.Node = null;

    @property(cc.Node)
    kaihua: cc.Node = null;


    //动画回调方法
    onMaiZhongZi() {
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
        this.xiaocao[0].active = true;
        let anim_xiao = this.xiaocao[0].getComponent(cc.Animation);
        anim_xiao.play("zhangcao");
    }
    onZhangCao2() {
        this.xiaocao[1].active = true;
        let anim_xiao = this.xiaocao[1].getComponent(cc.Animation);
        anim_xiao.play("zhangcao");
    }
    onZhangCao3() {
        this.xiaocao[2].active = true;
        let anim_xiao = this.xiaocao[2].getComponent(cc.Animation);
        anim_xiao.play("zhangcao");
        anim_xiao.once("finished", function () {
            this.xiaocao.forEach(element => {
                element.active = false;
            });
        }, this)
    }
    onChuCaoPass1() {

        let xc = this.zacao.children;
        xc.forEach(element => {
            if (element.name == "xiaocao1") {
                element.runAction(cc.fadeOut(0.5));
            }
        })
    }
    onChuCaoPass2() {
        let xc = this.zacao.children;
        xc.forEach(element => {
            if (element.name == "xiaocao2") {
                element.runAction(cc.fadeOut(0.5));
            }
        })
    }
    onChuCaoPass3() {
        let xc = this.zacao.children;
        xc.forEach(element => {
            if (element.name == "xiaocao3") {
                element.runAction(cc.fadeOut(0.5));
            }
        })
    }

    onYangGuang() {
        this.guangxian.active = this.huangtudi.active = true;
        let anim_huangtudi = this.huangtudi.getComponent(cc.Animation);
        anim_huangtudi.play("showhuangtudi");
        anim_huangtudi.once("finished", function () {
            this.huangtudi.active = false;
        }, this)
        let anim_guangxian = this.guangxian.getComponent(cc.Animation);
        anim_guangxian.play("guangxian");
        anim_guangxian.once("finished", function () {
            this.guangxian.active = false;
        }, this)
    }

    onKaiHua() {
        this.damiao.active = false;
        this.star.active = this.guangxian.active = this.kaihua.active = true;
        let anim_star = this.star.getComponent(cc.Animation);
        anim_star.play("xingguang");
        anim_star.once("finished", function () {
            this.star.active = false;
        }, this)
        let anim_guangxian = this.guangxian.getComponent(cc.Animation);
        anim_guangxian.play("guangxian");
        anim_guangxian.once("finished", function () {
            this.guangxian.active = false;
        }, this)
        let anim_kaihua = this.kaihua.getComponent(cc.Animation);
        anim_kaihua.play("kaihua");
    }
}
