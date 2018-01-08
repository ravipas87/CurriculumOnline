// ravipas 15-08-17
//jQuery feederer functions to static html doc

var dictionary=[];



function generateDictionary(lang){
	if (lang==="es"){
		dictionary["about_me"]="Sobre mi";
		dictionary["contact_info"]="Contacto";
		dictionary["aptitudes"]="Aptitudes";
		dictionary["languajes"]="Idiomas";
		dictionary["social_networks"]="Sigueme";
		dictionary["laboral"]="Experiencia Laboral"
		dictionary["academic"]="Formación"
		dictionary["courses"]="Cursos";
		dictionary["print"]="Imprimir";
	}
	else if (lang==="gb"){
		dictionary["about_me"]="About me";
		dictionary["contact_info"]="Contact Info.";
		dictionary["aptitudes"]="Aptitudes";
		dictionary["languajes"]="Languajes";
		dictionary["social_networks"]="Follow me";
		dictionary["laboral"]="Work Experience"
		dictionary["academic"]="Academic Info."
		dictionary["courses"]="Courses"
		dictionary["print"]="Print";
	}
}


$(document).ready(function(){
	jQuery.ajaxSetup({async:false}); //ajax setup syncronous in order to have the data before processing
	var default_file="info.xml";
	var languages=getLang(default_file);
	var default_lang="";
	default_lang=languages[0]; //set first language in file to be the default
	generateDictionary(default_lang);
	read(default_lang,default_file);

	$("#country_selector").countrySelect({
				defaultCountry: default_lang,
				onlyCountries: languages,
				preferredCountries: [default_lang]
	});
			
	$("#country_selector").bind('change',function(){
		console.log("Idioma permutado: "+$("#country_selector").val()+" code: "+$("#country_selector_code").val());
		//default_lang=("#country_selector").value
		default_lang=$("#country_selector_code").val();
		generateDictionary(default_lang);
		cleardata();
		read(default_lang,default_file);
	});
	$(".print-button").click(function (){
		printDocument($("#name").html());
	});

	

});



function echoDebugging(person){
	console.log("Name: " +person.name);
	console.log("City: " +person.city);
	console.log("Email: " +person.email);
	console.log("Phone: " +person.phone);
	for (var i in person.webs){
		console.log("Web Title "+i+":"+person.webs[i][0]+" | Web Adress:" +person.webs[i][1]);
	}
	
	for (var i in person.social_profiles){
		//console.log("Social Profile "+social_profiles[i][0]+" :" +social_profiles[i][1]);
		console.log("Linkedin: " +person.social_profiles["linkedin"]);
	}
	
	for (var i in person.languajes){
		console.log("Languaje "+i+": "+person.languajes[i]);
	}
	
	for (var i in +person.academic_records){
		console.log("Academic Records "+i+": "+person.academic_records[i].title);
	}
	
	for (var i in person.course_records){
		console.log("Couses Records "+i+": "+person.course_records[i].title);
	}
	
	for (var i in person.laboral_records){
		console.log("Laboral Records "+i+": "+person.laboral_records[i].title);
	}
	
	for (var i in person.aptitudes){
		console.log("Aptitud "+i+": "+person.aptitudes[i]);
	}
	
	//test polyglot.js
	

}

function cleardata(){
	$('#'+"name").html("");
	$('#'+"city").html("");
	$('#'+"email").html("");
	$('#'+"phone").html("");
	$('#'+"about_me").html("");
	$('#'+"email").html("");
	$('#'+"position").html("");
	$('#'+"webs").html("");
	$('#'+"languajes").html("");
	$('#'+"social").html("");
	$('#'+"laboral_block").html("");
	$('#'+"academic_block").html("");
	$('#'+"courses_block").html("");
	$('#'+"aptitudes").html("");
}

