var mChoicePanel = {};

mChoicePanel = new function(){
	
	this.onChoiceClick;
	this.question;
	
	this.generateChoicePancel = function(question,onChoiceClick,callback){
		console.log("beginPractice() called");
		this.question = question;
		this.onChoiceClick = onChoiceClick;
		var html = '<table width=100% height=100% border=0>\
			<tr>\
				<td class="choicePanelMarginTd"></td>\
				';
		
		var len = question.getAnswerLetters().length;
		
		var w ='a';
		for(var i=0;i<len;i++){
			if(i==0)w='a';
			else if(i==1)w='b';
			else if(i==2)w='c';
			else if(i==3)w='d';
			else if(i==4)w='e';
			else if(i==5)w='f';
			
			html+='<td valign=top><img id="imgChoiceBtn_'+i+'" onclick="mChoicePanel.changeButtonsBg('+i+');" width="60px" src="./css/images/answer_'+w+'.png" /></td>';
		}
		html+='<td class="choicePanelMarginTd"></td></tr>';
		var hintCount = question.getHintCount();
		var hint='';
		if(hintCount>0)
			hint='<td colspan=4 align="right"><img class="choice_panel_img_two_btn" src="./css/images/hint.png" />&nbsp;&nbsp;</td>';
		else
			hint='<td colspan=4 align="right">&nbsp;&nbsp;</td>';
		
		html+='<tr>'+hint+'<td colspan=4 align="left">&nbsp;&nbsp;<img class="choice_panel_img_two_btn"  src="./css/images/confirm_button.png" /></td></tr></table>';
		console.log("start create choice panel::"+html);
		$("#choicePanelContainer").html(html);
		$("#choicePanelContainer").trigger('create');
		callback();
	};
	
	this.changeButtonsBg = function(which){
		var w ='a';
			if(which==0)w='a';
			else if(which==1)w='b';
			else if(which==2)w='c';
			else if(which==3)w='d';
			else if(which==4)w='e';
			else if(which==5)w='f';
		
		var currentSrc = $("#imgChoiceBtn_"+which).attr("src");
		
		//reset all option's bg
		var len = this.question.getAnswerLetters().length;
			
		for(var i=0;i<len;i++){
			var _w='a';
			if(i==0)_w='a';
			else if(i==1)_w='b';
			else if(i==2)_w='c';
			else if(i==3)_w='d';
			else if(i==4)_w='e';
			else if(i==5)_w='f';
			$("#imgChoiceBtn_"+i).attr("src","./css/images/answer_"+_w+".png");
			$("#imgChoiceBtn_"+i).trigger("create");
		}
		
		if(!util.contains(currentSrc,"select",false)){
			$("#imgChoiceBtn_"+which).attr("src","./css/images/answer_select_"+w+".png");
			$("#imgChoiceBtn_"+which).trigger("create");
		}
		
		this.onChoiceClick(which);
	};
};