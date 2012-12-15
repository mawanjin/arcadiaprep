String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};

String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
};




var util = {};

util = new function() {
	this.getLoading = function() {
		return "<div class='marginLeft'><div id='circular_1' class='circular'></div><div id='circular_2' class='circular'></div><div id='circular_3' class='circular'></div><div id='circular_4' class='circular'></div><div id='circular_5' class='circular'></div><div id='circular_6' class='circular'></div><div id='circular_7' class='circular'></div><div id='circular_8' class='circular'></div><div class='clearfix'></div></div>";
	};
	this.currentTimeMillis = function(){
		
		return Date.parse(new Date());
//		var date=new Date();
//		var yy=date.getYear(); 
//		var MM=date.getMonth() + 1;
//		var dd=date.getDay(); 
//		var hh=date.getHours(); 
//		var mm=date.getMinutes(); 
//		var ss=date.getSeconds(); 
//		var sss=date.getMilliseconds();  
//		return Date.UTC(yy,MM,dd,hh,mm,ss,sss); 
	};
	
	this.formateDate = function(timeMillis){
		timeMillis = parseInt(timeMillis);
		var d = new Date(timeMillis);
		return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()); 
	};
	
	this.getBytes = function(str){
		var ch, st, re = [];   
	    for (var i = 0; i < str.length; i++ ) {     
	        ch = str.charCodeAt(i);  
	        st = [];         
	        do {      
	             st.push( ch & 0xFF ); 
	             ch = ch >> 8;
	        } while ( ch );
	        re = re.concat( st.reverse() );   
	     }   // return an array of bytes   
	     return re;
	};
	
	this.getString = function(bytes){
		var s = "";
		var arr = [];
		for(var i=0;i<bytes.length;i++){
			arr.push(bytes[i]);
		}
		var str = String.fromCharCode.apply("", arr);
		return str;
	};
	
	this.contains = function(string, substr, isIgnoreCase)
	{
	    if (isIgnoreCase)
	    {
	         string = string.toLowerCase();
	         substr = substr.toLowerCase();
	    }

	    var startChar = substr.substring(0, 1);
	    var strLen = substr.length;

	    for (var j = 0; j<string.length - strLen + 1; j++)
	    {
	         if (string.charAt(j) == startChar)  //如果匹配起始字符,开始查找
	         {
	             if (string.substring(j, j+strLen) == substr)  //如果从j开始的字符与str匹配，那ok
	             {
	                 return true;
	             }   
	         }
	    }
	    return false;
	};
	
	this.strToJson = function(str){
//		var json = eval('(' + str + ')'); 
//		return json;
		//$("#div_test1").text(str);
		var str = new String(str);
		
		try{
			eval("var theJsonValue = "+str);
		}catch(e){
			alert(e.message);
		}
		
		return theJsonValue;
	} ;
};

