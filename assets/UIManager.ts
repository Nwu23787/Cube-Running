import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Node)
    uiLevelFailure: Node

    @property(Node)
    uiLevelSuccess: Node

    @property(Node)
    uiLevelComplete: Node

    start() {
        // 监听挑战失败事件
        director.getScene().on('level_failed', this.onEvent_LevelFailed, this)
        director.getScene().on('level_success', this.onEvent_LevelSuccess, this)
    }

    update(deltaTime: number) {

    }

    onBtnReplay(): void {
        // 重新开始
        director.loadScene(director.getScene().name)
    }

    onBtnMainMenu(): void {
        // 返回主菜单
        director.loadScene('Main')
    }

    // 处理关卡失败事件
    onEvent_LevelFailed(): void {
        // 显示失败界面
        this.uiLevelFailure.active = true
    }

    // 处理挑战成功事件
    onEvent_LevelSuccess(): void {
        if (director.getScene().name === 'level-003') {
            // 显示挑战完成界面
            this.uiLevelComplete.active = true
        } else {
            // 显示成功界面
            this.uiLevelSuccess.active = true
        }
    }

    onBtnNext(): void {
        // 下一关
        let correntScenceName = director.getScene().name
        let currentScenceNum = Number(correntScenceName.slice(-1))
        let baseScenceName = correntScenceName.slice(0, -1)
        director.loadScene(baseScenceName + (currentScenceNum + 1))
    }
}


