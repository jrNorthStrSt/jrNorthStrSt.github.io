/*    Developed by: ES Block, LLC - www.esblock.com
 Copyright 2012-2013 ES Block, LLC. All rights reserved.
 */

//ahub.cssClasses = _.defaults(ahub.cssClasses || {}, defaultsCssClasses);

ahub.cssClasses = {};
ahub.theme.defaultViews = {};
ahub.theme.defaultViews.Main = {
    viewType : Marionette.Layout,
    defaults : {
        id : 'theme-inner',
        hasRootView : false,
        template : '#thm-t-main',
        contentsPath : '.thm-page-contents',
        regions : {
            logoRegion : "#thm-logo",
            contentsBtnRegion : "#thm-contents-btn",
            contentsListRegion : "#thm-contents-list",
            glossaryBtnRegion : "#thm-glossary-btn",
            glossaryListRegion : "#thm-glossary-list",
            resourcesBtnRegion : "#thm-resources-btn",
            resourcesListRegion : "#thm-resources-list",
    		helpBtnRegion : "#thm-help-btn",
    		helpInstructionsRegion : "#thm-help-instructions",
    		exitBtnRegion : "#thm-exit-btn",
    		exitInstructionsRegion : "#thm-exit-instructions",
    		progressRegion : "#thm-progress",
    		replayBtnRegion : "#thm-replay-btn",
    		//narration page controls
    		narrationBtnRegion : "#thm-narration-btn",
    		//goto previous page
    		previousBtnRegion : "#thm-previouspage-btn",
    		//goto next page
    		nextBtnRegion : "#thm-nextpage-btn",
    		//goto next page
    		counterRegion : "#thm-counter",
            //
            confirmPromptRegion : "#thm-confirm-prompt",
    		//materials chapters and pages
            materialsRegion : "#thm-materials",
            //background
            backgroundRegion : "#thm-background-wrapper"
    	},
        initialize : function() {
            //ahub.model.get('attributes').on("change", this.stylesUpdated, this);
        },
        onRender : function(){
        	this.getContentsRegion();
            this.getGlossaryRegion();
            this.getResourcesRegion();
            this.getHelpRegion();
            this.getExitRegion();
            this.getProgressRegion();
            this.getReplayRegion();
            this.getNarrationRegion();
            this.getPreviousRegion();
            this.getNextRegion();
            this.getCounterRegion();
            this.getBackgroundRegion();
            //set language text direction
            $('body').addClass('lang-'+ahub.languages[ahub.data.langId].direction);
        },
        getContentsRegion : function(){
        	var _self = this;
        	this.contentsModel = new Backbone.Model({});
    		//add views to model
        	var contentsViews = {'button': new ahub.theme.views.contentsBtnView({model:_self.contentsModel}), 'list': new ahub.theme.views.contentsListView( {model:_self.contentsModel, collection: ahub.model.get('chapters')} )};
            this.contentsModel.set({views:contentsViews});
            //set regions
            this.contentsBtnRegion.show( _self.contentsModel.get('views').button );
            this.contentsListRegion.show( _self.contentsModel.get('views').list );
        },
        getGlossaryRegion : function(){
        	var _self = this;
           	this.glossaryModel = new Backbone.Model({});
    			//add views to model
        	var glossaryViews = {'button': new ahub.theme.views.glossaryBtnView({model:_self.glossaryModel}), 'list': new ahub.theme.views.glossaryListView( {model:_self.glossaryModel, collection: ahub.model.get('glossary')} )}
            this.glossaryModel.set({views:glossaryViews});
            //set regions
            this.glossaryBtnRegion.show( _self.glossaryModel.get('views').button );
            this.glossaryListRegion.show( _self.glossaryModel.get('views').list );
        },
        getResourcesRegion : function(){
        	var _self = this;
           	this.resourcesModel = new Backbone.Model({});
    			//add views to model
        	var resourcesViews = {'button': new ahub.theme.views.resourcesBtnView({model:_self.resourcesModel}), 'list': new ahub.theme.views.resourcesListView( {model:_self.resourcesModel, collection: ahub.model.get('documents')} )}
            this.resourcesModel.set({views:resourcesViews});
            //set regions
            this.resourcesBtnRegion.show( _self.resourcesModel.get('views').button );
            this.resourcesListRegion.show( _self.resourcesModel.get('views').list );
        },
        getHelpRegion : function(){
            var _self = this;
           	this.helpModel = new Backbone.Model();
    			//add views to model
        	var helpViews = {'button': new ahub.theme.views.helpBtnView({model:_self.helpModel})}//, 'instructions': new ahub.theme.views.helpInstructionsView( {model:_self.helpModel} )}
            this.helpModel.set({views:helpViews});
            //set regions
            this.helpBtnRegion.show( _self.helpModel.get('views').button );
            //this.helpInstructionsRegion.show( _self.helpModel.get('views').instructions );
        },
        getExitRegion : function(){
    		var _self = this;
           	this.exitModel = new Backbone.Model();
    			//add views to model
        	var exitViews = {'button': new ahub.theme.views.exitBtnView({model:_self.exitModel}), 'instructions': new ahub.theme.views.exitInstructionsView( {model:_self.exitModel} )}
            this.exitModel.set({views:exitViews});
            //set regions
            this.exitBtnRegion.show( _self.exitModel.get('views').button );
            this.exitInstructionsRegion.show( _self.exitModel.get('views').instructions );
        },
        getProgressRegion : function(){
            this.progressRegion.show( new ahub.theme.views.progressView({model:ahub.theme.model}) );
        },
        getReplayRegion : function(){
            this.replayBtnRegion.show( new ahub.theme.views.replayBtnView() );
        },
        getNarrationRegion : function(){
            this.narrationBtnRegion.show( new ahub.theme.views.narrationBtnView({model:ahub.model}) );
        },
        getPreviousRegion : function(){
            this.previousBtnRegion.show( new ahub.theme.views.previousBtnView() );
        },
        getNextRegion : function(){
            this.nextBtnRegion.show( new ahub.theme.views.nextBtnView() );
        },
        getCounterRegion : function(){
            this.counterRegion.show( new ahub.theme.views.counterView({model:ahub.theme.model}) );
        },
        getBackgroundRegion : function(){
            this.backgroundRegion.show( new ahub.theme.views.backgroundView({model:ahub.model.get('attributes') }) );
        }
    }
};

//Materials
//theme.templates.Materials = '<div id="thm-chapters" class="thm-wrapper thm-wrapper"></div>';
ahub.theme.defaultViews.Materials = {
    viewType : Marionette.View,
    defaults : {
        id : 'thm-chapters',
        className : 'thm-chapters',
        hasRootView : false,
        defaults : {
            animationClass : 'thm-chapter-animated'
        },
        initialize : function(options) {
            this.chapters = [];
            options = options || {};
            this.options = _.defaults({}, this.defaults, options);
        },
        setRootView : function(chapterView) {
            this.hasRootView = true;
            this.chapters.push(chapterView);
            chapterView.render();
            this.$el.append(chapterView.$el);
        },
        transitionChapter : function(_nextChapterView) {
            var _self = this;
            //define transition options
            var _transition = {};
            if (ahub.theme.model.previous('currentChapterIndex') > ahub.theme.model.get('currentChapterIndex')) {
                _transition = ahub.theme.transitions.chapters.backward;
                //_transition = {oldPage : {direction : 'right'},newPage : {direction : 'left'}};
            } else {
                _transition = ahub.theme.transitions.chapters.forward;
                //_transition_options = {oldPage : {direction : 'left'},newPage : {direction : 'right'}};
            }
            //remove current page from pages array - keep page view
			//_transition.type = Math.abs(ahub.model.get('previousChapterIndex')- ahub.model.get('currentChapterIndex'))<=1?"slide":"fade";
            var _currentChapterView = _.last(this.chapters);
            this.chapters.pop();
            //move away current page view and close view after animation completes
            _.last(_currentChapterView.pages).$el.removeClass( _currentChapterView.options.activePageClass ) ;
            _currentChapterView.$el.hide(_transition.out.type(), _transition.out.options, $.proxy(function() {
                _currentChapterView.close();
            }, _self));
            //add new page to pages array
            this.chapters.push(_nextChapterView);
            _nextChapterView.render();
            this.$el.append(_nextChapterView.$el);
            //show new pagebind
            _nextChapterView.$el.hide();
            ahub.theme.app.loadPageImgs();
            _.last(_nextChapterView.pages).$el.addClass( _nextChapterView.options.activePageClass );
            _nextChapterView.$el.show(_transition.enter.type(), _transition.enter.options, function() {
                ahub.events.onChapterInit.run({origin: 'chapter_init'});
                ahub.events.onChapterInit.reset();
                ahub.theme.model.get('currentPageModel').set('pageready',true);
                ahub.theme.app.loadPageReady();
            });
        },
        hideCurrentChapter: function(el,options){
        	
        },
        showNextChapter: function(el,options){
        	
        }
    }
}
//
//Materials - chapter
//<div class="thm-chapter-header thm-wrapper"><h3 class="thm-c-title"><%= title %></h3><h4 class="thm-c-desc"><%= description %></h4></div>

