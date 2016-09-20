import {Component,Input,OnChanges} from '@angular/core';
@Component({
    selector:'modal_chat',
    templateUrl:'./modelChat.html'
})
export class ModalChatCP  {
    constructor() {}
    gid:string
    @Input() set getModal(gid: string) {
        this.gid = gid;
        setTimeout(()=>{
            this.launchModal(gid);
        })
        console.log(gid)
    }
    public closeModal(data:any){
        $("." + data + " > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog,." + data + " > .overlay_dialog > .bzn_dialog .fade_dialog").fadeOut("slow", function() {
            $("." + data + " > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").removeAttr("style");
            $("." + data + " > .overlay_dialog > .bzn_dialog").css("min-height", "90px");
        });
    }
    public launchModal(data:any){
        console.log(data);
        console.log($('.'+data))
        $("." + data + " > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").css("opacity", 1);
        $("." + data + " > .overlay_dialog >.overlay_dialog").show();
        var mdheight = $("." + data + " >.fade_dialog").height();
        $("." + data + " > .overlay_dialog > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").css("opacity", 0);
        /*Remove inline styles*/
        $("." + data + " > .overlay_dialog > .overlay_dialog,." + data + " > .overlay_dialog > .bzn_dialog").removeAttr("style");
        /*Set min height to 90px after mdheight has been set*/
        $("." + data + " > .overlay_dialog > .bzn_dialog").css("min-height", "90px");
        $("." + data + " > .overlay_dialog").show();
        
        $("." + data + " > .overlay_dialog > .bzn_dialog > .preload_dialog").html("<img src='./assets/images/loading.gif' class='loader'> ");
        
        $("." + data + " > .overlay_dialog > .bzn_dialog").css("width", "200").animate({"opacity" : 1,height : mdheight,width : "320"}, 600, function() {
        /*When animation is done show inside content*/
            $("." + data + " > .overlay_dialog > .bzn_dialog > .preload_dialog").empty();
            $("." + data + " > .overlay_dialog > .bzn_dialog > .fade_dialog").show();
        });
    }
   
}
