/*-----------------
Components
-----------------*/

// Parent | Subreddit component containing a list of 'post' components.
var subreddit = Vue.component('subreddit',{
	template: '#subreddit',
	props: ['name'],

	data: function () {
		return { posts: [] }
	},

	created: function(){
		this.$http.get("https://www.reddit.com"+ this.name +"/hot.json?limit=10")
		.then(function(resp){
			if(typeof resp.data == 'string') {
   			resp.data = JSON.parse(resp.data);
			}
			this.posts=resp.data.data.children;
		});
	}
});


// Child | Componenet represiting a single post.
var post = Vue.component('post', {
	template: "#post",
	props: ['item']
});




/*-----------------
Custom filters
-----------------*/

// Filter for cutting off strings that are too long.
Vue.filter('truncate', function(value) {
	var length = 125;
	if(value.length <= length) {
		return value;
	}
	else {
		return value.substring(0, length) + '...';
	}
});


// Filter that takes an image url and creates a CSS style.
Vue.filter('setAsBackground', function(value) {
	if(value && value!='self' && value!='default' && value!='image' && value!='nsfw') {
		return 'background-image: url(' + value + ')';
	}
	else {
		return 'background-image: url(assets/img/placeholder.png)';
	}
});




/*-----------------
Initialize app
-----------------*/

var vm =new Vue({
	el: 'body',
	methods: {
		setStringTwo () {
			localStorage.setItem('stringTwo', 'pula');
		}
	}
});