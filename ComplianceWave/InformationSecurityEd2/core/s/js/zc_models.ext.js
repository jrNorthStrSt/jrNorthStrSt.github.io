/* global ahub */
/*****************************************************************************
ESBlock (http://www.esblock.com)
Copyright 2012 - 2015 ES Block, LLC. All rights reserved.
******************************************************************************/
// models
ahub.models = {};
// Course (main model)
ahub.models.Course = Backbone.Model.extend({
	defaults : function() {
		return {
			"code" : "",
			"_t" : "course",
			"attributes" : {}
		}
	},
	parse : function(response, options) {
		console.log('Course model parse');
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		if (response.glossary)
			response.glossary = new ahub.collections.Items(response.glossary, options);
		if (response.documents)
			response.documents = new ahub.collections.Items(response.documents, options);
		if (response.pools )
			response.pools = new ahub.collections.Pools(response.pools, options);
		if (response.keywords)
			response.keywords = new ahub.collections.Keywords(response.keywords, options);
		if (response.chapters)
			response.chapters = new ahub.collections.Chapters(response.chapters, options);
		if (response.attributes)
			response.attributes = new ahub.models.Attributes(response.attributes);
		response.introduction = new ahub.models.Page(response.introduction, options);
		return response;
	},
	initialize : function() {
		var self = this;
		var introductionModel = this.get('introduction');
		if (introductionModel)
			introductionModel.on('destroy', function() {
				var newIntroduction = new ahub.models.Page();
				newIntroduction.saveAll();
				self.set('introduction', newIntroduction);
				var pathAttrs = {
					introduction : ahub.model.get("introduction")
				};
				ahub.model.save(pathAttrs, {
					patch : true
				});
				AuthoringApp.authoring.currentView.secondary.reset();
				AuthoringApp.Toolbar.MenuDetails.Controller.showContents();
			});
		/* define models
		if (this.get('chapters') && this.get('chapters').length > 0) {
			this.set('currentChapterIndex', this.get('currentChapterIndex'));
			this.set('currentChapter', this.get('chapters').at(this.get('currentChapterIndex')));
			if (this.get('currentChapter') && this.get('currentChapter').length > 0) {
				this.set('currentPageIndex', this.get('currentPageIndex'));
				this.set('currentPage', this.get('chapters').at(this.get('currentChapterIndex')).get('pages').at(0));
			}
		}
		*/
	},
	addChapter : function() {
		var chapter = new ahub.models.Chapter();
		this.chapters.add(chapter);
	},
	removeChapter : function() {
		var chapter = new ahub.models.Chapter();
		this.chapters.add(chapter);
	}
});
/*
 Chapter
 */
ahub.models.Chapter = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "Chapter"
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		response.keywords = new ahub.collections.Keywords(response.keywords, options);
		if (response.background)
			response.background = new ahub.models.Asset(response.background);
		//debugger;
		options.chapter = response.id;
		response.pages = new ahub.collections.Pages(response.pages, options);

		return response;
	}
});
/*
 Page
 */
ahub.models.Page = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "page",
			"title" : "untitled",
			"description" : "no description"
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		response.contents = new ahub.collections.Contents(response.contents, options);
		response.keywords = new ahub.collections.Keywords(response.keywords, options);
		return response;
	}
});
/*
 Content
 */