ahub.theme.defaultViews.Chapter = {
    viewType : Marionette.View,
    defaults : {
        hasRootView : false,
        template : '#thm-t-chapter',
        tagName : 'div',
        className : 'thm-chapter',
        text : 'monkeys',
        defaults : {
            animationClass : 'thm-page-animated',
            activePageClass : 'thm-page-active'
        },
        initialize : function(options) {
            this.pages = [];
            options = options || {};
            this.options = _.defaults({}, this.defaults, options);
        },
        setRootView : function(pageView) {
            //debugger;
            this.hasRootView = true;
            this.pages.push(pageView);
            pageView.render();
            this.$el.html(_.template($('#thm-t-chapter').html(), this.model.attributes));
            this.$el.find('.thm-chapter-pages').append(pageView.$el);
        },
        randomColor : function() {
            var rc = (~~(Math.random() * 0xFFFFFF)).toString(16);
            return '#' + new Array(7 - rc.length).join('0') + rc;
        },
        render : function() {
            this.$el.addClass('thm-chapter-' + ahub.theme.model.get('currentChapterIndex'));
            return this;
        },
        transitionPage : function(_nextPageView) {
            var _self = this;
            //define transition options
            var _transition = {};
            if ( ahub.theme.model.get('previousPageIndex') > ahub.theme.model.get('currentPageIndex') ) {
                _transition = ahub.theme.transitions.pages.backward;
            } else {
                _transition = ahub.theme.transitions.pages.forward; 
            }
            //remove current page from pages array - keep page view

            var _currentPageView = _.last(this.pages);
            this.pages.pop();
            //move away current page view and close view after animation completes
            _currentPageView.$el.removeClass(this.options.activePageClass);
            _currentPageView.$el.hide(_transition.out.type(), _transition.out.options, $.proxy(function() {
                _currentPageView.remove();
                ahub.events.onPageClose.run({origin: 'page_init'});
                ahub.events.onPageClose.reset();
            }, _self));
            //add new page to pages array
            this.pages.push(_nextPageView);
            _nextPageView.render();
            _nextPageView.$el.addClass(this.options.activePageClass);
            //show new pagebind
            this.$el.find('.thm-chapter-pages').append(_nextPageView.$el);
            _nextPageView.$el.hide();
            //
            ahub.theme.model.get('currentPageModel').set('pageready',false);
            ahub.theme.app.loadPageImgs();
            _nextPageView.$el.show(_transition.enter.type(), _transition.enter.options, function() {
                //after animation is complete - start animations of elements in the page
                ahub.theme.model.get('currentPageModel').set('pageready',true);
                ahub.theme.app.loadPageReady();
            });
        }
    }
}
//
//Materials - page
//

//Materials - page -> content -> object -> element
ahub.theme.defaultViews.PageContentElement = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        template : '#thm-t-content-element-item',
        className : "thm-page-content-element",
        modelEvents : {
            "change" : "renderPageContent"
        },
        events : {
        	"click": "onClick",
            "dblclick": "onDblClick" //textfield
        },
        renderPageContent : function(){
            //console.log('renderPageContent');
        },
        onClick : function(e){
            if(ahub.model.isAuth){
                console.log('PageContentElement onClick', this);
                // console.log($('.redactor-box',this.$el).length)
                if (ahub.model.isAuth && !this.editor){
                    this.options.parent.onClick();
                    this.options.parent.$el.draggable( 'enable' );
                }
                e.stopPropagation();
            }
        },
        onDblClick : function(e){
            console.log('PageContentElement onDblClick');
            var _self=this;
            if (ahub.model.isAuth && !this.editor && this.model.has('id') && Number(this.options.parent.model.get('activeAuthorId'))<=0) {
                //console.log(this.editor);
                this.options.parent.$el.draggable( 'disable' );
                this.options.parent.model.set('selected',true);
                //AuthoringApp.authoring.currentView.secondary.close();
                
                AuthoringApp.Toolbar.MenuDetails.Controller.showTextFormat(this.model);
				AuthoringApp.authoring.currentView.primary.currentView.children.each(function(view){view.model.set("isActive",view.model.get('title')=='Format')});
				AuthoringApp.authoring.currentView.primary.currentView.render();
                this.editor = this.$el.redactor({
                    toolbarExternal: '#aut-texttoolbar',
                    focusEnd: true,
                    replaceDivs:false,
                    pastePlainText:true,
                    cleanOnPaste: true,
                    tabKey: true,
                    buttonSource: true,
                    linebreaks: false,
                    imageUpload: '/cms/api/_Files/editModeUpload?cvId=' + ahub.model.get('cvId') + '&langId='+ahub.model.get('langId')+'&loc=cres',
                    imageManagerJson: '/cms/api/_Files/editModeList?cvId=' + ahub.model.get('cvId') + '&langId='+ ahub.model.get('langId') +'&loc=cres&type=images',
                    fileUpload: '/cms/api/_Files/editModeUpload?cvId=' + ahub.model.get('cvId') + '&langId='+ahub.model.get('langId')+'&loc=cres',
                    fileManagerJson: '/cms/api/_Files/editModeList?cvId=' + ahub.model.get('cvId') + '&langId='+ ahub.model.get('langId') +'&loc=cres&type=all',
                    plugins: [ 'specialcharacters', 'scriptbuttons', 'clearformatting', 'underline', 'fontfamily', 'fontsize', 'fontcolor', 'table', 'lineheight', 'video', 'imagemanager', 'filemanager'],
                    destroyCallback: function(e)
                    {
                        console.log('redactor destroyCallback');
                        //console.log('redactor destroyCallback'+ this.code.get());
                        //_self.model.set({'text': _self.editor.html()});
                        var _text = this.code.get().split(ahub.srcs.cv).join("<%cv%>");
                        _self.model.set({'text': _text});
                        _self.editor=null;
                        _self.options.parent.$el.draggable( 'enable' );
                    },
                    initCallback: function()
                    {
                        $('textfield',_self.editor).on('click',function(e){ 
                            e.stopPropagation();
                            return false; 
                        });
                    }
                });
                console.log(this.editor);
            }
            
            if(ahub.model.isAuth){
                e.stopPropagation();
            }
        },
        initialize : function() {
            this.$el.prop("id", "thm-" + this.model.get("id"));
        },
        onBeforeRender :function(){
            // console.log('PageContentElement onBeforeRender')
            this.initialBeforeRenderText = String(this.model.get('text'));
            var _updateSrcs = $('<div>').append( this.model.get('text').replace('img','imgtemp').split("<%cv%>").join(ahub.srcs.cv) );
            $('imgtemp', _updateSrcs).each(function(index, imgel) {
                 if($(imgel).attr('src').indexOf("cmd=file")==-1 && $(imgel).attr('src').indexOf(ahub.srcs.cv)==-1 && $(imgel).attr('src').indexOf(ahub.srcs.t)==-1){
                    $(imgel).attr('src', ahub.srcs.cv + $(imgel).attr('src'));
                 }
            });
            this.model.set({'text': String(_updateSrcs.html()).split("imgtemp").join("img").split("IMGTEMP").join("img") }, {silent:true} );
            _updateSrcs.remove();
            if (!ahub.model.isAuth) this.model.set({'text': this.model.get('text').replace('~date~',ahub.language.date).replace('~user-name~', ahub.connect.getValue('student_name') ) }, {silent:true} );
        },
        onRender : function() {
            // console.log('PageContentElement onRender')
        	var self = this;
            //if (ahub.model.isAuth && this.model.has('id') && Number(this.options.parent.model.get('activeAuthorId'))<=0) {}else{}
        },
        onClose: function(){
            if (ahub.model.isAuth && this.editor){
                this.editor=null;
            }
        }
    }
}

//Materials - page -> content -> audio item
ahub.theme.defaultViews.PageContentAudio = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        template : '#thm-t-content-audio-item',
        className : "thm-page-content-audio",
        ui :{
            "audio" : "audio",
            "playicon": ".thm-content-audio-control-playback i",
            "rail": ".thm-content-audio-control-slider-rail",
            "buff": ".thm-content-audio-control-slider-buff"
        },
        modelEvents : {
            "change" : "renderPageContent"
        },
        events : {
        	"click": "onClick",
            "click .thm-content-audio-control-playback": "playControl",
            "progress": "progress",
            "timeupdate": "timeupdate",
            "ended": "ended"
        },
        initialize : function() {
            this.$el.prop("id", "thm-content-audio-" + this.model.get("id"));
        },
        onRender: function(){
            var self = this;
             $(this.ui.audio[0]).on('progress', function(e){
                self.$el.trigger('progress');
            });
            $(this.ui.audio[0]).on('timeupdate', function(e){
                self.$el.trigger('timeupdate');
            });
            $(this.ui.audio[0]).on('ended', function(e){
                self.$el.trigger('ended');
            });
        },
        onClick : function(e){
            console.log('audio element click');
        },
        renderPageContent : function(){
            console.log('audio item renderPageContent');
        },
        playControl : function(){
            //console.log(this.ui.audio)
            if(this.ui.audio[0].paused){
                this.ui.audio[0].play();
                this.ui.playicon.html('pause');
            }else{
                this.ui.audio[0].pause();
                this.ui.playicon.html('play_arrow');
            }
        },
        progress: function(){
            //this.ui.buff
            //buffered
            //this.ui.buff.width( Number(100 - (this.ui.audio[0].buffered*100/this.ui.audio[0].duration)) +'%' );
        },
        timeupdate: function(){
            //this.ui.rail
            this.ui.rail.width( Number(this.ui.audio[0].currentTime*100/this.ui.audio[0].duration) +'%' );
        },
        ended: function(){
            //this.ui.rail
            this.ui.playicon.html('play_arrow');
            this.ui.rail.width( '0%' );
        }
    }
}

