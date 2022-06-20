/****************************************************************************
AuthoringHub (http://www.authoringhub.com)
Copyright 2016 ES Block, LLC. All rights reserved.
******************************************************************************/

ahub.theme.transitions = { 
    chapters: { 
        backward:{
            enter:{type: function(){ return Math.abs(ahub.previousChapterIndex-ahub.theme.model.get('currentChapterIndex'))<=1?"slide":"fade"; },
                options:{direction : 'left',duration:1000}}, 
            out:{type: function(){ return Math.abs(ahub.previousChapterIndex-ahub.theme.model.get('currentChapterIndex'))<=1?"slide":"fade"; }, 
                options:{direction : 'right',duration:1000}}}, 
        forward:{ 
            enter:{type: function(){ return Math.abs(ahub.previousChapterIndex-ahub.theme.model.get('currentChapterIndex'))<=1?"slide":"fade"; },
                options:{direction : 'right',duration:1000}}, 
            out:{type: function(){ return Math.abs(ahub.previousChapterIndex-ahub.theme.model.get('currentChapterIndex'))<=1?"slide":"fade"; },
                options:{direction : 'left',duration:1000}}}}, 
    pages:{ 
        backward:{
            enter:{type:function(){ return "fade"; },options:{direction : 'left',duration:500}}, 
            out:{type:function(){ return "fade"; },options:{direction : 'right',duration:500}}}, 
        forward:{ 
            enter:{type:function(){ return "fade"; },options:{direction : 'right',duration:500}}, 
            out:{type:function(){ return "fade"; },options:{direction : 'left',duration:500}} }} 
    };
ahub.theme.authvars = { 
    "page":[],
    "chapter": [],
    "theme": [
	{
        "id": "aut-theme-assementQuestionHeader",
        "name": "assementQuestionHeader",
        "type": "text",
        "onChange": function(){}
    },{
        "id": "aut-theme-assementSingleView",
        "name": "assementSingleView",
        "type": "number",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackCorrectTextColor",
        "name": "assessmentFeedbackCorrectTextColor",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackCorrectTextColorCheck",
        "name": "assessmentFeedbackCorrectTextColorCheck",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackCorrectBubbleTextColor",
        "name": "assessmentFeedbackCorrectBubbleTextColor",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackCorrectBubbleTextColorCheck",
        "name": "assessmentFeedbackCorrectBubbleTextColorCheck",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackIncorrectTextColor",
        "name": "assessmentFeedbackIncorrectTextColor",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackIncorrectTextColorCheck",
        "name": "assessmentFeedbackIncorrectTextColorCheck",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackIncorrectBubbleTextColor",
        "name": "assessmentFeedbackIncorrectBubbleTextColor",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentFeedbackIncorrectBubbleTextColorCheck",
        "name": "assessmentFeedbackIncorrectBubbleTextColorCheck",
        "type": "color",
        "onChange": function(){}
    },{
        "id": "aut-theme-assessmentIncorrectAnswerHighlightCorrect",
        "name": "assessmentIncorrectAnswerHighlightCorrect",
        "type": "color",
        "onChange": function(){}
    }
    ]
}
//ahub.theme.fonts=['FF DIN Bold', 'FF DIN Condensed Bold', 'PlantinStd', 'PlantinStd Bold'];

//custom theme css classes
//ahub.theme.styles.contents['thm-custom-title'] = {value:"thm-custom-title",title:"Module Title"}
ahub.theme.styles.contents['thm-print-hide'] = {value:"thm-print-hide",title:"Hide from printing"}
//ahub.theme.styles.contents['thm-custom-videoplayer'] = {value:"thm-custom-videoplayer",title:"Video Player"}
//ahub.theme.styles.contents['thm-custom-button-title'] = {value:"thm-custom-button-title",title:"Button Title"}
//ahub.theme.styles.contents['thm-scorm-completeBtn'] = {value:"thm-scorm-completeBtn",title:"SCORM complete (w/event)"}

//ahub.theme.styles.pages['thm-custom-certificate-page'] = {value:"thm-custom-certificate-page",title:"Custom certificate page"}

//custom theme callbacks / vars
ahub.app.onQuizInit = new Backbone.Marionette.Callbacks();

