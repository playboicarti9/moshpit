(function () {
	'use strict';

	class AutoMove extends Laya.Script {

		constructor() {
			super();
			/** @prop {name:moveSpeed, tips:"提示文本", type:Number, default:null}*/
			this.moveSpeed=null;
		}

		onAwake() {
			this.owner.getComponent(Laya.RigidBody).linearVelocity={x:-5,y:0};
			Laya.stage.on("Gameover",this,function(){
				this.owner.getComponent(Laya.RigidBody).linearVelocity={x:0,y:0};
			});	
		}
	}

	let width;
	class RepeatingBg extends Laya.Script {

		constructor() {
			super();
			/** @prop {name:name, tips:"提示文本", type:Node, default:null}*/
			
		}

		onAwake() {
			width = this.owner.width;
		}
		
		onUpdate(){
			if(this.owner.x <= -width){
				this.owner.x += width * 2;
			}
		}
	}

	let isGameover = false;

	class BirdCtrl extends Laya.Script {

		constructor() {
			super();
			/** @prop {name:force, tips:"提示文本", type:Number, default:null}*/
			this.force=null;
		}

		onAwake() {
			//监听鼠标按下
			Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.mouseDown);
		}
		mouseDown(){
			if(isGameover)return;
			//向上运动
			this.owner.getComponent(Laya.RigidBody).linearVelocity={x:0,y:this.force};
			this.owner.autoAnimation = "Fly";
			this.owner.loop = false;
	    }
		//切换成飞翔动画
		onUpdate(){
			if(this.owner.isPlaying==false){
				this.owner.autoAnimation = "Idle";
			}
		}
		//碰撞检测及判断游戏是否结束
		onTriggerEnter(other){
			//如果是顶层阻挡则忽略
			if(other.owner.name == "TopCollider")
			return;
			
			this.owner.autoAnimation = "Die";
			isGameover = true;
			Laya.stage.event("Gameover");
		}
	}

	class Column extends Laya.Script {

		constructor() {
			super();
			this.canAddScore = true;
		}

		onAwake() {
		}
		onUpdate(){
			if(this.canAddScore&&this.owner.x <= 75){
				this.canAddScore = false;
				console.log("成绩增加");
			}
		}
	}

	let ranTime = 2000, timer = 0;
	let columnParent;
	let isGameover$1 = false;
	class ColumnSpawn extends Laya.Script {

		constructor() {
			super();
			/** @prop {name:columnPre, tips:"提示文本", type:Prefab, default:null}*/
			this.columnPre=null;
		}
		onAwake(){
			columnParent = this.owner.getChildByName("ColumnParent");
			Laya.stage.on("Gameover",this,function(){isGameover$1 = true;});
		}
		
		onUpdate() {
			if(isGameover$1){
				timer = 0;
				return;
			}
			timer += Laya.timer.delta;
			if(timer>=ranTime){
				timer = 0;
				ranTime = this.getRandom(3000,4500);
				this.spawn();
			}
		}
		//生成柱子
		spawn(){
			var bottomColumn = this.columnPre.create();
			columnParent.addChild(bottomColumn);
			var bottomY = this.getRandom(300,660);
			bottomColumn.pos(1920,bottomY);
			
			var cha = this.getRandom(260,320);
			var topY = bottomY - cha;
			
			var topColumn = this.columnPre.create();
			columnParent.addChild(topColumn);
			topColumn.rotation = 180;
			topColumn.pos(2176,topY);
			topColumn.getComponent(Column).destroy();
		}
		
		//获取时间随机值
		getRandom(min,max){
			var ranValue = 0;
			if(max > min){
				ranValue = Math.random()*(max - min);
				ranValue+=min;
			}else{
				ranValue = Math.random()*(min-max);
				ranValue+=max;
			}
			return ranValue;
		}
	}

	/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

	class GameConfig {
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

	class Main {
		constructor() {
			//根据IDE设置初始化引擎		
			if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
			else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
			Laya["Physics"] && Laya["Physics"].enable();
			Laya["DebugPanel"] && Laya["DebugPanel"].enable();
			Laya.stage.scaleMode = GameConfig.scaleMode;
			Laya.stage.screenMode = GameConfig.screenMode;
			Laya.stage.alignV = GameConfig.alignV;
			Laya.stage.alignH = GameConfig.alignH;
			//兼容微信不支持加载scene后缀场景
			Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

			//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
			if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
			if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
			if (GameConfig.stat) Laya.Stat.show();
			Laya.alertGlobalError = true;

			//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
			Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
		}

		onVersionLoaded() {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		}

		onConfigLoaded() {
			//加载IDE指定的场景
			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		}
	}
	//激活启动类
	new Main();

}());