//Materials - page -> content -> video item
ahub.theme.defaultViews.PageContentVideo = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        template : '#thm-t-content-video-item',
        className : "thm-page-content-video",
        modelEvents : {
            "change" : "renderPageContent"
        },
        initialize : function() {
            // this.$el.prop("id", "thm-content-video-" + this.options.parent.model.get("id"));
        },
        onRender : function(e){ 
            var self = this;
            // $('video', self.$el).eq(0).attr('id','vv');
            // _.delay(function(){
            this.player = videojs($('video', this.$el)[0], { controls: "true" }, function () {
                
                var textTracks = this.textTracks()
                if(textTracks.length >0){
                    textTracks[0].mode = 'hidden'
                }

                    if(ahub.mode!='edit' && !!self.model.get('settings').autoplay )this.play();//attributes.settings.autoplay
					this.on('error',function(e) {
						if(!!self.model.get('settings').streaming && !!self.model.get('settings').streaming.trim()){
                            this.src(self.model.get('settings').streaming);
                        }else{
                            this.src( ahub.srcs.clearToken('https://'+ahub.srcs.cv_ahub + self.model.get('src')) );
                        }
                        if('autoplay' in self.model.get('settings') && self.model.get('settings').autoplay.toLowerCase().trim() == 'true' ){
                            this.play();
                        }
					});
                    this.on('timeupdate',function() {
                        // console.log('time: '+this.currentTime() );
                    });
                    this.on('ended', function() {
                        //console.log('awww...over so soon?');
                    });

                    if(ahub.mode!='preview' && ahub.mode!='edit'){
                       var myPlayer = this;

                        //Set initial time to 0
                        var currentTime = 0;
                        
                        //This example allows users to seek backwards but not forwards.
                        //To disable all seeking replace the if statements from the next
                        //two functions with myPlayer.currentTime(currentTime);

                        myPlayer.on("seeking", function(event) {
                        if (currentTime < myPlayer.currentTime()) {
                            myPlayer.currentTime(currentTime);
                        }
                        });

                        myPlayer.on("seeked", function(event) {
                        if (currentTime < myPlayer.currentTime()) {
                            myPlayer.currentTime(currentTime);
                        }
                        });

                        setInterval(function() {
                            if (!myPlayer.paused()) {
                                currentTime = myPlayer.currentTime();
                            }
                        }, 1000);
                    }
                });
            // },100);
        },
        renderPageContent : function(){
            // console.log('video item renderPageContent');
        }
    }
}

// Assessment > Quiz
ahub.theme.defaultViews.PageContentAssessmentQuiz = {
    viewType : Backbone.Marionette.Layout,
    defaults : {
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
            if (ahub.app._lesson_mode == 'normal') {
                ahub.theme.view.nextBtnRegion.currentView.disable();
            }
            var self = this;
            var id = this.model.get("id");
            this.question = this.model.nextQuestion();
            this.$el.prop("id", "thm-" + id);
            this.counter = 1;
            ahub.app.commands.setHandler("a-" + id, function() {
                self.question = self.model.nextQuestion();
                //if (self.question) {
                    var model = new Backbone.Model({
                        message : ahub.language.nextQuestionBtn,
                        btnClass : 'thm-page-content-assessment-quiz-controls-btn-next',
                        execute : function() {
                            self.render();
                        }
                    })
                    var collection = new Backbone.Collection([model])
                    var view = new ahub.theme.views.PageContentAssessmentQuizControls({
                        collection : collection
                    });
                    self.controls.show(view);
                /*} else {
                    if (ahub.app._lesson_mode == 'normal') {
                        ahub.theme.view.nextBtnRegion.currentView.enable();
                    }
                    self.counter = 1;
                    var scoreId = "a-" + self.model.get('id');
                    var view = new ahub.theme.views.PageContentScore({
                        model : new Backbone.Model(),
                        assessment : scoreId
                    });
                    self.main.currentView.feedback.show(view);
                    var array = new Array();
                    var btnRedo = new Backbone.Model({
                        btnClass : "thm-page-content-assessment-quiz-controls-btn-repeat",
                        message : ahub.language.repeatQuizBtn,
                        execute : function() {
                            self.model.redoQuiz(scoreId);
                            self.question = self.model.nextQuestion();
                            self.render();
                        }
                    });
                    array.push(btnRedo);
                    var collection = new Backbone.Collection(array)
                    var viewControl = new ahub.theme.views.PageContentAssessmentQuizControls({
                        collection : collection
                    });
                    self.controls.show(viewControl);
                }*/
            });
        },
        onRender : function() {
            var self = this;
            var scoreId = "a-" + this.model.get('id');
            var question = this.question;
            if (question) {
                this.ui.questionNumber.html('<span>'+ahub.language.questionHeader+'</span>' + this.counter++);
                var view = new ahub.theme.views.PageContentAssessmentQuizQuestion({
                    model : question,
                    recordScore : self.model.recordScore,
                    scoreId : scoreId
                });
                this.main.show(view);
            } else {/*
                 this.counter = 1;
                 var view = new ahub.theme.views.PageContentScore({
                 model : new Backbone.Model(),
                 assessment : scoreId
                 });
                 this.main.show(view);
                 var array = new Array();
                 var btnRedo = new Backbone.Model({
                 btnClass : "thm-page-content-assessment-quiz-controls-btn-repeat",
                 message : data_language.quiz.repeatQuizBtn,
                 execute : function() {
                 self.model.redoQuiz(scoreId);
                 self.render();
                 }
                 });
                 array.push(btnRedo);
                 if (view.model.get('score') >= 80) {
                 var btnDone = new Backbone.Model({
                 btnClass : "thm-page-content-assessment-quiz-controls-btn-next",
                 message : data_language.quiz.nextChapterQuizBtn,
                 execute : function() {
                 //TODO: implement goto next chapter
                 //alert('not implemented!');
                 }
                 });
                 array.push(btnDone);
                 }
                 var collection = new Backbone.Collection(array)
                 var view = new ahub.theme.views.PageContentAssessmentQuizControls({
                 collection : collection
                 });
                 self.controls.show(view);*/
            }
            ahub.events.onQuizInit.run();
            ahub.events.onQuizInit.reset();
        },
        onClose : function() {
            if (ahub.app._lesson_mode == 'normal') {
                ahub.theme.view.nextBtnRegion.currentView.enable();
            }
            this.counter = 1;
            var scoreId = "a-" + this.model.get('id');
            this.model.redoQuiz(scoreId);
            ahub.app.commands.removeHandler("a-" + this.model.get('id'));
        },
        template : '#thm-t-assessmentQuiz'
    }
}

ahub.theme.defaultViews.PageContentAssessmentQuizControls = {
    viewType : Backbone.Marionette.CollectionView,
    defaults : {
        getItemView : function() {
            return ahub.theme.views.PageContentAssessmentQuizControlsItem;
        },
        className : 'thm-page-content-assessment-quiz-controls-wrapper'
    }
}