ahub.events.onCourseStart.add(function(){
    $('#theme').fadeIn();
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var iever = 0;
	if (msie > 0)iever = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    var _res = function() {
        if(iever>6 && iever<9){
			var _w = (($('#theme').width()-$( window ).width())/2)*-1;
			var _h = (($('#theme').height()-$( window ).height())/2)*-1;
			if(_w)$('#theme').css({'margin-left': _w+'px'});
			if(_h)$('#theme').css({'margin-top': _h+'px'});
		}else{
            var _w = $( window ).width()/$('#theme').width();
            var _h = $( window ).height()/$('#theme').height();
			var _hdiv = $('#theme').height()/2;
			var _wdiv = $('#theme').width()/2;
            if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
                //$('#theme').css({'transform': 'scaleX('+_h+') scaleY('+_h+')'});
            }else if(_w<1&&_w<_h){
                $('#theme').css({'transform': 'scaleX('+_w+') scaleY('+_w+') ', 'top': (_hdiv -(_hdiv*_w/1) )*-1+'px', 'left': (_wdiv-(_wdiv*_w/1) )*-1+'px'});
            }else if(_h<1){
                $('#theme').css({'transform': 'scaleX('+_h+') scaleY('+_h+') ', 'top': (_hdiv-(_hdiv*_h/1) )*-1+'px', 'left': (_wdiv-(_wdiv*_w/1) )*-1+'px'});
            }else{
                $('#theme').css({'transform': 'scaleX(1) scaleY(1) translateX(-50%) translateY(-50%)',  'top': '50%', 'left':'50%'});
            }
        }
    };
    $( window ).resize( function(){_res();} );
    _res();
});

ahub.events.onPageInit.add(function(){
    //if($('.thm-page-content-assessment-quiz').length>0)ahub.theme.currentPageView.render();
    ahub.theme.currentPageView.children.filter(function(_v){return _v.model.get('type')=='assessment'}).every(function(_v){_v.render()});
    /*if(ahub.connect.mode.scorm1_2){
        $('.thm-scorm-completeBtn').fadeIn().on('tap', function(){
            ahub.connect.complete(); 
        });
    }*/
	
	//hide complete button from HTML output
	if(ahub.mode == 'html'){
		try{ 
			ahub.theme.currentPageView.model.get('contents').find(function(_e){return _.findWhere(_e.get('animation').items, {type:'complete'} ) }).contentView.remove() 
		}catch(err){
		};
	}
	
})

