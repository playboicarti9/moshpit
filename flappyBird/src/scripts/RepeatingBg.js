let width;
export default class RepeatingBg extends Laya.Script {

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