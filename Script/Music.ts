

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({
        url: cc.AudioClip
    })
    audio_bg: string = '';

    @property(cc.SpriteAtlas)
    btnMusicAtlas: cc.SpriteAtlas = null;
    audioId: number = 0;
    // onLoad () {},

    start() {
        this.audioId = cc.audioEngine.play(this.audio_bg, true, 0.5);
        this.node.on("touchstart", this.stopMusic, this);
    }
    stopMusic() {

        let audioState = cc.audioEngine.getState(this.audioId);
        cc.log(audioState);
        if (audioState == 1) {
            cc.audioEngine.pause(this.audioId);
            let musicSprite = this.node.getComponent(cc.Sprite);
            musicSprite.spriteFrame = this.btnMusicAtlas.getSpriteFrame("yinfu0002");
        } else if (audioState == 2) {
            cc.audioEngine.resume(this.audioId);
            let musicSprite = this.node.getComponent(cc.Sprite);
            musicSprite.spriteFrame = this.btnMusicAtlas.getSpriteFrame("yinfu0001");
        }
    }
    // update (dt) {},
}