ahub.events.onQuizQuestionInit.add(function(_d){
	console.log('onQuizQuestionInit', _d.question.id);
    //$('.thm-page-content-assessment-quiz-question-text').show();
    //$('.thm-page-content-assessment-quiz-question-answers').show();
    //$('.thm-page-content-assessment-quiz-question-number').show();
}); 
ahub.events.onQuizAnswer.add(function(_d){
    console.log('onQuizAnswer', _d);
	if(ahub.model.attributes.attributes.get('assementSingleView')){
		return;
	}
    $('.thm-page-content-assessment-quiz-question-text').hide();
    $('.thm-page-content-assessment-quiz-question-answers').hide();
    $('.thm-page-content-assessment-quiz-controls-wrapper').prepend('<div class="thm-page-content-assessment-quiz-controls-btn thm-page-content-assessment-quiz-controls-btn-review thm-custom-medium-back-btn">'+ahub.language.reviewQuestionBtn+'<span></span></div><div class="thm-page-content-assessment-quiz-controls-btn thm-page-content-assessment-quiz-controls-btn-feedback thm-custom-medium-btn">'+ahub.language.reviewAnswerBtn+'<span></span></div>');
    $('.thm-page-content-assessment-quiz-controls-btn-feedback').hide();
    $('.thm-page-content-assessment-quiz-controls-btn-review').on('click', function(){
        $('.thm-page-content-assessment-quiz-controls-btn-review, .thm-page-content-assessment-quiz-controls-btn, .thm-page-content-assessment-quiz-question-feedback').hide();
        $('.thm-page-content-assessment-quiz-controls-btn-feedback, .thm-page-content-assessment-quiz-question-text, .thm-page-content-assessment-quiz-question-answers').show();
    });
    $('.thm-page-content-assessment-quiz-controls-btn-feedback').on('click', function(){
        $('.thm-page-content-assessment-quiz-controls-btn-review, .thm-page-content-assessment-quiz-controls-btn, .thm-page-content-assessment-quiz-question-feedback').show();
        $('.thm-page-content-assessment-quiz-controls-btn-feedback, .thm-page-content-assessment-quiz-question-text, .thm-page-content-assessment-quiz-question-answers').hide();
    });
	var _fbhtml=$('.thm-page-content-assessment-quiz-question-feedback .thm-page-content-element').html();
	if(_fbhtml.split('%')<2){
		return;
	}
    var _fbtxt = _fbhtml.split('|');
	var _class = ( $('.incorrect-answer').length >= 1 )?'incorrect-answer':'correct-answer';
    if(_fbtxt.length>1){
        var _fbtxtTop = _fbtxt[0].split('%');
        $('.thm-page-content-assessment-quiz-question-number').html('<span class="thm-quiz-question-title">'+_fbtxtTop.shift()+'</span><span class="thm-quiz-question-number">' + _fbtxtTop.shift() +'</span>' + _fbtxtTop.join('%')).addClass(_class);
        (_fbtxt[1].split(' ').join('').length>1) ? $('.thm-page-content-assessment-quiz-question-feedback .thm-page-content-element').html(_fbtxt[1]).show() : $('.thm-page-content-assessment-quiz-question-feedback').hide();
    }else{
        _fbtxt = _fbtxt[0].split('%');
        $('.thm-page-content-assessment-quiz-question-number').html('<span class="thm-quiz-question-title">'+_fbtxt.shift()+'</span><span class="thm-quiz-question-number">' + _fbtxt.shift() +'</span>').addClass(_class);
        _fbtxt = _fbtxt.join('%');
        (_fbtxt.replace(/\s/g, '').length>1) ? $('.thm-page-content-assessment-quiz-question-feedback .thm-page-content-element').html(_fbtxt).show() : $('.thm-page-content-assessment-quiz-question-feedback').hide();
    }
    if(ahub.model.attributes.attributes.get('assessmentFeedbackCorrectTextColorCheck') && ahub.model.attributes.attributes.get('assessmentFeedbackCorrectTextColor')){
        $('.thm-page-content-assessment-quiz-question-number.correct-answer').css('color',ahub.model.attributes.attributes.get('assessmentFeedbackCorrectTextColor'));
        $('.thm-page-content-assessment-quiz-question-number.correct-answer .thm-quiz-question-number').css('background-color',ahub.model.attributes.attributes.get('assessmentFeedbackCorrectTextColor'));
    }
    if(ahub.model.attributes.attributes.get('assessmentFeedbackCorrectBubbleTextColorCheck') && ahub.model.attributes.attributes.get('assessmentFeedbackCorrectBubbleTextColor')){
        $('.thm-page-content-assessment-quiz-question-number.correct-answer .thm-quiz-question-number').css('color',ahub.model.attributes.attributes.get('assessmentFeedbackCorrectBubbleTextColor'));
    }
    if(ahub.model.attributes.attributes.get('assessmentFeedbackIncorrectTextColorCheck') && ahub.model.attributes.attributes.get('assessmentFeedbackIncorrectTextColor')){
        $('.thm-page-content-assessment-quiz-question-number.incorrect-answer').css('color',ahub.model.attributes.attributes.get('assessmentFeedbackIncorrectTextColor'));
        $('.thm-page-content-assessment-quiz-question-number.incorrect-answer .thm-quiz-question-number').css('background-color',ahub.model.attributes.attributes.get('assessmentFeedbackIncorrectTextColor'));
    }
    if(ahub.model.attributes.attributes.get('assessmentFeedbackIncorrectBubbleTextColorCheck') && ahub.model.attributes.attributes.get('assessmentFeedbackIncorrectBubbleTextColor')){
        $('.thm-page-content-assessment-quiz-question-number.incorrect-answer .thm-quiz-question-number').css('color',ahub.model.attributes.attributes.get('assessmentFeedbackIncorrectBubbleTextColor'));
    }
});

ahub.actions.type.fullScreen = {
    property : "fullScreen",
    title : "Go full screen",
    run : function(el, options) {
        if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
            // exit full-screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }else{
            var i = document.getElementById("theme");
            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
        }
    },
    optionsConfig : []
}

