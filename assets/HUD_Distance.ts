import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HUD_Distance')
export class HUD_Distance extends Component {
    @property(Node)
    player: Node

    content: Label

    start() {
        this.content = this.node.getComponent(Label)
    }

    update(deltaTime: number) {
        // 获取当前 node 的 z 轴位置
        this.content.string = (-this.player.position.z.toFixed(0)).toString() + ' 米'
    }
}