function updatedata(lang,person){
	$('#'+"name").html(person.name);
	$('#'+"city").html(person.city);
	$('#'+"email").html(person.email);
	$('#'+"phone").append(printPhone(person.phone));
	$('#'+"about_me").append(printAboutMe(dictionary["about_me"],person.about_me));
	$('#'+"email").html(person.email);
	$('#'+"position").html(person.position);
	$('#'+"webs").append(printWebPages(person.webs));
	$('#'+"languajes").append(printLanguajes(person.languajes));
	$('#'+"social").append(printSocial(person.social_profiles));
	$('#'+"laboral_block").append(printLaboralRecords(person.laboral_records));
	$('#'+"academic_block").append(printAcademicRecords(person.academic_records));
	$('#'+"courses_block").append(printCourseRecords(person.course_records));
	$('#'+"aptitudes").append(printAptitudes(person.aptitudes));
	
	$('#'+"contactInfo_tag").html(dictionary["contact_info"]);
	$('.'+"print-button").html(dictionary["print"]);
	
}

function printWebPages(webs_list){
	var chunk='';
	for (var i in webs_list){
		chunk+='<i class="mdi-content-link indigo-text"></i> <a href="'+webs_list[i][1]+'" class="indigo-text" target="_blank">'+webs_list[i][0]+'</a>';
		chunk+='</br>';
	}
	return chunk;
}

function printLanguajes(languajes_list){
	if(languajes_list.length>0){
	var chunk='<h5 class="left-align"><i class="mdi-action-language"></i>'+dictionary["languajes"]+'</h5>';
	for (var i in languajes_list){
		chunk+='<h6 class="center">'+languajes_list[i]+'</h6>';
	}
	return chunk;
	}
}
//TODO: get ride of this inneficiency
function getSize(obj){
	var tam=0;
	for (i in obj)tam++;
	return tam;
}

function printSocial(social_list){
	if(getSize(social_list)>0){
	var chunk='<h5 class="left-align"><i class="mdi-social-share"></i>'+dictionary["social_networks"]+'</h5><div id="social" class="social">';
						
	//mapped in i the name of the social network, flaticon valid values (facebook,google,instagram,linkedin,pinterest,twitter)
	for (var i in social_list){
		chunk+='<div class="col s4 center"><a href="'+social_list[i]+'" class="indigo-text" target="_blank"><i class="flaticon-'+i+'"></i></a></div>';
	}
	chunk+='</div></div>';
	return chunk;
	}
}

function printLaboralRecords(laboral_records){
	
	if(laboral_records.length>0){
		var chunk='<h4 class="left-align"><i class="mdi-hardware-laptop-windows"></i>'+dictionary["laboral"]+'</h4>';
	for (var i in laboral_records){
		chunk+='<div class="block"><h5>'+laboral_records[i].title+'</h5><p class="helping-text"><i class="mdi-maps-place indigo-text"></i> '+laboral_records[i].company+' <i class="mdi-action-today indigo-text"></i> '+laboral_records[i].period+'</p><p>'+laboral_records[i].description+'</p></div>';
	}
	return chunk;
	}
}

function printAcademicRecords(academic_records){
	if(academic_records.length>0) return '<h4 class="left-align"><i class="mdi-social-school"></i>' +dictionary["academic"]+'</h4>'+printAcademic(academic_records);
}

function printCourseRecords(course_records){
	if(course_records.length>0) return '<h5 class="center"><i class="mdi-social-school"></i>'+dictionary["courses"]+'</h4>'+printAcademic(course_records);
}

function printAcademic(academic_records){
	var chunk="";
	for (var i in academic_records){
		chunk+='<div class="block"><h5>'+academic_records[i].title+'</h5>'+'<p class="helping-text"><i class="mdi-maps-place indigo-text"></i> '+academic_records[i].loc+' <i class="mdi-action-today indigo-text"></i> '+academic_records[i].period+'</p><p>'+academic_records[i].description+'</p></div>';        
	}
	return chunk;
}

function printPhone(phone){
	if (phone!==null && phone!=='') return '<i class="mdi-communication-phone indigo-text"></i>'+phone+'<br/>';
}

function printAptitudes(aptitudes_list){
	if(getSize(aptitudes_list)>0){
	var chunk='<h5 class="left-align"><i class="mdi-action-stars"></i>'+dictionary["aptitudes"]+'</h5>';
	for (var i in aptitudes_list){
		chunk+='<h6>'+i+'</h6><div class="progress"><div class="progress-bar" style="width: '+aptitudes_list[i]+'%;"></div></div>';
	}
	return chunk;
	}
}