ahub.theme.defaultViews.PageContentAssessmentQuizControlsItem = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        events : {
            'click' : 'onClick'
        },
        onClick : function() {
            this.model.get('execute')();
        },
        onRender : function() {
            this.$el.addClass(this.model.get('btnClass'));
        },
        className : 'thm-page-content-assessment-quiz-controls-btn thm-page-content-assessment-quiz-controls-btn-next',
        template : '#thm-t-assessmentQuizControls'
    }
}
ahub.theme.defaultViews.PageContentScore = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        className : 'thm-page-content-score',
        template : '#thm-t-assessmentQuizScore',
        initialize : function(options) {
            var score = ahub.assessments.report.get('score');
            var totalSum = 0;
            var correctSum = 0;
            if (options.assessment) {
                var array = score.get(options.assessment);
                if (array) {
                    var scoreElement = _.last(array);
                    totalSum += scoreElement.total;
                    correctSum += scoreElement.correct;
                }
            } else {
                _.each(score.attributes, function(element) {
                    _.each(element, function(element) {
                        totalSum += element.total;
                        correctSum += element.correct;
                    });
                });
            }
            this.model.set('score', Math.floor(correctSum / totalSum * 100));
        }
    }
}
ahub.theme.defaultViews.PageContentAssessmentQuizQuestion = {
    viewType : Backbone.Marionette.Layout,
    defaults : {
        tagName : 'div',
        className : 'thm-page-content-assessment-quiz-question',
        regions : {
            text : ".thm-page-content-assessment-quiz-question-text",
            answers : ".thm-page-content-assessment-quiz-question-answers",
            feedback : ".thm-page-content-assessment-quiz-question-feedback"
        },
        initialize : function(options) {
            var self = this;
            var id = this.model.get("id");
            this.$el.prop("id", "thm-" + id);
            self.model.set('answered', false);
            ahub.app.commands.setHandler("q-" + id, function(isCorrect, el) {
                console.log(self.model);
                if (!self.model.get('answered')) {
                    el.addClass('user-answer');
                    if (isCorrect) {
                        el.addClass('correct-answer');
                    } else {
                        el.addClass('incorrect-answer');
                        if(ahub.model.attributes.attributes.get('assessmentIncorrectAnswerHighlightCorrect')){
                            $('#thm-' + self.model.get('answers').findWhere({'isCorrect':true}).get('id') ).addClass('user-answer correct-answer');
                        }
                    }
                    var feedback = null;
                    if (isCorrect) {
                        feedback = self.model.get('correct');
                    } else {
                        feedback = self.model.get('incorrect');
                    }
                    var feedbackView = new ahub.theme.views.PageContentElement({
                        model : feedback,
                        parent : self
                    });
                    self.feedback.show(feedbackView);
                    options.recordScore(options.scoreId, isCorrect);
                    ahub.app.commands.execute(options.scoreId);
                    self.model.set('answered', true);

                }
            });
        },
        onRender : function() {
            var self = this;
            var element = this.model.get('text');
            if (element) {
                var textView = new ahub.theme.views.PageContentElement({
                    model : element,
                    parent : self
                });
                this.text.show(textView);
            }

            var answers = this.model.get('answers');
            if (answers) {
                var answersView = new ahub.theme.views.PageContentAssessmentQuizAnswer({
                    collection : answers,
                    feedbackId : 'q-' + self.model.get('id')
                });
                this.answers.show(answersView);
            }
        },
        onClose : function() {
            ahub.app.commands.removeHandler("q-" + this.model.get('id'));
        },
        template : '#thm-t-assessmentQuizQuestion'
    }
}
ahub.theme.defaultViews.PageContentAssessmentQuizAnswer = {
    viewType : Backbone.Marionette.CollectionView,
    defaults : {
        getItemView : function() {
            return ahub.theme.views.PageContentAssessmentQuizAnswerItem;
        },
        itemViewOptions: function(model, index) {
            var _itemViewOptions = this.options;
            _itemViewOptions.itemIndex = index;
            return _itemViewOptions;
        }
    }
}
ahub.theme.defaultViews.PageContentAssessmentQuizAnswerItem = {
    viewType : Backbone.Marionette.Layout,
    defaults : {
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
            $('.thm-page-content-assessment-quiz-answer-letter', this.$el).html("&#"+Number(913+self.options.itemIndex)+";");
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
    }
}

//temp layout

