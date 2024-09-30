import { _decorator, Component, Node } from 'cc';
import { PlayerMovement } from './PlayerMovement';
const { ccclass, property } = _decorator;

@ccclass('HUD_StartTips')
export class HUD_StartTips extends Component {
    @property(PlayerMovement)
    playMovement: PlayerMovement
    start() {
        // this.playMovement = this.node.getComponent(PlayerMovement)
    }

    update(deltaTime: number) {

    }

    onBtnStart(): void {
        // 开启移动控制组件
        this.playMovement.enabled = true
        // 关闭文字提示
        this.node.active = false
    }
}


