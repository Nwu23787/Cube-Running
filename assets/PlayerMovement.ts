import { _decorator, Component, director, EventKeyboard, Input, input, KeyCode, Node, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    @property(Number)
    speed: number

    // 刚体组件
    @property(RigidBody)
    RigidBody: RigidBody
    // 负 z 方向的力
    @property(Number)
    forwardForce: number = 0
    // 左移的力
    @property(Number)
    leftForce: number = 700
    //右移的力
    @property(Number)
    rightForce: number = 700
    // 跳跃的力
    @property(Number)
    upForce: number = 1000

    // A 按键是否按下
    isLeftDown: boolean = false
    // D 按键是否按下
    isRightDown: boolean = false
    // w 按键是否按下
    isUpDown: boolean = false
    // w 按键是否弹起
    isUpUp: boolean = true



    start() {
        // 监听键盘按下事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    update(deltaTime: number) {
        const forwardForce = new Vec3(0, 0, this.forwardForce * deltaTime)
        this.RigidBody.applyForce(forwardForce)

        if (this.isLeftDown) {
            const leftForce = new Vec3(-this.leftForce * deltaTime, 0, 0)
            this.RigidBody.applyForce(leftForce)
        }

        if (this.isRightDown) {
            const rightForce = new Vec3(this.rightForce * deltaTime, 0, 0)
            this.RigidBody.applyForce(rightForce)
        }

        // 按下后只能弹起一次
        if (this.isUpDown && this.isUpUp) {
            const leftForce = new Vec3(0, this.upForce, 0)
            this.RigidBody.applyForce(leftForce)
            this.isUpUp = false


            // 禁用移动组件
            this.enabled = false

        }

        // 物体掉落，游戏结束
        if (this.node.position.y < 0) {

            // 抛出挑战失败事件
            director.getScene().emit('level_failed')
            this.enabled = false

        }

    }


    // 键盘按下事件回调
    onKeyDown(event: EventKeyboard): void {
        // 按下左移键 A
        if (event.keyCode == KeyCode.KEY_A) {
            this.isLeftDown = true
        }
        // 按下右移键 D
        if (event.keyCode == KeyCode.KEY_D) {
            this.isRightDown = true;
        }
        // 按下跳跃按键 空格
        if (event.keyCode == KeyCode.SPACE) {
            this.isUpDown = true
        }
    }

    // 键盘弹起事件回调
    onKeyUp(event: EventKeyboard): void {
        // 弹起左移键 A
        if (event.keyCode == KeyCode.KEY_A) {
            this.isLeftDown = false
        }
        // 弹起右移键 D
        if (event.keyCode == KeyCode.KEY_D) {
            this.isRightDown = false;
        }

        // 弹起跳跃按键 空格
        if (event.keyCode == KeyCode.SPACE) {
            this.isUpDown = false
            this.isUpUp = true
        }

    }


    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)
    }
}


