const { ccclass, property } = cc._decorator;

@ccclass
export class Golbal extends cc.Component {
    setCursor() {
        cc._canvas.style.cursor = 'pointer';
    }
    clearCursor() {
        cc._canvas.style.cursor = "default"
    }
}
