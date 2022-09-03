
var p = {};


/*p["」*"] = -0.55;*/
/*p["*（"] = -0.25;
p["）*"] = -0.25;*/
/*p["、*"] = -0.55;*/
/*p["。*"] = -0.55;*/
p["・*"] = -0.25;
p["*・"] = -0.25;
p["」「"] = -0.75;
p["」。"] = -0.25;
p["」、"] = -0.25;
p["、「"] = -0.95;
p["。「"] = -0.95;
p["、『"] = -0.95;
/*p["。『"] = -0.95;*/
p["、（"] = -0.95;
p["。（"] = -0.95;
/*p["「"] = -0.5;*/
/*p["『"] = -0.5;*/
p["（"] = -0.5;
p["【"] = -0.5;
p["“"] = -0.5;

var FLAutoKerning = {};


FLAutoKerning.DEFAULT_KERNING_INFO = p;

FLAutoKerning.process = function( elements, kerningInfo )
{
	if(kerningInfo==undefined)
		kerningInfo = FLAutoKerning.DEFAULT_KERNING_INFO;

	elements.each(
		function(index, element){
			var html = $(element).html();
			var newHtml = "";
			var n = html.length;
			for(var i=0; i<n; i++)
			{
				var char = html.substr(i,1);
				var char2 = char;
				var nextChar = html.substr(i+1,1);
				var space = 0;

				if(kerningInfo[char+nextChar]){
					
					space = kerningInfo[char+nextChar];
				}else{
					
					if(kerningInfo[char+"*"] )
						space += kerningInfo[char+"*"];
					if(kerningInfo["*"+nextChar] )
						space += kerningInfo["*"+nextChar];
				}
				if(space!=0)
					char2 = "<span style='letter-spacing:" + space + "em'>" + char + "</span>";

				
				if(i == 0 && kerningInfo[char])
					char2 =  "<span style='margin-left:" + kerningInfo[char] + "em'/>" + char2;

				newHtml += char2;
			}
			$(element).html(newHtml);
		});
}


delete p;