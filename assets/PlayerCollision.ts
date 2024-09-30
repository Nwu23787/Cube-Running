import { _decorator, BoxCollider, Component, director, ICollisionEvent, ITriggerEvent, log, Node } from 'cc';
import { PlayerMovement } from './PlayerMovement';
const { ccclass, property } = _decorator;

@ccclass('PlayerCollision')
export class PlayerCollision extends Component {
    private offBoxCollider(): void {
        // 销毁碰撞监听事件
        let colider = this.node.getComponent(BoxCollider)
        colider.off('onCollisionEnter', this.onCollisionEnter, this)
        colider.off('onTriggerEnter', this.onTriggerEnter, this)
    }

    start() {
        // 注册监听碰撞事件
        let colider = this.node.getComponent(BoxCollider)
        colider.on('onCollisionEnter', this.onCollisionEnter, this)

        // 注册监听触发器事件
        colider.on('onTriggerEnter', this.onTriggerEnter, this)
    }

    protected onDestroy(): void {
        this.offBoxCollider()
    }

    update(deltaTime: number) {

    }

    // 碰撞后回调
    onCollisionEnter(event: ICollisionEvent): void {
        console.log(66666);
        console.log(event.otherCollider.node.name);


        // 与障碍物碰撞后禁用移动控制组件
        if (event.otherCollider.node.name === 'Obstacle') {
            // 抛出挑战失败事件
            director.getScene().emit('level_failed')
            let movement = this.node.getComponent(PlayerMovement)
            movement.enabled = false
            this.offBoxCollider()
            // 禁用碰撞检测组件，否则撞击障碍物后再触底仍能移动
            this.enabled = false
            
        }

        // 与地板碰撞后启用移动控制组件
        if (event.otherCollider.node.name === 'BlockGround') {

            let movement = this.node.getComponent(PlayerMovement)
            movement.enabled = true
        }

    }

    // 触发器监听回调
    onTriggerEnter(event: ITriggerEvent) {
        // 发送关卡挑战成功事件
        director.getScene().emit('level_success')
        // 关闭移动组件
        let movement = this.node.getComponent(PlayerMovement)
        movement.enabled = false

        let colider = this.node.getComponent(BoxCollider)
        colider.off('onTriggerEnter', this.onTriggerEnter, this)
    }
}


