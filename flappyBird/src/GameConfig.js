/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import AutoMove from "./scripts/AutoMove"
import RepeatingBg from "./scripts/RepeatingBg"
import BirdCtrl from "./scripts/BirdCtrl"
import ColumnSpawn from "./scripts/ColumnSpawn"
import Column from "./scripts/Column"

export default class GameConfig {
    static init() {
        //注册Script或者Runtime引用
        let reg = Laya.ClassUtils.regClass;
		reg("scripts/AutoMove.js",AutoMove);
		reg("scripts/RepeatingBg.js",RepeatingBg);
		reg("scripts/BirdCtrl.js",BirdCtrl);
		reg("scripts/ColumnSpawn.js",ColumnSpawn);
		reg("scripts/Column.js",Column);
    }
}
GameConfig.width = 1920;
GameConfig.height = 1080;
GameConfig.scaleMode ="fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "game.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();
