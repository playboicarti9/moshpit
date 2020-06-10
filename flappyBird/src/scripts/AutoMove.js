export default class AutoMove extends Laya.Script {

	constructor() {
		super();
		/** @prop {name:moveSpeed, tips:"提示文本", type:Number, default:null}*/
		this.moveSpeed=null;
	}

	onAwake() {
		this.owner.getComponent(Laya.RigidBody).linearVelocity={x:-5,y:0}
		Laya.stage.on("Gameover",this,function(){
			this.owner.getComponent(Laya.RigidBody).linearVelocity={x:0,y:0}
		})	
	}
}