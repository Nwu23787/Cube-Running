import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main_Menu')
export class Main_Menu extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    onBtnPlay(): void {
        // 点击开始游戏，跳转到第一个关卡
        director.loadScene('level-001')
    }
}