ahub.theme.defaultViews.ContentWrapper = {
    viewType : Backbone.Marionette.Layout,
    defaults : {
        tagName : 'div',
        className : 'thm-page-content',
        template : '#thm-t-page-contentwrapper',
        regions : {
            object : ".thm-page-content-object"
        },
        modelEvents : {
            "change:activeAuthorId" : "updateAuthor",
            "change:selected" : "selected",
            "sync" : "render"
        },
        collectionEvents: {
            //"add": "renderPage"
        },
        events : {
            "click .aut-page-content-title" : "onClick"
        },
        initialize : function() {
            console.log('ContentWrapper init id:'+this.model.get("id"));
            // this.listenTo(this.options.parent.model, 'change', this.renderFromParent);
            //
            this.$el.prop("id", "thm-" + this.model.get("id"));
            this.model.contentViewEl = this.$el;
			this.model.contentView = this;
            var isAuth = ahub.model.isAuth ? true : false;
            this.model.set({
                showTitle : isAuth
            }, {
                silent : true
            });            
            if (isAuth){
                var _self=this;
            	var title = this.model.get('title');
                var index = parseInt(_.last(title.split(' ')));
                //var authorEditingit = _.find(AuthoringApp.Authors.models, function(author){ var _loc=author.get('loc'); return (_loc.objectid == _self.model.get("id") && _loc.pageid == parentPageId)?true:false; });
            	//if(authorEditingit!=null)title="<i>"+authorEditingit.get("FirstName")+" "+authorEditingit.get("LastName")+"</i> <span>"+title+"</span>";
            	if (isFinite(index))
            		AuthoringApp.Toolbar.MenuDetails.Controller.setContentCounter(index);
            }
        },
        onRender : function() {
            var self = this; 
            console.log('ContentWrapper onRender id:'+this.model.get("id"));
            console.log('ContentWrapper this:');
            console.log(this);
            // console.log(this);
            var position = this.model.get('position');
            if (position) {
                this.$el.css('position', 'absolute');
                this.$el.css('top', position.top + 'px');
                this.$el.css('left', position.left + 'px');
            }
            ///
            var id = "thm-obj-" + this.model.get('id');
            var $contentObject = $('.thm-page-content-object', this.$el); 
            $contentObject.attr('id', id);
            if (this.model.get('attributes')) {
                var _attr = this.model.get('attributes');
                //this.$el.css({'top':_attr.top, 'left':_attr.left});
                $('.thm-page-content-object', this.$el).css(_.omit(_attr, ['top', 'left', 'background-image']));
                this.$el.css({'top':_attr.top, 'left':_attr.left});
                //$contentObject.css(_.omit(_attr, ['top', 'left', 'height', 'width', 'background-image', 'rotate']));
                if (_attr['padding']) {
                    $contentObject.css("padding", _attr['padding'].replace(/\s/g, '') +' '+ _attr['padding'].replace(/\s/g, '') );    
                }
            }
            switch(this.model.get('type')) {
                case 'element': 
                    //debugger;
                    // console.log(this.model.get('item'));
                    var element = this.model.get('item');
                    var view = new ahub.theme.views.PageContentElement({
                        model : element,
                        parent : self
                    });
                    //this.$('.thm-page-content-object',this.$el).attr('contentEditable','true');
                    this.object.show(view);
                break;
                case 'audio':
                    var element = this.model.get('item');
                    var view = new ahub.theme.views.PageContentAudio({
                        model : element,
                        parent : self
                    });
                    this.object.show(view);
                break;
                case 'video':
                    var element = this.model.get('item');
                    console.log(element);
                    var view = new ahub.theme.views.PageContentVideo({
                        model : element,
                        parent : self
                    });
                    this.object.show(view);
                break;
                case 'interaction':
                    //debugger;
                    var interaction = this.model.get('item');
                    var view = null;
                    switch(interaction.get('type')) {
                        case 'infotree':
                            view = new ahub.theme.views.PageContentInteractionInfotree({
                                model : interaction,
                                parent : self
                            });
                            break;
                    }
                    if (view) {
                        this.object.show(view);
                    }
                    break;
                case 'assessment':
                    //debugger;
                    var assessment = this.model.get('item');
                    var view = null;
                    switch(assessment.get('type')) {
                        case 'quiz':
                            view = new ahub.theme.views.PageContentAssessmentQuiz({
                                model : assessment,
                                parent : self
                            });
                            break;
                    }
                    console.log(view);
                    if (view) {
                        this.object.show(view);
                    }
                    break;
            }
            //
            if (ahub.model.isAuth) {
                // console.log('draggable')
                this.$el.draggable({
                    containment : ahub.theme.view.contentsPath,
                    //snap : true, // ahub.theme.view.contentsPath + '>div'
					delay:150,
                    addClasses : false,
                    start: function() {
                        if(self.model.get('activeAuthorId'))return false;
                    },
                    stop : function(e, ui) {
                        self.model.set('position', {top: ui.position.top.toFixed(1), left: ui.position.left.toFixed(1)} );
                        self.model.save({}, {
							chapterId : ahub.theme.model.get('currentChapterModel').get("id"),
							pageId : ahub.theme.model.get('currentPageModel').get("id")
						});
                    } //handle : '.aut-page-content-title'
                });
                /*if(this.model.get('selected')){
                 this.appendButtonAndClass();
                 }*/
                 /*this.$el.on('keydown', function(event){
                    if (event.keyCode == 16) {
                        self.$el.draggable({
                            snap: '.thm-page-content', snapMode: "outer"
                        });
                    }
                });*/
            }
            //debugger;
            var index = this.model.collection ? this.model.collection.indexOf(this.model) : 0;
            this.$el.css('z-index', index * 5);
            var attributes = this.model.get('attributes');
            if (attributes && attributes.width) {
                (Number(attributes.width))?this.$el.css('width', attributes.width + 'px'):this.$el.css('width', 'auto');
            }
            if (attributes && attributes.height) {
                (Number(attributes.height))?this.$el.css('height', attributes.height + 'px'):this.$el.css('height', 'auto');
            }
            if (attributes && attributes.cssClasses) {
            	_.each(attributes.cssClasses.split(','),function(classe){
            		self.$el.addClass(classe);
            	});                
            }            
            if (attributes && attributes['background-image']) {
                this.$el.css('background-image','url('+encodeURI(ahub.srcs.cv) + 'resources/' + encodeURI(attributes['background-image'])+')');
                if(attributes['background-repeat'])this.$el.css('background-repeat',attributes['background-repeat']);
                if(attributes['background-size'])this.$el.css('background-size',attributes['background-size']);
                if(attributes['background-position'])this.$el.css('background-position',attributes['background-position']);
            }
            //(attributes && attributes['background-color'])?this.$el.css('background-color',attributes['background-color'] ):this.$el.css('background-color','transparent');
            
            var ani = this.model.get('animation');
            if (ani && ani.items.length > 0) {
                if (ahub.model.isAuth) {
                    this.$el.addClass('aut-page-content-animated');
                } else {
                	//debugger;
                     ahub.app.callbacks =  ahub.app.callbacks || {}
                    var pageId = this.options.pageId;
                     ahub.app.callbacks[pageId] =  ahub.app.callbacks[pageId] || new Marionette.Callbacks();
                    _.each(ani.items, function(element) {
                    	element.options.pageId = pageId;
                    	element.options.id = element.id;//self.model.get('id');
                    	element.options.type = element.type;
                		ahub.actions.startCondition[element.options.start].run(self.$el,element.options);
                    });
                }
            }
            if (ani && ani.startHidden && !ahub.model.isAuth) {
            	//debugger;
                this.$el.css('display', 'none');
            }
            // if (this.model.get('selected'))this.setResizable();
            if (this._selected){
                console.log('SELECTED')
                this.model.set('selected',true);
                this.setResizable();
            }
            this.updateAuthor(false);
            // console.log('end onRender');
        },
        onClick : function(e) {
            console.log('content onClick - authorid:'+this.model.get('activeAuthorId') + ' - selected: ' +this.model.get('selected'));
            console.log(this.options.parent.view._holdOnRender);
            
            // remove previous selected element text editing tools -> this triggers a save model
            var _existingSelectedElemnt = ahub.theme.model.attributes.currentPageModel.attributes.contents.findWhere({'selected':true});
            if(_existingSelectedElemnt){
                var _existingTextEditingTools = $('.redactor-editor', _existingSelectedElemnt.contentView.$el);
                if(_existingTextEditingTools.length)_existingTextEditingTools.redactor('core.destroy');
            }

            if(this.model.get('activeAuthorId'))return;
            if(this.options.parent.view._holdOnRender){
                var _thisModelOnUpdatedCollection = this.options.parent.view.model.get('contents').findWhere({id:this.model.get('id')});
                _thisModelOnUpdatedCollection.set('selected',true);
                this.options.parent.view.renderPage();
                return;
            }
            this.model.set('selected', true);
            this._selected = true;
            //
            if(this.object.currentView.$el.hasClass('redactor-editor')){
                this.object.currentView.$el.redactor('core.destroy');
                //call selected to show content format tools
                this.selected(this.model, true);
            }
            if(e){
                e.stopPropagation();
                return false;
            }
        },
        updateAuthor : function(_event) {
            // console.log('update content author:'+this.model.get('activeAuthorId'));
            if(Number(this.model.get('activeAuthorId'))>0){
                //console.log( 'thm-'+this.model.get('item').get('id') );
                //if(CKEDITOR.instances['thm-'+this.model.get('item').get('id')])CKEDITOR.instances['thm-'+this.model.get('item').get('id')].destroy();
                var _author = AuthoringApp.Authors.get( this.model.get('activeAuthorId') );
                $('.aut-page-content-author', this.$el).html( '<i class="fa fa-pencil"></i> ' + _.first(_author.get('FirstName'))  + _.first(_author.get('LastName')) );
                this.$el.addClass('aut-page-content-activedev');
//             this.object.currentView.editor.destroy();
    	       //console.log(this.object.currentView)
            }else if(_event){
                // console.log('update content author: render');
                $('.aut-page-content-author', this.$el).html('');
                this.$el.removeClass('aut-page-content-activedev');
                this.render();
            }
        },
        selected : function(_m, _selected) {
             console.log('content selected: '+_selected+" id:" + this.model.get('id') );
             console.log('content selected view:');
             console.log(this);
            if(ahub.model.isAuth && _selected) {
                if(this.model.get('activeAuthorId')){
                    this.model.set('selected',false);
                    this._selected = false;
                    return;
                }
                var self = this;
                //update user hub location
                AuthoringApp.hub.connection.invoke('UserLocation', ahub.theme.model.get('currentPageModel').get("id"), this.model.get('id') );
                //remove selection from all other contents on pages
                _.each( ahub.model.get('chapters').models, function(_chapterM){
					_.each( _chapterM.get('pages').models, function(_pageM){
                        var _findSelectedContents=false;
                        console.log(_pageM.get('contents').models);
                        _findSelectedContents = _.reject(_pageM.get('contents').models, function(_cobj){ if(!_cobj.get('selected') || (_cobj.get('selected') && _cobj.get('id') == self.model.get('id')) )return _cobj; });
                        console.log(_findSelectedContents);
                        _.each(_findSelectedContents, function(_cobj){
                            _cobj.set('selected',false);
                        });
                    });
				});
                // _.each(ahub.theme.model.get('currentPageModel').get('contents').where({selected:true}), function(_c){
                //     if(_c.get('id') != self.model.get('id'))_c.set('selected',false); 
                // });
                //show authoring controls 
				AuthoringApp.Toolbar.MenuDetails.Controller.setContentModel(this.model);
				//if(!this.model.get('selected') || !AuthoringApp.authoring.currentView.secondary.currentView || _.find(AuthoringApp.authoring.currentView.primary.currentView.collection.models,function(button){return button.get('isActive')}).get('title')!="Format"){	
	                var tabs = [{
	                    title : "Style",
	                    view : new AuthoringApp.Toolbar.MenuDetails.FormatTextShapeView({
	                        model : self.model
	                    })
	                }, {
	                    title : "Arrange",
	                    view : new AuthoringApp.Toolbar.MenuDetails.FormatTextArranjeView({
	                        model : self.model
	                    })
	                }, {
	                    title : "Events",
	                    view : new AuthoringApp.Toolbar.MenuDetails.FormatTextEventsView({
	                        model : self.model
	                    })
	                }];
	                if (self.model.get('type') === 'audio')
	                    tabs.push({
	                        title : "Audio",
	                        view : new AuthoringApp.Toolbar.MenuDetails.FormatAudioView({
	                            model : self.model
	                        })
	                    })
	                if (self.model.get('type') === 'video')
	                    tabs.push({
	                        title : "Video",
	                        view : new AuthoringApp.Toolbar.MenuDetails.FormatVideoView({
	                            model : self.model
	                        })
	                    })
	                if (self.model.get('type') === 'assessment')
	                    tabs.push({
	                        title : "Assessment",
	                        view : new AuthoringApp.Toolbar.MenuDetails.FormatAssessmentView({
	                            model : self.model
	                        })
	                    })
	                var model = new AuthoringApp.Toolbar.MenuDetails.FormatModel({
	                    tabs : tabs
	                });
	                AuthoringApp.Toolbar.MenuDetails.Controller.showFormat(model);
					AuthoringApp.authoring.currentView.primary.currentView.children.each(function(view){view.model.set("isActive",view.model.get('title')=='Format')});
					AuthoringApp.authoring.currentView.primary.currentView.render();
                //}
                // console.log('content selected - set resizable');
                this.setResizable();
                
            }else if(ahub.model.isAuth && !_selected){
                this._selected = false;
                // console.log('selected false - content event - render content');
                if( this.$el.hasClass('ui-resizable') )this.$el.resizable("destroy");
                this.render();
            }
        },
        setResizable: function(){
            var self=this;
            if( this.$el.hasClass('ui-resizable') )this.$el.resizable("destroy");
            this.$el.resizable({
                handles : "all",
                //containment : "parent",
                stop : function(e, ui) {
                    // console.log('setResizable stop');
                    self.model.set('position', {top: ui.position.top.toFixed(1), left: ui.position.left.toFixed(1)});
                    var attributes = self.model.get('attributes') || {};
                    attributes.height = ui.size.height.toFixed(1);
                    attributes.width = ui.size.width.toFixed(1);
                    self.model.set('attributes', attributes);                       
                    self.model.trigger("change:position");
                    self.model.save({}, {
                        chapterId : ahub.theme.model.get('currentChapterModel').get("id"),
                        pageId : ahub.theme.model.get('currentPageModel').get("id")
                    });
                }
            });
        }
    }
}

//
//Materials -> PAGE <-