//custom theme animations/events

ahub.actions.startCondition.onQuiz = {
		property : "onQuiz",
		title : "Assessment event",
		run : function(el, options) {
			 ahub.app.callbacks[options.pageId].add(function() {
				//debugger;
				var self = this;
				var defaults = {
				    "start-questionEvent" : "",
					"start-assessmentScore" : 0,
					"start-assessmentScoreLessthan" : 100,
					"start-delay" : 0
				};
				$.extend(defaults, options);
				this.options.callback = function() {
					if ( ahub.app.callbacks[self.options.id]) {
						 ahub.app.callbacks[self.options.id].run();
					}
				}
				
				var assessmentScore = Number(self.options["start-assessmentScore"]);
				var assessmentScoreLessthan = Number(self.options["start-assessmentScoreLessthan"]);
				
				var _qevent = options["start-questionEvent"].split('-')
				if( _qevent[0]=="show")ahub.events.onQuizQuestionInit.add(function(_d){
					console.log(_d, _qevent[1]);
					if(_d.question.id == _qevent[1] )ahub.actions.type[self.type].run(self.el, self.options);
				})
				if( _qevent[0]=="answered")ahub.events.onQuizAnswer.add(function(_d){
					console.log(_d, _qevent[1]);
					if(_d.question.id == _qevent[1])ahub.actions.type[self.type].run(self.el, self.options);
				})
				if( _qevent[0]=="allCompleted")ahub.events.onQuizCompleted.add(function(_d){
					console.log(_d, _qevent[1]);
					var _score=0;
					if(assessmentScore >= 0){
						var _lastAss = _.last(ahub.assessments.report.get('score').get("a-" + _d.assessment.model.get('id')));
						if(!_lastAss)return;
						_score = Math.floor(_lastAss.correct / _lastAss.total * 100);
					}
					if( (_score >= assessmentScore && _score <= assessmentScoreLessthan ) ){
						_.delay(function(){
							ahub.actions.type[self.type].run(self.el, self.options);
						}, Number(self.options["start-delay"]) )
					}
				})
				
			}, {
				type : options.type,
				el : el,
				options : options
			});
		},
		optionsConfig : [{
			dbType : "questionEvent",
			label : "Question",
			type : {
				component : "select",
				"default" : "",
				options : function(options) {
                    var result = new Array();
					var _asStartPoolId = ahub.theme.model.get('currentPageModel').get('contents').where({type:'assessment'})[0].get('item').get('startPool');
					var _as = ahub.model.get('pools').get(_asStartPoolId);
                    _.each(_as.get('questions').models, function(_q, _i){
						var __i = _i+1;
                        result.push({
                            value : "show-" + _q.id,
                            title : "#" + __i + " shown"
                        });
						result.push({
                            value : "answered-" + _q.id,
                            title : "#" + __i + " answered"
                        });
                    });
					result.push({
                            value : "allCompleted",
                            title : "All Completed"
                        });
					/*var video_els =  $('video','#theme');
					if (video_els.length) {
						_.each(video_els, function(video_el) {
                            if(video_els.data('title').length>0){							
                                result.push({
                                    value : video_els.attr('id'),
                                    title : video_els.data('title')
                                });
                            }
						});
					}*/
					return result;
				}
			}
		}, {
			dbType : "assessmentScore",
			label : "Assessment score >=",
			type : {
				component : "input",
				'default':"0",
				name : "assessmentScore"
			}
		}, {
			dbType : "assessmentScoreLessthan",
			label : "Assessment score <=",
			type : {
				component : "input",
				'default':"100",
				name : "assessmentScoreLessthan"
			}
		}, {
			dbType : "delay",
			label : "Delay",
			type : {
				component : "input",
				'default' : "0",
				name : "delay",
				measure : "ms",
				measureinfo : "Miliseconds"
			}
		}]
	}