ahub.models.Content = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "Content",
			"title" : "",
			"attributes" : {},
			"type" : "element",
			"animation" : {"startHidden" : false, "items" : []},
			'activeAuthorId':0
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true;
		} else {
			options = {
				parse : true
			};
		}
		var type = response.type;
		if (type) {
			switch(type) {
				case 'element':
					response.item = new ahub.models.Element(response.item, options);
					response.item.bind('change', this.onElementChildChange, this);
					break;
                case 'video':
                    response.item = new ahub.models.Video(response.item, options);
                    break;
                case 'audio':
                    response.item = new ahub.models.Audio(response.item, options);
                    break;
				case 'interaction':
					response.item = new ahub.models.Interaction(response.item, options);
					break;
				case 'assessment':
					response.item = new ahub.models.Assessment(response.item, options);
					break;
			}
		}
		return response;
	},
    initialize : function() {
        _.bindAll(this, "onChange");
        this.on('change', this.onChange);
    },
    onChange : function(){
        console.log(this);
        if( !_.isUndefined(this.changedAttributes().selected) )return;
//        if( !_.isUndefined(this.changedAttributes().item) && _.isEmpty(this.changedAttributes().item.changed) )return;
        AuthoringApp.History.add({'method':'change', 'objid':this.id, 'loc':{'pageid':ahub.theme.model.get('currentPageModel').get("id")}, 'attr':_.clone(this.previousAttributes())});
    },
	onElementChildChange : function(child){
		console.log('onElementChildChange')
		//this.item = child;
        AuthoringApp.History.add({'method':'change', 'objid':this.id, 'loc':{'pageid':ahub.theme.model.get('currentPageModel').get("id")}, 'attr':_.clone(this.attributes) });
        //this.get('item').set({'text': escape(unescape( child.get('text') ).split(ahub.srcs.cv).join('<%cv%>').split(ahub.srcs.t).join('<%t%>')) },{silent:true});
        this.get('item').set({'text': child.get('text') },{silent:true});
		//console.log('Child with text ' + this.get('item').get('text') + ' changed.');
		this.save({}, {
            chapterId : ahub.theme.model.get("currentChapterModel").get("id"),
            pageId : ahub.theme.model.get("currentPageModel").get("id")
        });
	}
});
/*
Column -> Content - Objects:
Contents -> Content - Objects:
*/
// Element
ahub.models.Element = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "element",
			"title" : "",
			"text" : ""
		}
	},
	initialize : function(model) {
		if (model && model.text) {
			//var text = unescape(model.text).split('<%cvr%>').join(ahub.srcs.cv+'resources/').split('<%cvr%>').join(ahub.srcs.cv+'resources/').split('<%cv%>').join(ahub.srcs.cv).split('<%t%>').join(ahub.srcs.t);
			this.set("text", ahub.srcs.toPath(model.text) );
		}
	}
});
ahub.models.Audio = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "audio",
			"src" : "",
			"settings" : {}
		}
	},
	initialize : function(data) {
		if (data && data.src) {
			//var src = unescape(data.src).split('<%cvr%>').join(ahub.srcs.cv+'resources/').split('<%cv%>').join(ahub.srcs.cv).split('<%t%>').join(ahub.srcs.t);
			this.set("src", ahub.srcs.toPath(data.src) );
		}
    }
});
ahub.models.Video = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "video",
			"src" : "",
			"settings" : {}
		}
	},
	initialize : function(data) {
		this.checkPaths(data);
    },
	parse : function(data){
		this.checkPaths(data);
	},
	checkPaths : function(data){
		if (data) {
			if(data.src){
				this.set("src", ahub.srcs.toCode(data.src));
			}
			if(data.settings && data.settings.poster){
				data.settings.poster =ahub.srcs.toCode(data.settings.poster) 
				this.set("settings", data.settings);
			}
		}
	}
});
/*** Interaction ***/
ahub.models.Interaction = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "interaction"
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		var source = response.source;
		if (source && source.length > 0) {
			if (source[0]._t) {
				switch (source[0]._t) {
					case "interaction.node":
						response.source = new ahub.collections.InteractionNodes(response.source, options);
						break;
					case "interaction.question":
						response.source = new ahub.collections.InteractionQuestions(response.source, options);
						break;
				}
			} else {
				response.source = new ahub.collections.InteractionNodes(response.source, options);
			}
		} else {
			response.source = new ahub.collections.InteractionNodes();
		}
		if (response.element) {
			response.element = new ahub.models.Element(response.element, options);
		}
		return response;
	},
	initialize : function(attributes, options) {
		if (this.bindDestroy) {
			this.bindDestroy();
		}
	}
});
// Interaction -> Node
ahub.models.InteractionNode = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "interaction.node",
			"alreadySaw" : false
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		response.nodes = new ahub.collections.InteractionNodes(response.nodes, options);
		if (response.element) {
			response.element = new ahub.models.Element(response.element, options);
		}
		return response;
	},
	initialize : function(attributes, options) {
		if (this.bindDestroy) {
			this.bindDestroy();
		}
	}
});
// Poll -> Question
ahub.models.Question = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "pool.question",
			"randomAnswers" : false,
			"alwaysShow" : false,
			"correct" : {},
			"incorrect" : {},
			"text" : {},
			"type" : "singleChoice"
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		response.answers = new ahub.collections.Answers(response.answers, options);
		response.questions = new ahub.collections.Questions(response.questions, options);
		response.correct = new ahub.models.Element(response.correct, options);
		response.incorrect = new ahub.models.Element(response.incorrect, options);
		response.text = new ahub.models.Element(response.text, options);

		return response;
	},
	initialize : function() {
		var answers = this.get('answers');
		if (this.get('randomAnswers') && this.get('answers')) {
			this.get('answers').models = this.get('answers').shuffle();
		}
	}
});

ahub.models.Attributes = Backbone.Model.extend({
	defaults : function() {
		return {
			//"_t" : "settings",
			"logo-image" : "",
			"background-image" : "",
			"background-repeat" : "",
			"background-color" : ""
		}
	},
	initialize : function(model) {
		if (model && model.link) {
			//var link = unescape(model.link).split('<%cvr%>').join(ahub.srcs.cv+'resources/').split('<%cv%>').join(ahub.srcs.cv).split('<%t%>').join(ahub.srcs.t);
			this.set("link", ahub.srcs.toPath(model.link) );
		}
	}
});
// Asset
ahub.models.Asset = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "asset"
		}
	}
});