ahub.theme.defaultViews.Page = {
    viewType : Backbone.Marionette.CompositeView,
    defaults : {
        getItemView : function() {
            return ahub.theme.views.ContentWrapper;
        }, //remove temp
        itemViewContainer : ".thm-page-contents",
        template : '#thm-t-page',
        tagName : 'div',
        className : 'thm-page thm-wrapper', //thm-page-loading
        modelEvents : {
            "change" : "renderPage"
            // "sync" : "renderPage"
        },
        collectionEvents : {
            //"change" : "renderPage"
            // "sync": "renderPage"
        },
        events : {
        	"click":"onClick"
        },
        itemViewOptions: function(model, index) {
            return { pageId:this.model.get("id"), parent:{type:'page', id:this.model.get("id"), view:this} };
        },
        renderPage : function(_e) {
            if (ahub.model.isAuth && this.model.get('imgsloaded') && this.model.get('pageready') ){
                var _self=this;
                //console.log('renderPage changed:');
                //console.log(this.model.changed);
                this._holdOnRender=false;
                this._previousColInAuthMode=[];
                this.children.each(function(view){
                    if(!_self._holdOnRender && view.model.get('selected'))_self._holdOnRender=true;
                    if( Number(view.model.get('activeAuthorId'))>0 )_self._previousColInAuthMode.push({cid:view.model.get('id'), aid:view.model.get('activeAuthorId')}); 
                });
                // console.log(this._holdOnRender);
                if(!this._holdOnRender){
                    this.children.each(function(view){
                        view.remove();
                    });
                    if (this.model.get('contents'))this.collection = this.model.get('contents');
                    _.each(this.model.get('contents').models, function(_m){
                        var _needUpdateContAutState = _.findWhere(_self._previousColInAuthMode, {cid:_m.get('id')})
                        if(_needUpdateContAutState)_m.set('activeAuthorId',_needUpdateContAutState.aid);
                    });
                    this.render();
                }else{
                    // update visuals only while the content is selected
                    this.onRender();
                }
            }
        },
        initialize : function(options) {
            if (this.model.get('contents'))
                this.collection = this.model.get('contents');
            this.$el.prop("id", "thm-" + this.model.get("id"));
            //this.itemViewOptions = {pageId:this.model.get("id"), parent:{type:'page',id:this.model.get("id")} };
            //
            //ahub.model.on("change:attributes", this.resetCourseModelListeners, this);
            //this.resetCourseModelListeners();
        },
        resetCourseModelListeners : function(){
            //console.log('resetCourseModelListeners');
            //if(ahub.model.get('attributes').cid)ahub.model.get('attributes').on("change:pages-header-bgcolor", this.renderPage, this);
        },
        onRender : function() {
            //console.log('page on render');
            var attributes = this.model.get('attributes');            
            if (attributes) {
                (attributes['background-image'])?this.$el.css('background-image','url('+ahub.srcs.cv + 'resources/' + attributes['background-image']+')'):this.$el.css('background-image','');
                if(attributes['background-repeat'])this.$el.css('background-repeat',attributes['background-repeat']);
                (attributes['background-color'])?this.$el.css('background-color',attributes['background-color'] ):this.$el.css('background-color','transparent');
                if (attributes.cssClasses) {
                    var self = this;
                	_.each(attributes.cssClasses.split(','),function(classe){
                		self.$el.addClass(classe);
                	});                
                }
            }
            this.$el.addClass('thm-page-' + ahub.theme.model.get('currentPageIndex') );
            this.$el.addClass('thm-chapter-page-' + ahub.theme.model.get('currentChapterPageIndex'));
            //if (ahub.theme.model.get('currentPageIndex') >= ahub.theme.model.get('totalPages') - 1) this.$el.addClass('thm-lastpage');
        },
        // appendHtml : function(collectionView, itemView, index) {
        //     console.log(itemView); 
        //     if (!itemView.model.get('extraContent')) {
        //         collectionView.$(this.itemViewContainer,collectionView.$el).append(itemView.el);
        //     }
        // },
        onClick : function(e) {
            // console.log('page click', e, e.target.className, e.target.localName);
            if (ahub.model.isAuth && e.target.localName.includes('textarea') )return false;
            if (ahub.model.isAuth && ( e.target.className.includes('thm-page-contents') || e.target.localName=='body' || e.target.localName=='html' ) ) {
                AuthoringApp.hub.connection.invoke('UserLocation', ahub.theme.model.get('currentPageModel').get("id"), 0 );
                var self = this;
				AuthoringApp.Toolbar.MenuDetails.Controller.setContentModel(null);
				var tabs = [{
                    title : "Page",
                    view : new AuthoringApp.Toolbar.MenuDetails.FormatPageView({
                        model : self.model
                    })
                  }
                ,{
                   title : "Theme",
                   view : new AuthoringApp.Toolbar.MenuDetails.FormatThemeView({
                       model : ahub.model.get('attributes')
                   })                
                }];
                var model = new AuthoringApp.Toolbar.MenuDetails.FormatModel({
                    tabs : tabs
                });
                AuthoringApp.Toolbar.MenuDetails.Controller.showFormat(model);
				AuthoringApp.authoring.currentView.primary.currentView.children.each(function(view){view.model.set("isActive",view.model.get('title')=='Format')});
				AuthoringApp.authoring.currentView.primary.currentView.render();
                //
                self.children.each(function(view){
                    if( view.$el.hasClass('ui-resizable') ){
                        view.$el.resizable("destroy");
                    }
                    view.model.set({selected: false}, {silent : true});
                    view._selected=false;
                });
                //_.each(this.model.get('contents').models, function(_model){});
                //
                if(this._holdOnRender){
                    this.renderPage();
                }
            }
        },
        onClose : function(){
            // console.log('page on close');
            if($('#aut-main #primary .active').text()=='Format'){
                AuthoringApp.authoring.currentView.secondary.close();
                AuthoringApp.authoring.currentView.tertiary.close();
            }
        }
    }
}

