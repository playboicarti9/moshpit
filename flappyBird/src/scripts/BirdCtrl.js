let isGameover = false;

export default class BirdCtrl extends Laya.Script {

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
		this.owner.getComponent(Laya.RigidBody).linearVelocity={x:0,y:this.force}
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