ahub.actions.type.goToPage = {
    property : "goToPage",
    title : "Go to page",
    run : function(el, options) {
        var defaults = {
            "start-duration" : "500",
            "start-delay" : 0,
            "type-chapter" : 0,
            "type-page" : 1
        };
        $.extend(defaults, options);
        var page = ahub.model.get('chapters').at(defaults["type-chapter"]).get('pages').at(defaults["type-page"]);
		_.delay(function(){ 
			soundManager.stopAll();
			ahub.theme.app.loadPage(page.get("id"));
		}, defaults["start-delay"])
        
    },
    optionsConfig : [{
        dbType : "chapter",
        label : "Chapter index",
        type : {
            component : "input",
            'default':"0",
            name : "chapter"
        }
    }, {
        dbType : "page",
        label : "Page index",
        type : {
            component : "input",
            'default':"1",
            name : "page"
        }
    }]
}
//
ahub.actions.type.blind = {
    property : "blind",
    title : "Blind",
    run : function(el, options) {
        var defaults = {
            "start-duration" : "500",
            "start-delay" : 0,
            "type-showhide" : "show",
            "type-dir" : "both"
        };
        $.extend(defaults, options);
        if(defaults["type-showhide"]=="show"){
            el.delay(defaults["start-delay"]).show("blind", {
            direction : defaults["type-dir"]
            }, parseInt(defaults["start-duration"]), defaults.callback);
        }else{
            el.delay(defaults["start-delay"]).hide("blind", {
            direction : defaults["type-dir"]
            }, parseInt(defaults["start-duration"]), defaults.callback);    
        }
        
    },
    optionsConfig : [
    {
        dbType : "showhide",
        label : "Mode",
        type : {
            component : "select",
            options : [{
                value : "show",
                title : "Show"
            }, {
                value : "hide",
                title : "Hide"
            }]
        }
    },
    {
        dbType : "dir",
        label : "Direction from",
        type : {
            component : "select",
            options : [{
                value : "left",
                title : "Left"
            }, {
                value : "right",
                title : "Right"
            }, {
                value : "up",
                title : "Up"
            }, {
                value : "down",
                title : "Down"
            }]
        }
    }]
}
//
ahub.actions.type.fadeTo = {
    property : "fadeTo",
    title : "Fade",
    run : function(el, options) {
        var defaults = {
            "start-duration" : 500,
            "start-delay" : 0,
            "type-opacity" : 1
        };
        $.extend(defaults, options);
        el.delay(defaults["start-delay"]).fadeTo(defaults["start-duration"], defaults["type-opacity"], defaults.callback);   
        //ahub.theme.view.narrationBtnRegion.currentView.loadPageSectionNarration( defaults["type-narrFileName"] );
    },
    optionsConfig : [{
            dbType : "opacity",
            label : "Opacity",
            type : {
                component : "input",
                "default" : "0.5",
                name : "opacity"
            }
        }]
}

ahub.actions.type.playVideoAt = {
    property : "playVideoAt",
    title : "Play video at position",
    run : function(el, options) {
        var defaults = {
            "type-videoFileId" : "thm-header-video",
            "type-videoPosition" : 0
        };
        $.extend(defaults, options);
        if(!!defaults["type-videoPosition"] && Number(defaults["type-videoPosition"])>=0)videojs($('.video-js', '#thm-'+defaults["type-videoFileId"])[0]).currentTime();
        videojs($('.video-js', '#thm-'+defaults["type-videoFileId"])[0]).play();
    },
    optionsConfig : [{
            dbType : "videoFileId",
            label : "Video Name",
            type : {
                component : "select",
				options : function(options) {
                    var result = new Array();
                    _.each(ahub.theme.model.get('currentPageModel').get('contents').where({type:'video'}), function(_c){
                        result.push({
                            value : _c.get('id'),
                            title : _c.get('title')
                        });
                    });
					return result;
				}
            }
        },{
            dbType : "videoPosition",
            label : "Time (not req)",
            type : {
                "component": "input",
                "type": "number",
                'default': "0",
                "name": "gotoposition"
            }
        }]
}

