export default class Column extends Laya.Script {

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