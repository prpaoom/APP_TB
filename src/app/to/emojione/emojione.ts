import {Component, ViewChild, ViewContainerRef,Input,AfterViewInit,OnInit} from '@angular/core';

@Component({
	selector:'emojione',
  templateUrl: './emojione.html'
})

export class Emojione implements OnInit,AfterViewInit {
	@Input() target:string
  public ngOnInit(){
	  
  }
  public ngAfterViewInit(){
	  this.ReadStorage(this.target);
	  
  }
  // ======================== STEP 1 ===============================//
  //Assign target id
  public callEmoji(target:string) { 
	 
	  //this.launchPopup(target); // launch popup
	  this.ReadStorage(target); // Read LocalStorage
  }

  public ReadStorage(target:string){

	  	var my_emoInfo = JSON.parse(localStorage.getItem('my_emoInfo'));
		console.log(my_emoInfo);
		if(my_emoInfo != null){
			console.log(target);
			
			
			var check_emo = document.getElementById('history'+target).innerHTML;
			
			if(check_emo.length > 0){
				var input = document.getElementById('history'+target).innerHTML;
				var output = emojione.toImage(input);
				document.getElementById('history'+target).innerHTML = output;
				
			}else{
				for(var k in my_emoInfo) {
					$('#history'+target).append("<li data-target='"+target+"'>"+my_emoInfo[k].myEmo+"</li>");  
				}
			var input = document.getElementById('history'+target).innerHTML;
				var output = emojione.toImage(input);
				document.getElementById('history'+target).innerHTML = output;
			}
			
		}else{
			$('.history'+target).append("<li class='emptylist'>คุณยังไม่เคยใช้ icon สื่ออารมณ์</li>"); 
		}
  }


  // Launch Popup  Depend on Popup Type  Please ask Pbird
  public launchPopup(target:any){
	  $(".emogiconTab."+target).css('display','block');	
  }
  // ======================== STEP 2 ===============================//
  // PreLoad Emojicon
  public preLoadEmoji(target:string) { 
	  console.log(target);
	  let currentCat = 'people';
	  let check_stemo = document.getElementById('respond'+target).innerHTML;
	  
	  if(check_stemo.length > 0){
		    
			//Convert Emojicon to Image and Replace it.
			convertEmo(target);
			console.log($('#respond'+target).html()); 

		}else{
			    var jqxhr = $.getJSON("./node_modules/emojione/emoji.json", function() {
				var group = jqxhr.responseJSON;
				
				for(var k in group) {
					if(group[k].category == currentCat){
						$('#respond'+target).append("<li data-target='"+target+"'>"+group[k].shortname+"</li>");
					}
				}
				console.log($('#respond'+target).html()); 
				//Convert Emojicon to Image and Replace it.
				convertEmo(target);

			});
		}

  }
  // Load By Catalog

  public filterByCat(target:string,catalog:string){
	  $('#category-filters > li > a').removeClass('active');
	  $('#filter-'+ catalog + '> a').addClass('active');
	  $('#respond'+ target).empty();


	  var jqxhr = $.getJSON("./node_modules/emojione/emoji.json", function() {
	  var group = jqxhr.responseJSON;
			
	  for(var k in group) {
		if(group[k].category == catalog){
				$('#respond'+ target).append("<li data-target='"+target+"'>"+group[k].shortname+"</li>");
		}
	  }

	   //Convert Emojicon to Image and Replace it.
	   convertEmo(target);

	  });
  }
  

}

function convertEmo(target:any) {
    var input = document.getElementById('respond'+target).innerHTML;
    var output = emojione.toImage(input);
    document.getElementById('respond'+target).innerHTML = output;
}


// ======================== STEP 3 ===============================//
// Action In Form Follow Input Target

$(document).on('click','.emoticons li',function() {
	console.log('asdadasd')
    let target = $(this).data('target');
	console.log(target);
	let uni = $(this).find('img').attr('alt');
	let emo = emojione.toShort(uni);

    $(".input"+target).append(emo);  // 1. add SHORT to input target    
    var original = $(".input"+target).html(); // 2. Get HTML From input target
    var converted = emojione.toImage(original); // 3. Convert SHORT TO IMAGE
    $(".input"+target).html(converted); // 4. add HTML Back to input target
    
	// Save Or Update history on LocalStorage
    var emo_data = JSON.parse(localStorage.getItem('my_emoInfo'));
		if(emo_data == null){
			add_emo(emo);
		}
		else if(emo_data.length < 16){
			add_emo(emo);
		}else{
			emo_data.shift();
			localStorage.removeItem('my_emoInfo');
			add_new_emo(emo_data);
			add_emo(emo);
		}    
    //setCursor(converted, converted.length);    // Set Cursor with End Of message
});


function SaveDataToLocalStorage(new_emo:any){
	var emoji_bz:any =[];
	emoji_bz = JSON.parse(localStorage.getItem('my_emoInfo') || []);
	emoji_bz.push({myEmo:new_emo});
	localStorage.setItem('my_emoInfo', JSON.stringify(emoji_bz));
}
function add_emo(new_emo:any){
	
	var status = 0;
	var check_str = localStorage.getItem('my_emoInfo');
	var emo_data = JSON.parse(localStorage.getItem('my_emoInfo'));
	
	if(check_str != null){
		for(var u in emo_data) {
			
			if(new_emo == emo_data[u].myEmo){	
				status = 1;
			}
		}
		
		if(status == 0){
			SaveDataToLocalStorage(new_emo);
		}
		
	}else{
		var emoji_bz:any = [];
		emoji_bz.push({myEmo:new_emo});
		localStorage.setItem('my_emoInfo', JSON.stringify(emoji_bz));
	}
}

function add_new_emo(data:any){
	localStorage.setItem('my_emoInfo', JSON.stringify(data));
}

function setCursor(elem:any, pos:any){
	console.log(elem);
	console.log(pos);
    if(elem.setSelectionRange){
      elem.focus();
      elem.setSelectionRange(pos, pos);
      console.log(1)
    }else if(elem.createTextRange){
		 console.log(2)
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
}