ahub.actions.type.stopVideoAt = {
    property : "stopVideoAt",
    title : "Pause video",
    run : function(el, options) {
        var defaults = {
            "type-videoFileId" : "thm-header-video",
            "type-videoPosition" : 0
        };
        $.extend(defaults, options);
        console.log(defaults);
        var _pos = Number(defaults["type-videoPosition"]);
        // console.log(_pos);
        var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        if(deviceType=="iPhone" || deviceType=="iPad"){
            if(!!_pos && _pos>=0)$('video', '#thm-'+defaults["type-videoFileId"])[0].currentTime(_pos);
            $('video', '#thm-'+defaults["type-videoFileId"])[0].pause();
        }else{
            if(!!_pos && _pos>=0)videojs($('.video-js', '#thm-'+defaults["type-videoFileId"])[0]).currentTime(_pos);
            videojs($('.video-js', '#thm-'+defaults["type-videoFileId"])[0]).pause();
        }
    },
    optionsConfig : [{
            dbType : "videoFileId",
            label : "Video Name",
            type : {
                component : "select",
				options : function(options) {
                    var result = new Array();
                    _.each(ahub.theme.model.get('currentPageModel').get('contents').where({type:'video'}), function(_c){
                        result.push({
                            value : _c.get('id'),
                            title : _c.get('title')
                        });
                    });
					return result;
				}
            }
        }
        ,{
            dbType : "videoPosition",
            label : "Time (not req)",
            type : {
                "component": "input",
                "type": "number",
                'default': "-1",
                "name": "stopatposition"
            }
        }
        ]
}

ahub.actions.type.moveNextPage = {
    property : "moveNextPage",
    title : "Move to next page",
    run : function(el, options) {
        var defaults = {
				"start-duration" : "500",
				"start-delay" : 0,
				"type-delay" : 0
		};
        $.extend(defaults, options);
		var _delay = (parseInt(defaults["type-delay"])>0)?defaults["type-delay"]:defaults["start-delay"];
		_.delay(function(){ 
			if(options.pageId != ahub.theme.model.get('currentPageModel').get('id'))return;
			soundManager.stopAll();
			ahub.theme.app.loadPage(ahub.theme.model.attributes.currentPageIndex+1);
		}, parseInt(_delay) )
		
    },
    optionsConfig : []
}

ahub.actions.type.openURL = {
    property : "openURL",
    title : "Open Link",
    run : function(el, options) {
        var defaults = {
            "start-duration" : 500,
            "start-delay" : 0,
            "type-url" : ""
        };
        $.extend(defaults, options);
        _.delay(function(){
            console.log(defaults['type-url']);
            window.open(defaults['type-url'], '_blank');
            if('callback' in defaults)defaults.callback();
        }, Number(defaults["start-delay"]));
        //ahub.theme.view.narrationBtnRegion.currentView.loadPageSectionNarration( defaults["type-narrFileName"] );
    },
    optionsConfig : [{
            dbType : "url",
            label : "URL",
            type : {
                component : "input",
                "default" : "",
                name : "URL"
            }
        }]
}

// overwrite views

ahub.theme.views.contentsListPageView = Backbone.Marionette.ItemView.extend({
        tagName : 'li',
        className : 'thm-contents-page-li',
        template : '#thm-t-contentsListPageItem',
        initialize : function() {
            this.$el.prop("id", "thm-contents-page-li-" + this.model.get("id"));
            if(ahub.theme.model.get('currentPageModel') == this.model)this.$el.addClass('thm-contents-page-current');
            if( _.indexOf(ahub.theme.model.get('visitedPagesIds'), this.model.get('id'))>=0 )this.$el.addClass('thm-contents-page-visited');
        },
        events : {
            'tap' : 'openPage'
        },
        openPage : function(){
            //console.log(ahub.theme.model.get('currentPageModel').get('visited'));
                //ahub.app._lesson_mode=="normal" && 
                if(ahub.mode!="preview" && _.indexOf(ahub.theme.model.get('visitedPagesIds'), this.model.get('id'))<0 && ahub.theme.model.get('highestPageViewedIndex') <ahub.app.getPageInfo(this.model.get("id")).finalIndex )return;
                ahub.theme.app.loadPage(this.model.get("id"));
                $('#thm-modals, .thm-modal-section, #thm-contents-btn-hl').fadeOut(500);
        }
});