//Item
ahub.models.Item = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "item",
			"title" : "",
			"description" : "",
			"link" : ""
		}
	},
	initialize : function(model) {
		if (model && model.link) {
			//var link = unescape(model.link).split('<%cvr%>').join(ahub.srcs.cv+'resources/').split('<%cv%>').join(ahub.srcs.cv).split('<%t%>').join(ahub.srcs.t);
			this.set("link", ahub.srcs.toPath(model.link) );
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		response.thumbnail = new ahub.models.Asset(response.thumbnail, options);
		return response;
	}
});
//Keywords
ahub.models.Keyword = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "keyword"
		}
	}
});
//Animation
ahub.models.Animation = Backbone.Model.extend({
	defaults : function() {
		return {
			"options" : {
				"start-duration" : 500,
				"start-delay" : 0,
				"start" : "afterTime"
			},
			"type" : "fade"
		}
	}
});
//Assessment
ahub.models.Assessment = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "assessment"
		}
	},
	initialize : function() {
		this.set('pools', {});
		this.set('counter', 0);
	},
	nextQuestion : function() {
		var counter = this.get('counter');
		var poolStr = this.get('startPool');
		var pool = null;
		var question = null;
		if (poolStr) {
			pool = this.getPool(poolStr);
		}
		if (pool) {
			var questions = pool.questions;
			if (questions.length > 0) {
				var index = 0;
				// console.log('_ass pool.randomQuestions', pool.randomQuestions);
				if (pool.randomQuestions) {
					var index = Math.floor((Math.random() * questions.length));
				}
				question = questions[index];
				// console.log('_ass questions before', questions);
				questions.splice(index, 1);
				// console.log('_ass questions after', questions);
				this.set('counter', counter + 1);
			}
		}
		return question;
	},
	getQuestion : function(_index){
		return this.getPool(this.get('startPool')).questions[_index];
	},
	getPool : function(poolId) {
		var modelPools = this.get('pools');
		if (!modelPools[poolId]) {
			var pool = _.findWhere(ahub.model.get('pools').models, {
				id : poolId
			});
			modelPools[poolId] = {
				randomQuestions : pool.get('randomQuestions'),
				questions : _.clone(pool.get('questions').models)
			};
		}
		return modelPools[poolId];
	},
	recordScore : function(scoreId, isCorrect) {
		//debugger;
		var themeScore = ahub.assessments.report.get('score');
		var assessmentScore = themeScore.get(scoreId) || new Array();
		var score = {
			total : 0,
			correct : 0
		};
		if (assessmentScore.length > 0) {
			score = _.last(assessmentScore);
		} else {
			assessmentScore.push(score);
		}
		score.total++;
		if (isCorrect) {
			score.correct++;
		}
		themeScore.set(scoreId, assessmentScore);
		//console.log(themeScore);
	},
	redoQuiz : function(scoreId) {
		this.set('pools', {});
		this.set('counter', 0);
		var assessmentScore = ahub.assessments.report.get('score').get(scoreId);
		if (assessmentScore) {
			var score = {
				total : 0,
				correct : 0
			};
			assessmentScore.push(score);
		}
	}
});
//Pool
ahub.models.Pool = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "pool",
			"name" : "My Pool"
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		response.questions = new ahub.collections.Questions(response.questions, options);
		return response;
	}
});
//Answer
ahub.models.Answer = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "pool.question.answer"
		}
	},
	parse : function(response, options) {
		if (options) {
			options.parse = true
		} else {
			options = {
				parse : true
			}
		}
		if (response.text)
			response.text = new ahub.models.Element(response.text, options);
		return response;
	}
});

//Utilities view model
ahub.models.UtilitiesModel = Backbone.Model.extend({
	defaults : function() {
		return {
			"title" : "default"
		}
	},
	initialize : function() {
		//debugger;
		//this.set('views', new Backbone.Collection(this.get('views')));
	}
});

//Report
ahub.models.AssessmentReport = Backbone.Model.extend({
	defaults : {
		//"_t" : "pool.question.answer"
	},
	initialize : function() {
		//this.set('questions', new ahub.collections.Questions(this.get('questions')));
		this.set('score', new ahub.models.AssessmentScore(this.get('score')));
	}
});

//Report > Score
ahub.models.AssessmentScore = Backbone.Model.extend({
	defaults : {
		//"" : "pool.question.answer"
	},
	initialize : function() {

	}
});

