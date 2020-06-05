//特效
var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}
//特效对象池
waveObj.prototype.num = 10;
//初始化
waveObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.alive[i] = false;
		this.r[i] = 0;
	}
}


//绘制特效
waveObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	for(var i=0; i<this.num; i++){
		if(this.alive[i]){
			this.r[i] += deltaTime * 0.05;
			if(this.r[i]>50){
				this.alive[i] = false;
				break;
			}
			//半径和透明度呈反比关系
			var alpha = 1 - this.r[i] /50;
			
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255, 255, 255," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}
//特效出现判断
waveObj.prototype.born = function(x,y){
	for(var i=0; i<this.num; i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
}