ahub.theme.views.PageContentAssessmentQuizAnswerItem = Backbone.Marionette.Layout.extend({
        tagName : 'div',
        className : 'thm-page-content-assessment-quiz-answer',
        regions : {
            text : ".thm-page-content-assessment-quiz-answer-text"
        },
        events : {
            'click' : 'registerAnswer'
        },
        initialize : function() {
            this.$el.prop("id", "thm-" + this.model.get("id"));
            // console.log(this);
        },
        onRender : function() {
            //debugger;
            var self = this;
			console.log(self);
			if(self.collection.length== 2 && self.collection.filter(function(_v){return _v.get('text').get('text').split(' ').length<=1 }).length==2 && ahub.model.get('langId')!=13 && ahub.model.get('langId')!=15 && ahub.model.get('langId')!=16 && ahub.model.get('langId')!=20 && ahub.model.get('langId')!=43){
				$('.thm-page-content-assessment-quiz-answer-letter', this.$el).html(self.model.get('text').get('text')[0]);
			}else{
				$('.thm-page-content-assessment-quiz-answer-letter', this.$el).html("&#"+Number(65+self.options.itemIndex)+";");
			}
            var element = this.model.get('text');
            if (element) {
                var textView = new ahub.theme.views.PageContentElement({
                    model : element,
                    parent: self
                });
                this.text.show(textView);
            }
        },
        registerAnswer : function() {
            var self = this;
            ahub.app.commands.execute(this.options.feedbackId, this.model.get('isCorrect'), self.$el);
        },
        template : '#thm-t-assessmentQuizAnswer'
})