// Sources
ahub.models.Source = Backbone.Model.extend({
	defaults : function() {
		return {
			"_t" : "source",
			"links" : []
		}
	}
});

//collections
ahub.collections = {};

//Chapters
ahub.collections.Chapters = Backbone.Collection.extend({
	model : ahub.models.Chapter
});
//Pages
ahub.collections.Pages = Backbone.Collection.extend({
	model : ahub.models.Page,
	initialize : function(options) {
		this.itemViewOptions = options;
	}
});
//Rows
ahub.collections.Rows = Backbone.Collection.extend({
	model : ahub.models.Row
});
//Columns
ahub.collections.Columns = Backbone.Collection.extend({
	model : ahub.models.Column
});

// Elements
ahub.collections.Elements = Backbone.Collection.extend({
	model : ahub.models.Element
});
// InteractionNodes
ahub.collections.InteractionNodes = Backbone.Collection.extend({
	model : ahub.models.InteractionNode,
	initialize : function(options) {
		this.itemViewOptions = options;
	}
});
// InteractionNodes
ahub.collections.Questions = Backbone.Collection.extend({
	model : ahub.models.Question
});

//Assets
ahub.collections.Assets = Backbone.Collection.extend({
	model : ahub.models.Asset
});

//Keywords
ahub.collections.Keywords = Backbone.Collection.extend({
	model : ahub.models.Keyword
});
//Item
ahub.collections.Items = Backbone.Collection.extend({
	model : ahub.models.Item,
	comparator:'title'
});
//ahub.collections.Items.
//Contents
ahub.collections.Contents = Backbone.Collection.extend({
	model : ahub.models.Content,
	initialize : function(options) {
		this.itemViewOptions = options;
	}
});
//Assessments
ahub.collections.Assessments = Backbone.Collection.extend({
	model : ahub.models.Assessment
});
//Pools
ahub.collections.Pools = Backbone.Collection.extend({
	model : ahub.models.Pool
});
//Answers
ahub.collections.Answers = Backbone.Collection.extend({
	model : ahub.models.Answer
});


/*****************************************************************************
LCMSBlock (http://www.lcmsblock.com)
Copyright 2014 ES Block, LLC. All rights reserved.
******************************************************************************/

