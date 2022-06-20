/*****************************************************************************
AuthoringHub www.ahub.co
Copyright 2015 ES Block, LLC. All rights reserved.
******************************************************************************/
$.extend(ahub.connect, {
   mode:{scorm1_2:false,preview:false,offline:false},
   loaded:false
});
ahub.connect.init = function(_obj) {
   if(ahub.connect.mode.scorm1_2){
        LMSInitialize();
        window.setTimeout( function() {
            var lStatus = LMSGetValue('cmi.core.lesson_status');
            if(lStatus != 'incomplete')LMSSetValue('cmi.core.lesson_status', 'incomplete');
            if(_obj && _obj.onLoad)_obj.onLoad();
        }, 100);
   }else if(_obj && _obj.onLoad){ 
       window.setTimeout( function() { _obj.onLoad(); }, 200); 
    }
    return true;
}
ahub.connect.complete = function (score, closeWindow, lmsExit, setPassed) {
    var _status = "";
    var _statusCount = 0;
    var checkStatusInterval;
    function _checkStatus() {
        try {
            if (_status.toLowerCase().trim() != 'incomplete' || _statusCount > 2) {
                clearInterval(checkStatusInterval);
                if (!!lmsExit) LMSFinish();
                if (!!closeWindow) {
                    if (window.parent) window.parent.close();
                    if (self != top) window.close();
                }
            } else {
                _status = LMSGetValue('cmi.core.lesson_status');
            }
        } catch (err) {
            console.log(err.message);
            if (!!lmsExit) LMSFinish();
            clearInterval(checkStatusInterval);
        }
        _statusCount++;
    }
    if (ahub.connect.mode.scorm1_2) {
        if (!score) {
            LMSSetValue('cmi.core.score.raw', '100');
        } else {
            LMSSetValue('cmi.core.score.raw', String(score));
        }
        LMSSetValue('cmi.core.score.min', '0');
        LMSSetValue('cmi.core.score.max', '100');
        if (!setPassed) {
            LMSSetValue('cmi.core.lesson_status', 'completed');
        } else {
            LMSSetValue('cmi.core.lesson_status', 'passed');
        }
        LMSSetValue('cmi.core.exit', '');
        LMSCommit();
        _status = LMSGetValue('cmi.core.lesson_status');
        checkStatusInterval = setInterval(_checkStatus, 1000);
    }
    return true;
}
ahub.connect.exit = function(argument){
   if(ahub.connect.mode.scorm1_2){
      LMSSetValue('cmi.core.lesson_status','incomplete');
      LMSSetValue('cmi.core.exit','suspend');
      LMSCommit();
      LMSFinish();
   }
   //if(window.parent)window.parent.close();
   if(self!=top)window.close();
   return true;
}
ahub.connect.commit = function(argument){
   if(ahub.connect.mode.scorm1_2)LMSCommit();
   if(ahub.connect.mode.preview)lcmsPreview.commit();
   return true;
}
ahub.connect.getValue = function(name){
   //mode test hack
   //if(name=="lesson_mode")return "normal";
   //if(name=="lesson_location")return "6";
   //
   var value = "";
   switch(name){
      case "student_name":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue('cmi.core.student_name');
         if(ahub.connect.mode.preview) return "___________";
      break;
      case "content_path":
         if(ahub.connect.mode.scorm1_2) return "items/";
      break;
      case "lesson_mode":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.lesson_mode");
      break;
      case "lesson_status":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.lesson_status");
      break;
      case "suspend_data":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.suspend_data");
      break;
      case "lesson_location":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.lesson_location");
      break;
      case "score_min":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.score.min");
      break;
      case "score_max":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.score.max");
      break;
      case "score_raw":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.score.raw");
      break;
      case "session_time":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.session_time");
      break;
      case "exit":
         if(ahub.connect.mode.scorm1_2) return LMSGetValue("cmi.core.exit");
      break;
   }
   if (ahub.connect.mode.preview)return lcmsPreview.getValue(name);
   return value;
}
ahub.connect.setValue = function(name, value){
   if (ahub.connect.mode.preview)return lcmsPreview.setValue(name, value);
   switch(name){
      case "lesson_mode":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.lesson_mode", value);
      break;
      case "lesson_status":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.lesson_status", value);
      break;
      case "suspend_data":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.suspend_data", value);
      break;
      case "lesson_location":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.lesson_location", value);
      break;
      case "score_min":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.score.min", value);
      break;
      case "score_max":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.score.max", value);
      break;
      case "score_raw":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.score.raw", value);
      break;
      case "session_time":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.session_time", value);
      break;
      case "exit":
         if(ahub.connect.mode.scorm1_2) return LMSSetValue("cmi.core.exit", value);
      break;
   }
   return false;
}
ahub.connect.loaded=true;

$(window).unload(function() {
	if(ahub.connect.mode.scorm1_2)LMSFinish();
});