ahub.theme.defaultViews.contentsBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-contents-btn-wrapper',
        template : '#thm-t-contentsBtn',
        events : {
            'tap a' : 'openContentsMenu'
        },
        openContentsMenu : function() {
            $('.thm-modal-section').fadeOut(500);
            $('#thm-contents-btn-hl').addClass('thm-btn-wrapper-active').show();
            $('#thm-modals, #thm-contents-list-section').fadeIn(300).find('.thm-modal-close').one( "tap", function() {
                $('#thm-modals, .thm-modal-section, #thm-contents-btn-hl').fadeOut(500);
            });
        }
    }
};
ahub.theme.defaultViews.contentsListView = {
    viewType : Backbone.Marionette.CollectionView,
    defaults : {
        tagName : 'ol',
        className : 'thm-list-wrapper thm-contents-list-wrapper',
        initialize : function() {
            this.listenTo(ahub.theme.model, "change:currentPageModel", this.render);
        },
        getItemView : function(item) {
         	return ahub.theme.views.contentsListChapterView;
        }
    }
};
ahub.theme.defaultViews.contentsListChapterView = {
    viewType : Backbone.Marionette.CompositeView,
    defaults : {
    	tagName : 'li',
    	className : 'thm-contents-chapter-li',
    	template : '#thm-t-contentsListChapterItem',
        // itemView: ahub.theme.views.contentsListPageView,
        itemViewContainer: ".thm-contents-pages-list",
    	initialize : function() {
            this.collection = this.model.get('pages');
    	    //this.$el.prop("id", "thm-contents-chapter-li-" + this.model.get("id"));
    	},
        getItemView : function(item) {
            return ahub.theme.views.contentsListPageView;
        }
    }
};
ahub.theme.defaultViews.contentsListPageView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'li',
        className : 'thm-contents-page-li',
        template : '#thm-t-contentsListPageItem',
        initialize : function() {
            this.$el.prop("id", "thm-contents-page-li-" + this.model.get("id"));
            if(ahub.theme.model.get('currentPageModel') == this.model)this.$el.addClass('thm-contents-page-current');
            if( _.indexOf(ahub.theme.model.get('visitedPagesIds'), this.model.get('id'))>=0 )this.$el.addClass('thm-contents-page-visited');
        },
        events : {
            'click' : 'openPage'
        },
        openPage : function(){
            if(ahub.app._lesson_mode=="normal" && _.indexOf(ahub.theme.model.get('visitedPagesIds'), this.model.get('id'))<0 && ahub.theme.model.get('highestPageViewedIndex') <ahub.app.getPageInfo(this.model.get("id")).finalIndex )return;
            ahub.theme.app.loadPage(this.model.get("id"));
            $('#thm-modals, .thm-modal-section, #thm-contents-btn-hl').fadeOut(500);
            //disable btns temp
            ahub.theme.view.nextBtnRegion.currentView.preventDoubleClick=true;
            ahub.theme.view.previousBtnRegion.currentView.preventDoubleClick=true;
            _.delay(function() {
                ahub.theme.view.nextBtnRegion.currentView.preventDoubleClick=false;
                ahub.theme.view.previousBtnRegion.currentView.preventDoubleClick=false;
            }, 1500);
        }
    }
};
//Glossary
ahub.theme.defaultViews.glossaryBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-glossary-btn-wrapper',
        template : '#thm-t-glossaryBtn',
        events : {
            'tap a' : 'openGlossary'
        },
        openGlossary : function() {
            $('.thm-modal-section').hide();
            this.$el.addClass('thm-btn-active');
            //$('#thm-glossary-btn-hl').addClass('thm-btn-wrapper-active').show();
            $('#thm-modals, #thm-glossary-list-section').fadeIn();
            $('#thm-glossary-list-section .thm-modal-close').one( "tap", function() {
                $('#thm-modals, .thm-modal-section, #thm-glossary-btn-hl').fadeOut();
            });
            if(ahub.model.get('glossary').models.length>0)this.model.get('views').list.children.findByModel(ahub.model.get('glossary').models[0]).showGlossaryTerm();//ahub.model.get('glossary')
        }
    }
};
ahub.theme.defaultViews.glossaryListView = {
    viewType : Backbone.Marionette.CollectionView,
    defaults : {
        tagName : 'ul',
        className : 'thm-list-wrapper thm-glossary-list-wrapper',
    	getItemView : function() {
    	 	return ahub.theme.views.glossaryListItemView
    	}
    }
};
ahub.theme.defaultViews.glossaryListItemView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
    	tagName : 'li',
    	className : 'thm-glossary-li', 
    	template : '#thm-t-glossaryListItem',
    	initialize : function() {
    	    this.$el.prop("id", "thm-glossary-li-" + this.model.get("id"));
    	},
        events : {
            'tap' : 'showGlossaryTerm'
        },
        showGlossaryTerm : function() {
            $('.thm-glossary-li').removeClass('thm-glossary-li-active');
            this.$el.addClass('thm-glossary-li-active');
            $('#thm-glossary-definition-title').html( this.model.get('title') );
            $('#thm-glossary-definition-description').html( this.model.get('description') );
        }
    }
};
//Resources
ahub.theme.defaultViews.resourcesBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-resources-btn-wrapper',
        template : "#thm-t-resourcesBtn",
        events : {
            'tap a' : 'openResources'
        },
        openResources : function() {
            $('.thm-modal-section').fadeOut(500);
            $('#thm-resources-btn-hl').addClass('thm-btn-wrapper-active').show();
            $('#thm-modals, #thm-resources-list-section').fadeIn(300).find('.thm-modal-close').one( "tap", function() {
                $('#thm-modals, .thm-modal-section, #thm-resources-btn-hl').fadeOut(500);
            });
        }
    }
};
ahub.theme.defaultViews.resourcesListView = {
    viewType : Backbone.Marionette.CollectionView,
    defaults : {
        tagName : 'ul',
        className : 'thm-list-wrapper thm-resources-list-wrapper',
		getItemView : function() {
		 	return ahub.theme.views.resourcesListItemView
		}
    }
};
ahub.theme.defaultViews.resourcesListItemView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
    	tagName : 'li',
    	className : 'thm-resources-li',
    	template : '#thm-t-resourcesListItem',
    	initialize : function() {
    	    this.$el.prop("id", "thm-resources-li-" + this.model.get("id"));
            if(String(this.model.get('link')).indexOf('http')<=-1)this.model.set('link', ahub.srcs.cv+this.model.get('link').split('<%cvr%>').join('resources'));
    	}
    }
};
//Help
ahub.theme.defaultViews.helpBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-help-btn-wrapper',
        template : '#thm-t-helpBtn',
        events : {
            'tap a' : 'openHelpInstructions'
        },
        openHelpInstructions : function() {
            //$('#thm-help-btn-hl').addClass('thm-btn-wrapper-active').show();
            if($('#thm-help-instructions').is(':visible')){
                $('#thm-help-instructions').fadeOut(500);
                return;
            }
            $('#thm-help-instructions').fadeIn(300).one( "tap", function() {
                $('#thm-help-instructions').fadeOut(500);
            });
        }
    }
};
//Exit
ahub.theme.defaultViews.exitBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-exit-btn-wrapper',
        template : '#thm-t-exitBtn',
        events : {
            'click a' : 'openExitPopup'
        },
        openExitPopup : function() {
            $('#thm-exit-btn-hl').addClass('thm-btn-wrapper-active').show();
            $('#thm-modals, #thm-exit-instructions').fadeIn(300).one( "click", function() {
                $('#thm-modals, .thm-modal-section, #thm-exit-btn-hl').fadeOut(500);
            }).find('#thm-exit-yes-btn').one( "click", function() {
                //Add API integration
                ahub.app.controller.close();
                //window.close();
            });
        }
    }
};
ahub.theme.defaultViews.exitInstructionsView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-instructions-wrapper thm-exit-instructions-wrapper',
        template : '#thm-t-exitInstructions'
    }
};
//Replay
ahub.theme.defaultViews.replayBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-reply-btn-wrapper',
        template : '#thm-t-replayBtn',
        events : {
            'tap' : 'replayAction'
        },
        replayAction : function() {
            if($('.thm-page-active').hasClass('thm_quizPage'))return;
           ahub.theme.currentPageView.render();
    
           ahub.events.onPageInit.run({origin:"page_replay"});
            ahub.events.onPageInit.reset();
    
           if( ahub.app.callbacks && ahub.app.callbacks[ahub.theme.model.get('currentPageModel').get('id')]){ //'init'
             ahub.app.callbacks[ahub.theme.model.get('currentPageModel').get('id')].reset();
             ahub.app.callbacks[ahub.theme.model.get('currentPageModel').get('id')].run();
             ahub.app.callbacks[ahub.theme.model.get('currentPageModel').get('id')].reset();
            }
           ahub.events.onPageLoad.run({origin:"page_replay"});
           ahub.events.onPageLoad.reset();
        }
    }
};
//Narration btn
ahub.theme.defaultViews.narrationBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-narration-btn-wrapper',
        template : '#thm-t-narrationBtn',
        events : {
            'tap' : 'playPauseClick'
        },
        initialize: function(){
            this.initLoading();
            ahub.events.onPageExit.add(this.stopNarration, this);
            ahub.events.onPageLoad.add(this.loadPageNarration, this);
            this.iosfixRenderOnce=false;
            //this.listenTo(this.model, "change:currentPageIndex", this.loadPageNarration);
        },
        initLoading : function(){
            if(!soundManager.enabled){
                _.delay($.proxy(function() {
                    this.initLoading();
                },this), 500);
            }else{
                this.loadPageNarration({_init:true});
            }
        },
        stopNarration : function(){
            if(this.narration){
                this.narration.stop();
            }
        },
        playPauseClick : function(event){
            event.stopPropagation();
            //iOS issue not playing narration till any page is render,this has to happen at least once, solution: run replay action once when play is clicked for first time.
            var isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
            if(!this.iosfixRenderOnce && isiOS){
                //console.log('this.iosfixRenderOnce: '+this.iosfixRenderOnce);
                ahub.theme.view.replayBtnRegion.currentView.replayAction();
                this.iosfixRenderOnce=true;
                return;
            }
            if(this.narration){
                if(this.narration.duration>10 ){ 
                    //this.$el.removeClass('thm-narration-btn-disabled');
                    if(!this.narration.playState || this.narration.paused){ //(this.narration.loaded && !this.narration.playState) || !
                        if(isiOS)this.$el.stop(true,true);
                        this.$el.addClass('thm-narration-btn-pause');
                        ahub.events.onPageNarrStart.run({origin:"page_narr"});
                        ahub.events.onPageNarrStart.reset();
                        this.narration.autoPlay = true;
                        this.narration.play();
                    }else{
                        this.narration.pause();
                        this.$el.removeClass('thm-narration-btn-pause');
                    }
                }
            }
        },
        loadPageSectionNarration : function(_id){
            var _self=this; 
            if(this.narration)this.narration.stop();
            this.existingSound=soundManager.getSoundById('n'+_id);
            if(this.existingSound){
                //if(this.existingSound!=this.narration){
                    this.narration.stop();
                    this.narration=this.existingSound;
                    this.narration.play();
    
                    this.$el.addClass('thm-narration-btn-pause');
                //}
            }else{
                this.$el.addClass('thm-narration-btn-loading');
                this.narration = soundManager.createSound({
                    id: 'n'+_id, url: ahub.srcs.cv +'resources/'+_id+'.mp3',
                    autoLoad: true, autoPlay: true,
                    onload: $.proxy(function() {
                            this.$el.removeClass('thm-narration-btn-loading');
                            if(this.narration.duration>0){
                                this.$el.removeClass('thm-narration-btn-disabled');
                                this.$el.addClass('thm-narration-btn-pause');
                                ahub.events.onPageNarrStart.run({origin:"page_narr"});
                                ahub.events.onPageNarrStart.reset();
                            }else{
                                this.$el.removeClass('thm-narration-btn-pause');
                                this.$el.addClass('thm-narration-btn-disabled');
                            }
                    },_self),
                    onsuspend: $.proxy(function() {
                        this.$el.removeClass('thm-narration-btn-loading');
                        this.$el.removeClass('thm-narration-btn-disabled');
                    },_self),
                    onfinish: $.proxy(function() {
                        this.$el.removeClass('thm-narration-btn-pause');
                    },_self),
                    volume:100
                });
            }
        },
        loadPageNarration : function(options){
            var _self=this; 
            var isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
            var _pageInfo = ahub.app.getPageInfo( ahub.theme.model.get('currentPageIndex') );
            //if narration exists stop it
            if(this.narration)this.narration.stop();
            //
            this._filename = _pageInfo.pageModel.get('attributes').narration;
            if(!this._filename)return;
            if( options.origin=='page_replay' && this.narration){
                this.narration=soundManager.getSoundById(_self._filename);
                if(this.narration){
                    this.narration.stop();
                    this.narration.play();
                    if(isiOS)this.$el.stop(true,true).css({opacity:1});
                    this.$el.addClass('thm-narration-btn-pause');
                }
                return;
            }
            var _autoPlay=(options._init==true)?false:true;
    
            //load narration
            this.newnarration=soundManager.getSoundById(_self._filename);
            if(this.newnarration){
                //if its a new page stop narration for previous page
                if(this.newnarration!=this.narration){
                    this.narration=this.newnarration;
                    this.narration.play();
                    if(isiOS)this.$el.stop(true,true).css({opacity:1});
                    this.$el.addClass('thm-narration-btn-pause');
                }
                if(this.narration.duration<=10 ){ //_page_model.get('visited') && 
                    //if narration wasnt found for the page
                    this.$el.removeClass('thm-narration-btn-pause');
                    this.$el.addClass('thm-narration-btn-disabled');
                }else{
                    this.$el.removeClass('thm-narration-btn-disabled');
                }
            }else{
                //load narration for new page
                //show loading gif
                this.$el.addClass('thm-narration-btn-loading');
                if(!ahub.theme.model.get('currentPageModel').get('imgsloaded') || !ahub.theme.model.get('currentPageModel').get('pageready') )return;
                if(isiOS)this.$el.stop(true,true).css({opacity:1});
                
                this.narration = soundManager.createSound({
                    id: _self._filename,
                    url: ahub.srcs.cv +'resources/'+ _self._filename,
                    autoLoad: true,
                    autoPlay: _autoPlay,
                    onload: $.proxy(function(_loaded) {
                       //console.log(_loaded);
                       this.$el.removeClass('thm-narration-btn-loading');
                        if(this.narration.duration>0 || _loaded){
                            if(this.narration.playState>0){
                                this.$el.removeClass('thm-narration-btn-disabled').addClass('thm-narration-btn-pause');
                                ahub.events.onPageNarrStart.run({origin:"page_narr"});
                                ahub.events.onPageNarrStart.reset();
                            }
                        }else{
                            this.$el.removeClass('thm-narration-btn-pause');
                            this.$el.addClass('thm-narration-btn-disabled');
                        }
                    },_self),
                    onsuspend: $.proxy(function() {
                        this.$el.removeClass('thm-narration-btn-loading');
                        this.$el.removeClass('thm-narration-btn-disabled');
                        var isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
                        if(!this.iosfixRenderOnce && isiOS){
                            this.$el.effect( 'pulsate', {times:10}, 5000 );
                            //this.iosfixRenderOnce=true;
                        }
                    },_self),
                    onfinish: $.proxy(function() {
                        this.$el.removeClass('thm-narration-btn-pause');
                        ahub.events.onPageNarrFinish.run({origin:"page_narr"});
                        ahub.events.onPageNarrFinish.reset();
                    },_self),
                    volume:100
                });
            }
        }
    }
};
//previous page
ahub.theme.defaultViews.previousBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-previous-btn-wrapper',
        template : '#thm-t-previousBtn',
        events : {
            'tap' : 'GoToPreviousPage'
        },
        initialize:function(){
            this.preventDoubleClick=false;
        },
        GoToPreviousPage : function() {
            var _self=this;
            if(!this.preventDoubleClick && !ahub.theme.view.nextBtnRegion.currentView.preventDoubleClick){
                ahub.theme.app.loadPage(ahub.theme.model.get('currentPageIndex') - 1);
                this.preventDoubleClick=true;
            }else{return}
            _.delay($.proxy(function() {
                this.preventDoubleClick=false;
            },_self), 1500);
        },
        disable:function(){
            this.$el.parent().addClass('thm-btn-disable');
            this.undelegateEvents();
            $('.thm-prev-btn-wrapper').clearQueue();
            $('.thm-prev-btn-wrapper').fadeIn(500);
        },
        enable:function(){
            this.$el.parent().removeClass('thm-btn-disable');
            this.delegateEvents(this.events);
        }
    }
};
//next page
ahub.theme.defaultViews.nextBtnView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-btn-wrapper thm-next-btn-wrapper',
        template : '#thm-t-nextBtn',
        events : {
            'tap' : 'GoToNextPage'
        },
        initialize:function(){
            this.preventDoubleClick=false;
        },
        GoToNextPage : function() {
            var _self=this;
            if(!this.preventDoubleClick && !ahub.theme.view.previousBtnRegion.currentView.preventDoubleClick){
                ahub.theme.app.loadPage(ahub.theme.model.get('currentPageIndex') + 1);
                this.preventDoubleClick=true;
            }else{return}
            _.delay($.proxy(function() {
                this.preventDoubleClick=false;
            },_self), 1500);
    
            // var isiOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
            // if(!this.iosfixRenderOnce && isiOS){
            //     ahub.theme.view.narrationBtnRegion.currentView.playPauseClick();
            // }
        },
        disable:function(){
            this.$el.parent().addClass('thm-btn-disable');
            this.undelegateEvents();
            $('.thm-next-btn-wrapper').clearQueue();
            $('.thm-next-btn-wrapper').fadeIn(500);
        },
        enable:function(){
            this.$el.parent().removeClass('thm-btn-disable');
            this.delegateEvents(this.events);
        }
    }
};
//Progress
ahub.theme.defaultViews.progressView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-progress-wrapper',
        template : '#thm-t-progress',
        initialize: function(){
            this.listenTo(this.model, "change:currentPageIndex", this.updateProgress);
            this.listenTo(this.model, "change:totalPages", this.updateProgress);
            //this.updateProgress();
        },
        updateProgress : function() {
            var _barMover = this.$el.find('.thm-progress-move');
            if(!_barMover.is(":visible"))_barMover.fadeIn(1000);
            _barMover.animate({width: (this.model.get('currentPageIndex')+1) * $('#thm-progress').width() / this.model.get('totalPages')}, 1000 );
        }
    }
};
//counter
ahub.theme.defaultViews.counterView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-counter-wrapper',
        template : '#thm-t-counter',
        initialize: function(){
            this.listenTo(this.model, "change:currentPageIndex", this.render);
            this.listenTo(this.model, "change:totalPages", this.render);
        },
        onRender : function(){
            //disable previous and net button if first or last page
            $('.thm-pagesnav-btn').removeClass('thm-btn-disable');
            if( (this.model.get('currentPageIndex')+1) >= this.model.get('totalPages') ){
                $('#thm-nextpage-btn').addClass('thm-btn-disable');
            }else if(this.model.get('currentPageIndex')<=0){
                $('#thm-previouspage-btn').addClass('thm-btn-disable');
            }
        }
    }
};
//background
ahub.theme.defaultViews.backgroundView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
        tagName : 'div',
        className : 'thm-background-inner',
        template : '#thm-t-background',
        modelEvents: {
            //"change": "render"
        },
        initialize: function(){
            ahub.model.on("change:attributes", this.renderStyles, this);
            // this.listenTo(this.model, "change", this.render);
        },
        renderStyles : function(){
            //console.log('render attributes');
            if(ahub.model.get('attributes').cid){
				this.model = ahub.model.get('attributes');
				this.render();
			}
        },
        onRender : function(){
            //console.log('backgroundView render - model:');
            //console.log(this.model);
            //check other theme styles and update here when model changes
            if(ahub.model.get('attributes').get('logo-image'))$('#thm-logo-bg').css({'background-image':'url('+ahub.srcs.cv+'resources/'+ahub.model.get('attributes').get('logo-image')+')'});
        }
    }
};

//confirm Prompt
ahub.theme.defaultViews.initResumePromptView = {
    viewType : Backbone.Marionette.ItemView,
    defaults : {
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
        },
        startOverModule : function(){
            ahub.theme.app.loadPage(0);
            this.exitPrompt();
        },
        exitPrompt : function() {
            $('#thm-modals, .thm-modal-section').fadeOut(500);
        }
    }
};
// set defaults
ahub.theme.views = ahub.theme.views || {};
for (var key in ahub.theme.defaultViews) {
    var temp = ahub.theme.defaultViews[key];
    ahub.theme.views[key] = temp.viewType.extend(_.defaults(ahub.theme.views[key] || {}, temp.defaults));
}