//var animation = {
//	"blind" : function(el, options) {
//		this.jqueryUIEffect("blind", el, options);
//	},
//	"bounce" : function(el, options) {
//		this.jqueryUIEffect("bounce", el, options);
//	},
//	"clip" : function(el, options) {
//		this.jqueryUIEffect("clip", el, options);
//	},
//	"drop" : function(el, options) {
//		this.jqueryUIEffect("drop", el, options);
//	},
//	"explode" : function(el, options) {
//		this.jqueryUIEffect("explode", el, options);
//	},
//	"fade" : function(el, options) {
//		this.jqueryUIEffect("fade", el, options);
//	},
//	"fold" : function(el, options) {
//		this.jqueryUIEffect("fold", el, options);
//	},
//	"highlight" : function(el, options) {
//		this.jqueryUIEffect("highlight", el, options);
//	},
//	"puff" : function(el, options) {
//		this.jqueryUIEffect("puff", el, options);
//	},
//	"pulsate" : function(el, options) {
//		this.jqueryUIEffect("pulsate", el, options);
//	},
//	"scale" : function(el, options) {
//		this.jqueryUIEffect("scale", el, options);
//	},
//	"shake" : function(el, options) {
//		this.jqueryUIEffect("shake", el, options);
//	},
//	"size" : function(el, options) {
//		this.jqueryUIEffect("slide", el, options);
//	},
//	"slide" : function(el, options) {
//		this.jqueryUIEffect("slide", el, options);
//	},
//	"transfer" : function(el, options) {
//		this.jqueryUIEffect("transfer", el, options);
//	},
//	"jqueryUIEffect" : function(effect, el, options) {
//		var defaults = {
//			duration : "500",
//			time : 0
//		};
//		$.extend(defaults, options);
//		el.delay(defaults.time).effect(effect, defaults, parseInt(defaults.duration), defaults.complete);
//	}
//}
ahub.actions={};
ahub.actions.type = {
	fade : {
		property : "fade",
		title : "Fade in/out",
		run : function(el, options) {
			var defaults = {
				"start-duration" : "500",
				"start-delay" : 0
			};
			$.extend(defaults, options);
            console.log(el);
            console.log(defaults);
			if(!defaults["type-type"]){
				el.delay(defaults["start-delay"]).effect("fade", {}, parseInt(defaults["start-duration"]), defaults.callback);	
			}else{
				if(defaults["type-type"]=='out'){
					el.delay(defaults["start-delay"]).fadeOut(defaults["start-duration"], defaults.callback);	
				}else{
					el.delay(defaults["start-delay"]).fadeIn(defaults["start-duration"], defaults.callback);	
				}
			}
		},
		optionsConfig : [{
			dbType : "type",
			label : "Type",
			type : {
				component : "select",
				options : [{
					value : "in",
					title : "Fade In"
				}, {
					value : "out",
					title : "Fade Out"
				}]
			}
		}]
	},
	slideIn : {
		property : "slideIn",
		title : "Slide in",
		run : function(el, options) {
			var defaults = {
				"start-duration" : "500",
				"start-delay" : 0,
				"type-dir" : "both"
			};
			$.extend(defaults, options);
			if(defaults["type-act"]){
				if(defaults["type-act"]=='show'){
					el.delay(defaults["start-delay"]).show("slide", {
						direction : defaults["type-dir"]
					}, parseInt(defaults["start-duration"]), defaults.callback);
				}else{
					el.delay(defaults["start-delay"]).hide("slide", {
						direction : defaults["type-dir"]
					}, parseInt(defaults["start-duration"]), defaults.callback);
				}
			}else{
				el.delay(defaults["start-delay"]).effect("slide", {
					direction : defaults["type-dir"]
				}, parseInt(defaults["start-duration"]), defaults.callback);
			}
		},
		optionsConfig : [{
				dbType : "act",
				label : "Action",
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
			label : "Direction",
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
	},
	bounce : {
		property : "bounce",
		title : "Bounce",
		run : function(el, options) {
			var defaults = {
				"start-duration" : "500",
				"start-delay" : 0,
				"type-dist" : 20,
				"type-times" : 5
			};
			$.extend(defaults, options);
			el.delay(defaults["start-delay"]).effect("bounce", {
				distance : defaults["type-dist"],
				times : defaults["type-times"]
			}, parseInt(defaults["start-duration"]), defaults.callback);
		},
		optionsConfig : [{
			dbType : "dist",
			label : "Distance",
			type : {
				component : "input",
				'default' : "20",
				name : "distance",
				measure : "px",
				measureinfo : "Pixels"
			}
		}, {
			dbType : "times",
			label : "Times",
			type : {
				component : "input",
				'default' : "5",
				name : "time",
				measure : "ms",
				measureinfo : "Miliseconds"
			}
		}]
	},
	highlight : {
		property : "highlight",
		title : "Highlight",
		run : function(el, options) {
			var defaults = {
				"start-duration" : "500",
				"start-delay" : 0,
				"type-color" : "#ffff99"
			};
			$.extend(defaults, options);
			el.delay(defaults["start-delay"]).effect("highlight", {
				color : defaults["type-color"]
			}, parseInt(defaults["start-duration"]), defaults.callback);
		},
		optionsConfig : [{
			dbType : "color",
			label : "Color",
			type : {
				component : "input",
				'default' : "#ffff99",
				name : "color",
				measure : "rgb",
				measureinfo : "RGB color model"
			}
		}]
	},
	pulsate : {
		property : "pulsate",
		title : "Pulsate",
		run : function(el, options) {
			var defaults = {
				"start-duration" : "500",
				"start-delay" : 0,
				"type-times" : 5
			};
			$.extend(defaults, options);
			el.delay(defaults["start-delay"]).effect("pulsate", {
				times : defaults["type-times"]
			}, parseInt(defaults["start-duration"]), defaults.callback);
		},
		optionsConfig : [{
			dbType : "times",
			label : "Times",
			type : {
				component : "input",
				'default' : "5",
				name : "time",
				measure : "x",
				measureinfo : "Number of times it occours"
			}
		}]
	},
	moveAndSize : {
		property : "moveAndSize",
		title : "Move and size",
		run : function(el, options) {
			//var _selectedPos = _.findWhere(ahub.theme.currentPageView.children._views,{"_selected":true}).$el.position();
			//var _selectedPos = _.findWhere(ahub.theme.currentPageView.children._views,{"_selected":true}).$el.position()
			var defaults = {
				"start-duration" : "500",
				"start-delay" : 0,
				"type-x" : '',
				"type-y" : '',
				"type-w" : '',
				"type-h" : '',
				"type-duration" : "500",
				"type-delay" : 0
			};
			$.extend(defaults, options);
			var _animate={}
			if(!_.isNaN(parseInt(defaults["type-x"])))_animate.left = parseInt(defaults["type-x"]);
			if(!_.isNaN(parseInt(defaults["type-y"])))_animate.top = parseInt(defaults["type-y"]);
			if(!_.isNaN(parseInt(defaults["type-w"])))_animate.width = parseInt(defaults["type-w"]);
			if(!_.isNaN(parseInt(defaults["type-h"])))_animate.height = parseInt(defaults["type-h"]);
			el.delay(defaults["type-delay"]).animate(_animate, parseInt(defaults["type-duration"]), defaults.callback);
		},
		optionsConfig : [{
			dbType : "x",
			label : "Left",
			type : {
				component : "input",
				'default' : '',
				name : "x",
				measure : "px",
				measureinfo : "pixels"
			}
		},{
			dbType : "y",
			label : "Top",
			type : {
				component : "input",
				'default' : '',
				name : "y",
				measure : "px",
				measureinfo : "pixels"
			}
		},{
			dbType : "w",
			label : "Width",
			type : {
				component : "input",
				'default' : '',
				name : "w",
				measure : "px",
				measureinfo : "pixels"
			}
		},{
			dbType : "h",
			label : "Height",
			type : {
				component : "input",
				'default' : '',
				name : "h",
				measure : "px",
				measureinfo : "pixels"
			}
		},{
			dbType : "duration",
			label : "Duration",
			type : {
				component : "input",
				'default' : '500',
				name : "duration",
				measure : "ms",
				measureinfo : "miliseconds"
			}
		},{
			dbType : "delay",
			label : "Delay",
			type : {
				component : "input",
				'default' : '0',
				name : "delay",
				measure : "ms",
				measureinfo : "miliseconds"
			}
		}
		]
	},
	complete : {
		property : "complete",
		title : "Complete Module",
		run : function(el, options) {
			var defaults = {
				"start-duration" : "500",
				"start-delay" : 0,
				"type-score" : 100,
				"type-closewindow" : true,
				"type-lmsexit" : true,
                "type-setpassed" : true
			};
			$.extend(defaults, options);
			var closeWindow = (defaults["type-closewindow"]===true || defaults["type-closewindow"]=="true")?true:false;
			var lmsExit = (defaults["type-lmsexit"]===true || defaults["type-lmsexit"]=="true")?true:false;
            var setPassed = (defaults["type-setpassed"]===true || defaults["type-setpassed"]=="true")?true:false;
			window.setTimeout(function(){
				ahub.connect.complete(defaults["type-score"], closeWindow, lmsExit, setPassed);
				//'callback' in defaults.callback();
			}, defaults["start-delay"]);
		},
		optionsConfig : [{
			dbType : "score",
			label : "Score",
			type : {
				component : "input",
				'default' : "100",
				name : "score",
				measure : "%",
				measureinfo : "Score to be recorded with completion"
			}
		},
		{
			dbType : "closewindow",
			label : "Close window",
			type : {
				component : "checkbox",
				'default' : true,
				name : "closewindow",
			}
		},
		{
			dbType : "lmsexit",
			label : "Exit back to LMS",
			type : {
				component : "checkbox",
				'default' : true,
				name : "lmsexit",
			}
		},
		{
			dbType : "setpassed",
			label : "Set Passed status",
			type : {
				component : "checkbox",
				'default' : false,
				name : "setpassed",
			}
		}]
	},
	openmodule : {
		property : "openmodule",
		title : "Open Module",
		run : function(el, options) {
			var defaults = {
				"start-duration" : "0",
				"start-delay" : 0,
				"type-mltoken" : 0
			};
			$.extend(defaults, options);
			var indexPath = (ahub.mode == "preview") ? window.location.origin + '/author/preview/'+defaults["type-mltoken"] : defaults["type-mltoken"]+'/index.html';
			window.setTimeout(function(){
				$('body').append('<iframe src="'+indexPath+'" width="100%" height="100%" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation" style="position:absolute;margin:0;padding:0;border: none;"><p>Your browser does not support iframes.</p></iframe>')
			}, defaults["start-delay"]);
		},
		optionsConfig : [{
			dbType : "mltoken",
			label : "Module Language Token",
			type : {
				component : "input",
				'default' : "0",
				name : "token",
				measure : "",
				measureinfo : "Token of the module language to open"
			}
		}]
	},
	fullScreen : {
		property : "fullScreen",
		title : "Full-screen",
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
	},

}
ahub.actions.startCondition = {
	afterTime : {
		property : "afterTime",
		title : "After time",
		run : function(el, options) {
			 ahub.app.callbacks[options.pageId].add(function() {
				//debugger;
				var self = this;
				this.options.callback = function() {
					if ( ahub.app.callbacks[self.options.id]) {
						 ahub.app.callbacks[self.options.id].run();
					}
				}
				console.log(this.type);
				ahub.actions.type[this.type].run(this.el, this.options);
			}, {
				type : options.type,
				el : el,
				options : options
			});
		},
		optionsConfig : [{
			dbType : "delay",
			label : "Delay",
			type : {
				component : "input",
				'default' : "0",
				name : "delay",
				measure : '<i class="material-icons">timer</i>',
				measureinfo : "Delay start in miliseconds"
			}
		}, {
			dbType : "duration",
			label : "Duration",
			type : {
				component : "input",
				'default' : "500",
				name : "duration",
				measure : '<i class="material-icons">timelapse</i>',
				measureinfo : "Duration of animation in miliseconds"
			}
		}]
	},
	afterEvent : {
		property : "afterEvent",
		title : "Click or tap",
		run : function(el, options) {
			//debugger;
			 ahub.app.callbacks[options.pageId].add(function() {
				//debugger;
				var other = $("#thm-" + options["start-content"]);
				other.addClass("thm-cursor-pointer");
				if (options["start-once"] == "true" || options["start-once"] == "checked") {
					other.one(options["start-event"], function(event) {
						ahub.actions.type[options.type].run(el, options);
					});
				} else {
					other.on(options["start-event"], function(event) {
						ahub.actions.type[options.type].run(el, options);
					});
				}
			});
		},
		optionsConfig : [{
			dbType : "event",
			label : "Event type",
			type : {
				component : "select",
				options : [{
					value : "tap",
					title : "Click"
				},{
					value : "mousedown",
					title : "Mouse down"
				},{
					value : "mouseup",
					title : "Mouse up"
				},{
					value : "dblclick",
					title : "Double click"
				},{
					value : "mouseenter",
					title : "Mouse enter"
				},{
					value : "mouseleave",
					title : "Mouse leave"
				}]
			}
		}, {
			dbType : "content",
			label : "Content",
			type : {
				component : "select",
				options : function(options) {
					var contents =  ahub.theme.model.get('currentPageModel').get('contents');
					var result = new Array();
					if (contents) {
						_.each(contents.models, function(content) {
							if (content.get('id') != options.id) {
								result.push({
									value : content.get('id'),
									title : content.get('title')
								});
							}
						});
					}
					var compareFunc = function(a, b) {
						if (a.title < b.title)
							return -1;
						if (a.title > b.title)
							return 1;
						return 0;
					};
					return result.sort(compareFunc);
				}
			}
		}, {
			dbType : "once",
			label : "Only 1 time?",
			type : {
				component : "checkbox",
				'default' : false,
				name : "once"
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
		}, {
			dbType : "duration",
			label : "Duration",
			type : {
				component : "input",
				'default' : "500",
				name : "duration",
				measure : "ms",
				measureinfo : "Miliseconds"
			}
		}]
	},
	onNarrationPosition : {
		property : "onNarrationPosition",
		title : "Audio position",
		run : function(el, options) {
			 ahub.app.callbacks[options.pageId].add(function() {
				var self = this;
				var defaults = {
				    "start-position" : "0",
                    "start-ended" : "",
				    "start-audio" : ""
				};
				$.extend(defaults, options);
				var position = options["start-position"]; // ? options["start-playerPosition"] : 0;
                console.log(this);
                var audio = $('audio','#thm-'+this.options["start-audio"]);
                audio.unbind("timeupdate."+self.options.id); 
                audio.bind("timeupdate."+self.options.id, function () {
					var _ended_checked = (self.options["start-ended"]=='checked' || self.options["start-ended"]=='true')?true:false;
                    if( !_ended_checked && this.currentTime > Number(self.options["start-position"]) && audio.currentTime < Number(self.options["start-position"])+1 )ahub.actions.type[self.type].run(self.el, self.options);
                    if( _ended_checked && this.ended)ahub.actions.type[self.type].run(self.el, self.options)
                });
			}, {
				type : options.type,
				el : el,
				options : options
			});
		},
		optionsConfig : [{
			dbType : "position",
			label : "Position",
			type : {
				component : "input",
				'default' : "0",
				name : "position",
				measure : "ms",
				measureinfo : "Miliseconds"
			}
		},{
			dbType : "ended",
			label : "At the end",
			type : {
				component : "checkbox",
				'default' : "0",
				name : "ended"
			}
		},{
			dbType : "audio",
			label : "File Name",
			type : {
				component : "select",
				options : function(options) {
					/*
					var result = new Array();
					if(ahub.theme.model.get('currentPageModel').get('attributes').audio){
						result.push({
							value : ahub.theme.model.get('currentPageModel').get('attributes').audio,
							title : ahub.theme.model.get('currentPageModel').get('attributes').audio
						});
					}
                    var contents =  ahub.theme.model.get('currentPageModel').get('contents');
					if (contents) {
						_.each(contents.models, function(content) {
							_.each(content.get('animation').items, function(animation) {							
								if (animation.type == "playNarration") {
									result.push({
										value : animation.options['type-narrFileName'],
										title : animation.options['type-narrFileName']
									});
								}
							});
						});
					}
                    var compareFunc = function(a, b) {
						if (a.title < b.title)
							return -1;
						if (a.title > b.title)
							return 1;
						return 0;
					};
					return result.sort(compareFunc);
                    */
                    
                    var result = new Array();
                    _.each(ahub.theme.model.get('currentPageModel').get('contents').where({type:'audio'}), function(_c){
                        result.push({
                            value : _c.get('id'),
                            title : _c.get('title')
                        });
                    });
					return result;
				}
			}
		}
		]
	},
    onVideoPosition : {
		property : "onVideoPosition",
		title : "Video position",
		run : function(el, options) {
			 ahub.app.callbacks[options.pageId].add(function() {
				//debugger;
				var self = this;
				var defaults = {
				    "start-position" : "0",
                    "start-ended" : "",
				    "start-videofile" : ""
				};
				$.extend(defaults, options);
				this.options.callback = function() {
					if ( ahub.app.callbacks[self.options.id]) {
						 ahub.app.callbacks[self.options.id].run();
					}
				}
				//console.log(this);
				// var position = Number(options["start-position"]);
				// var vid = $('#'+this.options["start-videofile"]);
				// if(vid.length==0)vid = $('video','#thm-'+this.options["start-videofile"]);
                // vid.unbind("timeupdate."+self.options.id); 
                // vid.bind("timeupdate."+self.options.id, function () {
				// 	if(self.options["start-ended"]!='checked' && this.currentTime > position && this.currentTime < position+1 )ahub.actions.type[self.type].run(self.el, self.options);
                //     if(self.options["start-ended"]=='checked' && this.ended)ahub.actions.type[self.type].run(self.el, self.options);
                // });
				var position = Number(options["start-position"]);
				var vid = $('#'+this.options["start-videofile"]);
				if(vid.length<=0)vid = $('.video-js', '#thm-'+this.options["start-videofile"]);
				if(vid.length<=0)vid = $(".video-js");
				this.runed = false;
				var _func = function () {
					// console.log(self.runed)
					if(self.runed)return;
					var _ended_checked = (self.options["start-ended"] == 'checked' || self.options["start-ended"] == 'true')?true:false;
					if( (_ended_checked && this.ended()) || (!_ended_checked && this.currentTime() > position && this.currentTime() < position+1 )){ 
						ahub.actions.type[self.type].run(self.el, self.options);
						// ahub.actions.type[self.type].run(self.el, self.options);
						self.runed = true;
						_.delay(function(self){ self.runed = false; }, 1000, self);
					}
                }
				videojs(vid[0]).off("timeupdate", _func);
				videojs(vid[0]).on("timeupdate", _func);
			}, {
				type : options.type,
				el : el,
				options : options
			});
		},
		optionsConfig : [{
			dbType : "position",
			label : "time (s)",
			type : {
				component : "input",
                type : "number",
				"default" : "0",
				name : "seconds",
				measure : "<i class='material-icons'>timer</i>",
				measureinfo : "Video time"
			}
		},{
			dbType : "ended",
			label : "At the end",
			type : {
				component : "checkbox",
				'default' : "0",
				name : "ended"
			}
		}, {
			dbType : "videofile",
			label : "Video",
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
		}]
	},
	afterAnimation : {
		property : "afterAnimation",
		title : "After animation",
		run : function(el, options) {
			 ahub.app.callbacks[options["start-animation"]] =  ahub.app.callbacks[options["start-animation"]] || new Marionette.Callbacks();
			 ahub.app.callbacks[options["start-animation"]].add(function() {
				var self = this;
				this.options.callback = function() {
					if ( ahub.app.callbacks[self.options.id]) {
						 ahub.app.callbacks[self.options.id].run();
					}
				}
				ahub.actions.type[this.type].run(this.el, this.options);
			}, {
				type : options.type,
				el : el,
				options : options
			});
		},
		optionsConfig : [{
			dbType : "animation",
			label : "Animation",
			type : {
				component : "select",
				options : function(options) {
					var contents = ahub.theme.model.get('currentPageModel').get('contents').toJSON();
					var animations = new Array();
					_.each(contents, function(element) {
						if ('animation' in element && 'items' in element.animation) {
							_.each(element.animation.items, function(anim, index) {
								if (anim.id !== options.id) {
									var tempId = anim.id;
									var tempTitle = element.title + ' > ' + index + ':' + anim.type;
									animations.push({
										value : tempId,
										title : tempTitle
									});
								}
							});
						}
					});
					return animations.sort();
				}
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
		}, {
			dbType : "duration",
			label : "Duration",
			type : {
				component : "input",
				'default' : "500",
				name : "duration",
				measure : "ms",
				measureinfo : "Miliseconds"
			}
		}]
	}
}

// TODO: delete this

function testSrcImgChange() {
	alert("testSrcImgChange");
}