ahub.theme.views.PageContentAssessmentQuiz = Backbone.Marionette.Layout.extend({
    tagName : 'div',
    className : 'thm-page-content-assessment-quiz',
    regions : {
        main : ".thm-page-content-assessment-quiz-main",
        controls : ".thm-page-content-assessment-quiz-controls"
    },
    ui : {
        questionNumber : ".thm-page-content-assessment-quiz-question-number"
    },
    initialize : function() {
        // console.log('_donotsplice PageContentAssessmentQuiz initialize', this.model)
        var self = this;
        var id = this.model.get("id");
        this.model.set('counter',0);
        // this.question = this.model.getQuestion( 0 );
        this.$el.prop("id", "thm-" + id);
		if(ahub.model.attributes.attributes.get('assementSingleView'))this.$el.addClass('thm-page-content-assessment-quiz-singleView');
        this.counter = 1;
        ahub.app.commands.setHandler("a-" + id, function() {
            //self.question = self.model.nextQuestion();
            if (self.model.getQuestion(0)) {
                var model = new Backbone.Model({
                    message : ahub.language.nextQuestionBtn,
                    execute : function() {
                        self.render();
                    }
                })
            }else{
                var model = new Backbone.Model({
                    message : ahub.language.nextBtn,
                    execute : function() {
                        // self.render();
						ahub.events.onQuizCompleted.run({"counter":self.counter, "question": this.question, "assessment": self});
						ahub.events.onQuizCompleted.reset();
						
						var _pageHasElementWithQuizCompleteEvent = _.some(ahub.theme.currentPageView.model.attributes.contents.models,function(_e){
							return _.some(_e.attributes.animation.items, function(_ani){
								return 'start-questionEvent' in _ani.options && _ani.options['start-questionEvent'] == "allCompleted"
							})
						})
						console.log('_pageHasElementWithQuizCompleteEvent: '+_pageHasElementWithQuizCompleteEvent)
						if(!_pageHasElementWithQuizCompleteEvent){
							self.model.get('mastery') ? self.render() : ahub.theme.app.loadPage(ahub.theme.model.get('currentPageIndex') + 1);
						}
                    }
                })
            }
            var collection = new Backbone.Collection([model])
            var view = new ahub.theme.views.PageContentAssessmentQuizControls({
                collection : collection
            });
            self.controls.show(view);
            ahub.events.onQuizAnswer.run({"counter":self.counter, "question": self.question, "assessment": self});
            ahub.events.onQuizAnswer.reset();
        
        });
    },
    onRender : function() {
        var self = this;
		if(this.counter == 1){
			ahub.events.onQuizInit.run();
			ahub.events.onQuizInit.reset();
		}
		
        var scoreId = "a-" + this.model.get('id');
        // console.log('assess onRender scoreId: ' + scoreId);
        this.question = self.model.nextQuestion(); //this.model.getQuestion(0);
        // console.log(question);
        if (this.question) {
            this.ui.questionNumber.html( (ahub.model.attributes.attributes.get('assementQuestionHeader'))?ahub.model.attributes.attributes.get('assementQuestionHeader').replace('#', Number(this.counter++)) : ahub.language.questionHeader.replace('#', Number(this.counter++) ));
            var view = new ahub.theme.views.PageContentAssessmentQuizQuestion({
                model : this.question,
                recordScore : self.model.recordScore,
                scoreId : scoreId
            });
            this.main.show(view);
			ahub.events.onQuizQuestionInit.run({"counter":self.counter, "question": this.question});
			ahub.events.onQuizQuestionInit.reset();
        } else {
			//
                this.counter = 1;
                var req_score = (self.model.has('score')) ? self.model.get('score') : 100;
                var feedbackText = 'You have completed this assessment.'
                var _lastAss = _.last(ahub.assessments.report.get('score').get(scoreId));
				if(!_lastAss)return;
                var _score = Math.floor(_lastAss.correct / _lastAss.total * 100);
            //  console.log('AssFinal',_score,req_score,self.model);
                if(_score < req_score && self.model.has('feedbackfail')){
                    feedbackText = self.model.get('feedbackfail').replace('%user-score%',_score);
                }else if(self.model.has('feedbackpass')){
                    feedbackText = self.model.get('feedbackpass').replace('%user-score%',_score);
                }
                var view = new ahub.theme.views.PageContentScore({ model : new Backbone.Model({feedbackText:feedbackText}), assessment : scoreId }); //ahub.language.passQuizMsg
                this.main.show(view);
                var array = new Array();
                var btnRedo = new Backbone.Model({
                btnClass : "thm-page-content-assessment-quiz-controls-btn-repeat",
                message : ahub.language.repeatAssessmentBtn,
                execute : function() {
                    self.startOver();
                }
                });
                if(_score < req_score )array.push(btnRedo);
                if (_score >= req_score) {
                var btnDone = new Backbone.Model({
					btnClass : "thm-page-content-assessment-quiz-controls-btn-next",
					message : (_score<req_score && self.model.get('mastery'))? ahub.language.repeatAssessmentBtn : ahub.language.nextBtn,
					execute : function() {
						//ahub.theme.view.controlsRegion.currentView.next();
						(_score<req_score && self.model.get('mastery')) ? self.startOver() : ahub.theme.app.loadPage(ahub.theme.model.get('currentPageIndex') + 1);

					}
                });
                array.push(btnDone);
                }
                var collection = new Backbone.Collection(array)
                var view = new ahub.theme.views.PageContentAssessmentQuizControls({
                collection : collection
                });
                self.controls.show(view);
        }
    },
    startOver:function(){
        this.model.redoQuiz("a-" + this.model.get('id'));
        //this.question = this.model.nextQuestion();
        this.render();
    },
    onClose : function() {
        if (ahub.lesson.mode == 'normal') {
            //ahub.theme.view.nextBtnRegion.currentView.enable();
        }
        this.counter = 0;
        var scoreId = "a-" + this.model.get('id');
        this.model.redoQuiz(scoreId);
        ahub.app.commands.removeHandler("a-" + this.model.get('id'));
        //
    },
    template : '#thm-t-assessmentQuiz'
});


ahub.theme.views.initResumePromptView = Backbone.Marionette.ItemView.extend({
    tagName : 'div',
    className : 'thm-confirm-prompt-wrapper',
    template : '#thm-t-resumeModulePrompt',
    events : {
        'tap #thm-initResumePrompt-yes-btn' : 'resumeModule',
        'tap #thm-initResumePrompt-no-btn' : 'startOverModule'
    },
    onRender : function(){
        $('#thm-modals, #thm-confirm-prompt').fadeIn(300);
    },
    resumeModule : function(){
        ahub.theme.view.narrationBtnRegion.currentView.loadPageNarration({_init:true});
        ahub.theme.app.resumeInit();
        this.exitPrompt();
        this.close();
    },
    startOverModule : function(){
        ahub.theme.app.loadPage(0);
        this.exitPrompt();
        this.close();
    },
    exitPrompt : function() {
        this.close();
    }
});

ahub.actions.type.print = {
    property : "print",
    title : "Print",
    run : function(el, options) {
        window.print();
    },
    optionsConfig : []
}