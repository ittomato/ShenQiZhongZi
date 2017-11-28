const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    lblQ: cc.Label = null;

    @property([cc.Label])
    lblAnswer: cc.Label[] = [];

    currentQuestion: number = 2;

    // onLoad () {},

    start() {
        this.loadQuestion();
    }
    //加载问题
    loadQuestion() {
        let self = this;
        cc.loader.loadRes("subject", (err, result) => {
            self.lblQ.string = result[self.currentQuestion].question;
            self.lblAnswer.forEach((element, index) => {
                element.string = result[self.currentQuestion].answer[index];
            });


        })
    }
    // update (dt) {},
}
