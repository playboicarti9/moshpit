import Column from "./Column";


let ranTime = 2000, timer = 0;
let columnParent;
let isGameover = false;
export default class ColumnSpawn extends Laya.Script {

	constructor() {
		super();
		/** @prop {name:columnPre, tips:"提示文本", type:Prefab, default:null}*/
		this.columnPre=null;
	}
	onAwake(){
		columnParent = this.owner.getChildByName("ColumnParent");
		Laya.stage.on("Gameover",this,function(){isGameover = true});
	}
	
	onUpdate() {
		if(isGameover){
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