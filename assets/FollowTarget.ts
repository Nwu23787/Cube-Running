import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowTarget')
export class FollowTarget extends Component {
    @property(Node)
    target: Node

    // 相机相对于控制物体的偏移量
    @property(Vec3)
    offset: Vec3 = new Vec3()

    tmpPos: Vec3 = new Vec3()

    start() {

    }

    update(deltaTime: number) {
        // 获取目标的坐标，坐标会赋值给 tmpPos
        this.target.getPosition(this.tmpPos)

        this.tmpPos.add(this.offset)

        // 物体坐标加上偏移量就是相机坐标
        this.node.position = this.tmpPos
    }
}


