;'use strict';

(function ($) {
    const baseAPI = '/api';
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    let gitKProject = Backbone.Model.extend({
        initialize: function () {

        },
        defaults: {
            repo: '',
            host: '',
            dir: ''
        }
    });

    let Projects = Backbone.Collection.extend({
        model: gitKProject,
        url: baseAPI + '/list',
        parse: function (response) {
            return response.data;
        }
    });

    let gitKForm = Backbone.View.extend({
        el: "#form",

        events: {
            'submit': 'onSubmit'
        },

        onSubmit: function (e) {
            e.preventDefault();
            let data = this.$el.serialize();
            this.addProject(data);
        },

        addProject(data) {
            $.ajax({
                method: 'POST',
                url: baseAPI + '/create',
                data: data,
                success: function (response) {
                    console.log(response);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        },

        initialize: function () {

        },

        render: function () {

        }
    });

    let gitKList = Backbone.View.extend({
        el: "#list",

        projects: null,

        events: {},

        initialize: function () {
            this.projects = new Projects();
            this.fetchProjects();
            this.render();
        },

        onAddRepo: function (data) {
        },

        fetchProjects: function () {
            this.projects.fetch();
        },

        render: function () {
            let html = this.template({
                projects: this.projects.toJSON()
            });
            this.$el.html(html);

            return this;
        },

        template: function (data) {
            let template = $('#template-projects').html();
            return _.template(template)(data);
        },
    });

    let App = Backbone.View.extend({
        el: "#app",
        form: null,
        list: null,

        events: {},

        initialize: function () {
            this.form = new gitKForm();
            this.list = new gitKList();

            this.listener();
            this.render();
        },

        listener: function () {
            this.form.on('addRepo', this.list.onAddRepo);
        },

        render: function () {

        }
    });

    $(document).ready(function ($) {
        new App();
    });
})(jQuery);