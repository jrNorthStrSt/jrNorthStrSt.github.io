/*****************************************************************************
Copyright 2012-2015 ES Block, LLC. All rights reserved.
******************************************************************************/
//app (general main application to kick off everything)
//Ahub Defaults
//init main model
$.extend(ahub, {
    app:new Backbone.Marionette.Application(),
    assessments:{ //(data related to assessments)
        report:new ahub.models.AssessmentReport()
    },
    // set course language
    language : ahub.languages[ahub.data.langId],
    VOActionQueues : {unsetVOPositions:{}},
    ready:function(){
        //when soundmanager + ahub.connect ready + authoring
        var _totalCalls = 2;
        if(ahub.model)_totalCalls = (ahub.model.isAuth)?3:2;
        //Start
        (!ahub.app.startCalls)?ahub.app.startCalls=1:ahub.app.startCalls+=1;
        if(ahub.app.startCalls>_totalCalls){
            ahub.app.start();
        };
    }
});
//srcs setup
$.extend(ahub.srcs,{
    toCode:function(_str){
        //return unescape(_str).split(ahub.srcs.cv+'resources/').join('<%cvr%>').split(ahub.srcs.cv).join('<%cv%>').split(ahub.srcs.t).join('<%t%>');
		function testregexf(match, offset, string) {
			console.log(_str, match)
			_match = match;
			//if(_match.indexOf('edrive/cdata')<0)return 'src="' + match;
			if(_match.indexOf('edrive/cdata')<0)return match;
			
			var _resplit = _match.split('resources/');
			//return 'src="'+ ( (_resplit.length>1)?'<%cvr%>'+_resplit[1]:_match.split(ahub.srcs.cv+'resources/').join('<%cvr%>').split(ahub.srcs.cv).join('<%cv%>').split(ahub.srcs.t).join('<%t%>') );
			return ( (_resplit.length>1)?'src="<%cvr%>'+_resplit[1] : _match.split(ahub.srcs.cv+'resources/').join('<%cvr%>').split(ahub.srcs.cv).join('<%cv%>').split(ahub.srcs.t).join('<%t%>') );
		  }
		  return (_str.indexOf('src=')>=0)? unescape( _str.replace(/src\s*=\s*["'](.+?)["'](.+?)/g, testregexf) ) : unescape(_str).split(ahub.srcs.cv+'resources/').join('<%cvr%>').split(ahub.srcs.cv).join('<%cv%>').split(ahub.srcs.t).join('<%t%>');
    },
    toPath:function(_str){
        return unescape(_str).split('<%cvr%>').join(ahub.srcs.cv+'resources/').split('<%cv%>').join(ahub.srcs.cv).split('<%t%>').join(ahub.srcs.t);
    },
    clearToken:function(_str){
        return unescape(_str).replace('<%cvr%>', '').replace('<%cv%>','').replace('<%t%>','');
    }
})
// EVENTS defaults
$.extend(ahub.events, {
        onThemeLoad: new Backbone.Marionette.Callbacks(),
        onPageInit: new Backbone.Marionette.Callbacks(),
        onPageLoad: new Backbone.Marionette.Callbacks(),
        onPageExit: new Backbone.Marionette.Callbacks(),
        onPageClose: new Backbone.Marionette.Callbacks(),
        onPageNarrStart: new Backbone.Marionette.Callbacks(),
        onChapterInit: new Backbone.Marionette.Callbacks(),
        onChapterLoad: new Backbone.Marionette.Callbacks(),
        onChapterClose: new Backbone.Marionette.Callbacks(),
        onCourseStart: new Backbone.Marionette.Callbacks(),
        onCourseLoad: new Backbone.Marionette.Callbacks(),
        onCourseComplete: new Backbone.Marionette.Callbacks(),
        onQuizInit: new Backbone.Marionette.Callbacks(),
        onQuizQuestionInit: new Backbone.Marionette.Callbacks(),
        onQuizAnswer: new Backbone.Marionette.Callbacks(),
		onQuizCompleted: new Backbone.Marionette.Callbacks(),
        onCourseExit: new Backbone.Marionette.Callbacks()
});
//LESSON defaults
$.extend(ahub.lesson, {
    mode:'',
    status:'',
    location:0,
    setPageViewed:function(){
    },
    complete:function(_obj){
        (!_obj.score)?ahub.connect.completeCourse(100):ahub.connect.completeCourse(_obj.score);
    },
    exit:function(){
        ahub.events.onCourseExit.reset();
        ahub.events.onCourseExit.run({origin:'controller'});
        ahub.events.onCourseExit.reset();
        ahub.connect.exitCourse();
    }
});
// THEME defaults
$.extend(ahub.theme, {
    app:new Backbone.Marionette.Application(),
    model:new Backbone.Model({
            currentPageIndex:0,
            currentChapterIndex:0,
            currentChapterPageIndex:0,
            highestPageViewedIndex:0,
            currentChapterModel:0,
            currentPageModel:0,
            totalPages:0,
            visitedPagesIds:[]
    }),
    view:{}, 
    styles:{
        addStyle:function(_obj){ahub.theme.styles[_obj.applyTo][_obj.value]=_obj.title;},
        pages:{},
        contents:{}
    },
    transitions:{ 
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
                enter:{type:function(){ return "slide"; },options:{direction : 'left',duration:1000}}, 
                out:{type:function(){ return "slide"; },options:{direction : 'right',duration:1000}}}, 
            forward:{ 
                enter:{type:function(){ return "slide"; },options:{direction : 'right',duration:1000}}, 
                out:{type:function(){ return "slide"; },options:{direction : 'left',duration:1000}} }} 
    },
    typography:{//(future for editor: fonts etc)
        fonts:{}
    },
    layouts:{},//(future pages layouts)
    animations:{}
});

/* WAIT FOR DOM TO LOAD */
$( function(){
    //SoundManager 
    soundManager.setup({url: ahub.srcs.shared+'js/sm2_swf/', preferFlash: false, debugMode:false, onready:function(){ahub.ready();} });        
    //
    ahub.connect.init({onLoad:function(){ahub.ready();}});
    
    ahub.model = new ahub.models.Course(ahub.data,{parse:true});
    ahub.model.isAuth=(ahub.mode=='edit')?true:false;
    
    // THEME model current defaults
    ahub.theme.model.set('currentChapterModel', ahub.model.get('chapters').at(0) );
    ahub.theme.model.set('currentPageModel', ahub.model.get('chapters').at(0).get('pages').at(0) );
    
    ahub.app.addRegions({ mainRegion : "#theme" });
    // app addInitializer
    ahub.app.addInitializer(function() {
        console.log('ahub.app start');
        ahub.theme.view = new ahub.theme.views.Main();
        ahub.app.mainRegion.show(ahub.theme.view);
        ahub.lesson.location = Number(ahub.connect.getValue('lesson_location'));
        ahub.lesson.mode = ahub.connect.getValue('lesson_mode');
        ahub.lesson.status = ahub.connect.getValue('lesson_status');
        if( _.isNumber(ahub.lesson.location) &&  Number(ahub.lesson.location) > 0 ){
            this.findAndSetIndexes(Number(ahub.lesson.location));
            // if video is found set previous page.. this is to avoid IE issues resetting video src if video fails to load
            if(ahub.theme.model.get('currentPageModel').get('contents').findWhere({"type":"video"})){
                this.findAndSetIndexes(Number(ahub.lesson.location - 1));
            }
        }else{
            this.findAndSetIndexes(0);
        }
        //theme app
        ahub.theme.app.start();
        ahub.events.onCourseStart.run({origin: 'course_init'});
        //set total pages in the course
        _.each( ahub.model.get('chapters').models, function(elec){ ahub.theme.model.set('totalPages', ahub.theme.model.get('totalPages')+_.size(elec.get('pages').models) ) }); 
        
        //if last lesson location was recorded, check if user wants to resume or start over
        if( _.isNumber(ahub.lesson.location) &&  Number(ahub.lesson.location) > 0 && (ahub.model.get('chapters').length > 1 || ahub.model.get('chapters').at(0).get('pages').length > 1 ) ){
            //ask user if want to resume where left off
            ahub.theme.view.confirmPromptRegion.show( new ahub.theme.views.initResumePromptView() );
        }else{
            ahub.theme.app.resumeInit();
        }
    });
    // find page index by model
    ahub.app.getPageInfo  = function(_pageIndex) {
        console.log('ahub.app.getPageInfo');
        var _self = this;
        this.totalPages = 0;
        var _totalPagesInChapter = 0;
        var _pageFound=false;
        var _pageChapter=Backbone.Model.extend({});
        _.every(ahub.model.get('chapters').models, function(chapterModel, chapterIndex, list) {
            _pageChapter=chapterModel;
            _totalPagesInChapter = chapterModel.get('pages').length;
            //console.log('_pageFound: '+_pageFound);
            //console.log('1 - totalPages count:' + _self.totalPages + '_totalPagesInChapter: ' + _totalPagesInChapter)
            // if _pageIndex is a number (the page count in the entire course) - not the page id
            if(_.isNumber(_pageIndex)){
                if (Number(_self.totalPages + _totalPagesInChapter) > _pageIndex) {
                    //console.log('2 - totalPages count:' + _self.totalPages + '_totalPagesInChapter: ' + _totalPagesInChapter + ' _pageIndex: ' + _pageIndex);
                    _pageFound=true;
                }
            // else if _pageIndex is the page id  
            }else{
                var _pageModel = _.find(chapterModel.get('pages').models, function(elepage){ if(elepage.id==_pageIndex)return elepage; });
                //check if page model was found and set the real _pageIndex
                if(_.isObject(_pageModel)){
                    _pageIndex = _.indexOf(chapterModel.get('pages').models, _pageModel) + _self.totalPages;
                    _pageFound=true;
                }
            }
            if(_pageFound)
                return false;
            _self.totalPages += _totalPagesInChapter;
            //console.log('_pageFound:'+_pageFound+'_self.totalPages: '+_self.totalPages);
            return true;
        });
        return {finalIndex:_pageIndex, pageModel: _pageChapter.get('pages').at( Number(_pageIndex - _self.totalPages) ), pageFound:_pageFound};
    };
    ahub.app.findAndSetIndexes = function(_pageIndex) {
        console.log('ahub.app.findAndSetIndexes');
        var _self = this;
        this.totalPages = 0;
        var _totalPagesInChapter = 0;
        var _pageFound=false;
        _.every(ahub.model.get('chapters').models, function(chapterModel, chapterIndex, list) {
            _totalPagesInChapter = chapterModel.get('pages').length;
            //console.log('_pageFound: '+_pageFound);
            //console.log('1 - totalPages count:' + _self.totalPages + '_totalPagesInChapter: ' + _totalPagesInChapter)
            // if _pageIndex is a number (the page count in the entire course) - not the page id
            if(_.isNumber(_pageIndex)){
                if (Number(_self.totalPages + _totalPagesInChapter) > _pageIndex) {
                    //console.log('2 - totalPages count:' + _self.totalPages + '_totalPagesInChapter: ' + _totalPagesInChapter + ' _pageIndex: ' + _pageIndex);
                    var _pageModel = chapterModel.get('pages').at(Number(_totalPagesInChapter));
                    _pageFound=true;
                }
            // else if _pageIndex is the page id  
            }else{
                var _pageModel = _.find(chapterModel.get('pages').models, function(elepage){ if(elepage.id==_pageIndex)return elepage; });
                //check if page model was found and set the real _pageIndex
                if(_.isObject(_pageModel)){
                    _pageIndex = _.indexOf(chapterModel.get('pages').models, _pageModel) + _self.totalPages;
                    _pageFound=true;
                }
            }
            if(_pageFound) {
                //save new page index
                ahub.theme.model.set('previousPageIndex', ahub.theme.model.get('currentPageIndex') );
                ahub.theme.model.set('currentPageIndex', _pageIndex );
                ahub.theme.model.set('currentChapterIndex', chapterIndex);
                ahub.theme.model.set('currentChapterPageIndex', Number(_pageIndex - _self.totalPages) );
                if( _pageIndex > ahub.theme.model.get('highestPageViewedIndex') )ahub.theme.model.set('highestPageViewedIndex', _pageIndex);
                ahub.theme.model.set('currentChapterModel', chapterModel);
                ahub.theme.model.set('currentPageModel', chapterModel.get('pages').at( Number(_pageIndex - _self.totalPages) ) );
                ahub.theme.model.set('visitedPagesIds', _.union(ahub.theme.model.get('visitedPagesIds'), ahub.theme.model.get('currentPageModel').get('id') ) );
                //ahub.currentChapterPageIndex = Number(_pageIndex - _self.totalPages);
                //if(ahub.model.get('currentChapterIndex'))
                //ahub.previousChapterIndex= ahub.theme.model.get('currentChapterIndex');
                //ahub.theme.model.get('currentChapterIndex')=chapterIndex;
                //save previous chapter model
                //ahub.model.set('previousChapter', ahub.model.get('currentChapter'));
                //ahub.theme.model.get('currentPageModel').set('visited',1);
                //ahub.model.set('previousPage', ahub.theme.model.get('currentPageModel'));
                return false;
            }
            //ahub.theme.model.set('totalPages', ahub.theme.model.get('totalPages')+_totalPagesInChapter);
            _self.totalPages += _totalPagesInChapter; 
            return true;
        });
        return {finalIndex:_pageIndex, pageFound:_pageFound};
    };
    
    // THEME APP
    ahub.theme.app.addInitializer(function() {
        console.log('ahub.theme.app start');
        // set Materials main region
        ahub.theme.materialsView = new ahub.theme.views.Materials({
            model : ahub.model
        });
        ahub.theme.currentChapterView = new ahub.theme.views.Chapter({
            model : ahub.theme.model.get('currentChapterModel')
        });
        ahub.theme.currentPageView = new ahub.theme.views.Page({
            model : ahub.theme.model.get('currentPageModel')
        });
        ahub.theme.currentPageView.$el.addClass(ahub.theme.currentChapterView.options.activePageClass );
        ahub.theme.currentChapterView.setRootView(ahub.theme.currentPageView);
        ahub.theme.materialsView.setRootView(ahub.theme.currentChapterView);
        ahub.theme.view.materialsRegion.show(ahub.theme.materialsView);
        ahub.events.onChapterInit.run({origin:'loadPage'});
        ahub.events.onChapterInit.reset();
        ahub.events.onPageInit.run({origin: 'course_init'});
        ahub.events.onPageInit.reset();
        //
    });
    ahub.theme.app.resumeInit = function() {
        console.log('resumeInit');
        // Get extra contents
        this.createExtraContents(ahub.theme.model.get('currentPageModel'));
        //if course has object calbacks
        this.loadPageImgs();
        ahub.theme.model.get('currentPageModel').set('pageready',true);
        ahub.theme.app.loadPageReady();
    };
    ahub.theme.app.loadPageImgs = function() {
        console.log('ahub.theme.app.loadPageImgs');
        var _pageview=ahub.theme.currentPageView;
        if(ahub.theme.model.get('currentPageModel').get('imgsloaded'))return;
        //
        var totalImgs = $('img', _pageview.$el).length;
        var totalImgsLoaded=0;
        //console.log('totalImgs:'+totalImgs+'totalImgsLoaded:'+totalImgsLoaded);
        if(totalImgs<=0){
            ahub.theme.model.get('currentPageModel').set('imgsloaded', true);
            // _pageview.$el.removeClass('thm-page-loading');
            this.loadPageReady();
        }else{
            $('img', ahub.theme.currentPageView.$el).each(function(index, imgel) {
                if(this.complete || (imgel.width>0 && imgel.height>0) ){
                    totalImgsLoaded++;
                    if(totalImgsLoaded >= totalImgs){
                        ahub.theme.model.get('currentPageModel').set('imgsloaded', true);
                        // _pageview.$el.removeClass('thm-page-loading');
                        ahub.theme.app.loadPageReady();
                    }
                    return;
                }
                $(this).load(function() {
                    totalImgsLoaded++;
                    if(totalImgsLoaded >= totalImgs){
                        ahub.theme.model.get('currentPageModel').set('imgsloaded', true);
                        // _pageview.$el.removeClass('thm-page-loading');
                        ahub.theme.app.loadPageReady();
                    }
                });
                //attempt to triger event on IE
                $(this).attr("src", $(this).attr("src"));
            });
        }
    };
    ahub.theme.app.loadPageReady = function() {
        console.log('ahub.theme.app.loadPageReady');
        if(ahub.theme.model.get('currentPageModel').get('imgsloaded') && ahub.theme.model.get('currentPageModel').get('pageready') ){
            ahub.theme.currentPageView.$el.removeClass('thm-page-loading');
            console.log('loadPageReady');
            var pageId = ahub.theme.model.get('currentPageModel').get('id');

            ahub.events.onPageLoad.run({origin: 'page_init'});
            ahub.events.onPageLoad.reset();

            if ( ahub.app.callbacks &&  ahub.app.callbacks[pageId]){
                    ahub.app.callbacks[pageId].reset();
                    ahub.app.callbacks[pageId].run();
                    ahub.app.callbacks[pageId].reset();
            }
            if(ahub.events.onCourseLoad._deferred.state()=="pending")ahub.events.onCourseLoad.run({origin: 'course_init'});
        }else if(!ahub.theme.model.get('currentPageModel').get('imgsloaded') ){
            //show loading gif
            ahub.theme.currentPageView.$el.addClass('thm-page-loading');
        }
    };
    ahub.theme.app.loadPage = function(_pageIndexOrId) {
        console.log('ahub.theme.app.loadPage - _pageIndexOrId:'+_pageIndexOrId);
        //only advance if _pageIndex is > 0
        if(_.isNumber(_pageIndexOrId))if(_pageIndexOrId<0)return;
        //keep temp old page id to make sure we are not loading the same page
        var _oldPageId = ahub.theme.model.get('currentPageModel').get('id');
        //FIND AND SET ahub.theme.model vars for current page
        var _findAndSetIndexes = ahub.app.findAndSetIndexes(_pageIndexOrId);
        var _pageIndex = _findAndSetIndexes.finalIndex;
        //only do something if page is not the same
        if(!_findAndSetIndexes.pageFound || _oldPageId == ahub.theme.model.get('currentPageModel').get('id') )return;
        //update contents path
        ahub.theme.view.contentsPath = '#thm-' + ahub.theme.model.get('currentPageModel').get('id') + ' .thm-page-contents';
        //reset callbacks / animations
        ahub.app.callbacks = {};
        //
        ahub.events.onPageExit.run({origin:'loadPage'});
        ahub.events.onPageExit.reset();
        //create new page view
        ahub.theme.currentPageView = new ahub.theme.views.Page({
            model : ahub.theme.model.get('currentPageModel')
        });
        //check if its a different chapter
        if (ahub.model.get('currentChapter') !== ahub.model.get('previousChapter')) {
            //console.log('add new chapter ');
            //ahub.view.materialsView.pop();
            ahub.theme.currentChapterView = new ahub.theme.views.Chapter({
                model : ahub.theme.model.get('currentChapterModel')
            });
            //show next chapter
            ahub.theme.currentChapterView.setRootView(ahub.theme.currentPageView);
            //
            ahub.theme.materialsView.transitionChapter(ahub.theme.currentChapterView);
            ahub.events.onChapterInit.run({origin:'loadPage'});
            ahub.events.onChapterInit.reset();
            ahub.events.onPageInit.run({origin:'course'});
            ahub.events.onPageInit.reset();
        } else{
            //show next page
            ahub.theme.currentChapterView.transitionPage(ahub.theme.currentPageView);
            ahub.events.onPageInit.run({origin:'course'});
            ahub.events.onPageInit.reset();
        }
        //if (ahub.model.get('currentChapter') !== ahub.model.get('previousChapter'))
            //ahub.view.materialsView.push(this._currentChapterView);
        //
        // Get extra contents
        this.createExtraContents(ahub.theme.model.get('currentPageModel'));
        //API - set new location 
		if(Number(ahub.connect.getValue('lesson_location'))<_pageIndex){
			ahub.connect.setValue('lesson_location', _pageIndex);
			ahub.connect.commit();
		}
    };
    ahub.theme.app.loadChapter = function(_chapter) {
        //if ( ahub.model.get('currentChapterIndex') === _chapterIndex )return;
        if(_.isNumber(_chapter)){
            var _chapterModel = ahub.model.get('chapters').at(_chapter);
            if (_chapterModel){                	
                this.loadPage ( _chapterModel.get('pages').at(0).get('id') );
            }
        }else{
            this.loadPage ( ahub.model.get('chapters').get(_chapter).get('pages').at(0).get('id') );
        }
        
    };
    ahub.theme.app.createExtraContents = function(page){
        var contents = page.get('contents');
        if (contents){
            ahub.theme.extraContents = contents.where({extraContent:true});
        }else{
            ahub.theme.extraContents = new Array();
        }
    };
    ahub.ready();
});


// function initCourseApp(){
//     if(!apis || !theme){
//         if(!ahub.connect || !ahub.view || !ahub.model){
//             if(!ahub.connect.loaded || !ahub.view.materialsRegion){
//                 _.delay($.proxy(function() {
//                     initCourseApp();
//                 },this), 500);
//             }
//         }
//     }else{
//         theme.app.start();
//     }
// }