function printAboutMe(tag,content){
if (content!==null && content!=='') return '<h5 class="left-align"><i class="mdi-action-account-box"></i><span>'+tag+'<span></h5><p>'+content+'</p>';
}

function printDocument(name){		
		var element =document.getElementById('printable');
		
			html2pdf(element, {
				margin:       [8,10,10,2],
				image: {type:'jpeg',quality:1},
				html2canvas:{dpi:200,letterRendering:true},
				filename:     name+'-Curriculum.pdf',
			});
}

//read available langs
function getLang(file){
	var transform_langs=[];
	
	$.get(file,{},function(xml){
		console.log("retrieving langs ...");
		var languages;
		$("lang",xml).each(function() {
			languages = $(this).children();
		}); //in case multiple register in same file, only last will be showed
		
		
		for (var i=0;i<languages.length;i++){
			transform_langs[i]=languages[i].tagName;
		}
		
	
		
		
		});
			return transform_langs;
};

//reads xml info of specific languaje
function read(lang,file){
	$.get(file,{},function(xml){
		console.log("xml file readed ...");
		$(lang,xml).each(function() {
			//var personal=$(this).children();
			var name = $(this).find('personal').find('name').text();
			var city = $(this).find('personal').find('city').text();
			var email = $(this).find('personal').find('email').text();
			var about_me=$(this).find('personal').find('about_me').text();
			var phone=$(this).find('personal').find('phone').text();
			var position=$(this).find('personal').find('position').text();

			var webs=[];
			var webs_node = $(this).find('personal').find('web_list');
			webs_node.find("web").each(function( index ) {
				webs.push([$( this ).find("title").text(), $( this ).find("adress").text()]);
			});

			var social_profiles=[];
			var profiles = $(this).find('personal').find('social_profiles');
			profiles.children().each(function( index ) {
				//social_profiles.push([$( this ).prop("tagName"), $( this ).text()]);
				social_profiles[$( this ).prop("tagName")]=$( this ).text();
			});

			var languajes=[];
			var langs= $(this).find('languajes');
			langs.children().each(function( index ) {
				languajes.push($( this ).text());
			});

			var academic_records=[];
			var  academic_node = $(this).find('academic');
			academic_node.find("record").each(function( index ) {
				var academic_record = {title:$( this ).find("title").text(),
				loc:$( this ).find("location").text(),
				period:$( this ).find("period").text(),
				description:$( this ).find("description").text()};
				academic_records.push(academic_record);
			});

			var  course_records=[];
			var courses_node = $(this).find('courses');
			courses_node.find("record").each(function( index ) {
				var course_record = {title:$( this ).find("title").text(),
				loc:$( this ).find("location").text(),
				period:$( this ).find("period").text(),
				description:$( this ).find("description").text()};
				course_records.push(course_record);
			});

			var laboral_records=[];
			var  laboral_node = $(this).find('laboral');
			laboral_node.find("record").each(function( index ) {
				var laboral_record = {
				title:$( this ).find("title").text(),
				company:$( this ).find("company").text(),
				period:$( this ).find("period").text(),
				description:$( this ).find("description").text()};
				laboral_records.push(laboral_record);
			});

			//aray map, so we can't duplicate register
			var aptitudes=[];
			var  aptitudes_node = $(this).find('aptitudes_list');
			aptitudes_node.find("aptitud").each(function( index ) {
				aptitudes[$( this ).find("name").text()]=$( this ).find("score").text();
			});

			var personRegister={
				name:name,
				city:city,
				email:email,
				phone:phone,
				about_me:about_me,
				position:position,
				webs:webs,
				social_profiles:social_profiles,
				languajes:languajes,
				academic_records:academic_records,
				course_records:course_records,
				laboral_records:laboral_records,
				aptitudes:aptitudes
			}
			echoDebugging(personRegister);
			updatedata(lang,personRegister);
		
		//var element = document.getElementById('printable');
		
		
		
		
		}); //in case multiple register in same file, only last will be showed
	});
};