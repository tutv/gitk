;'use strict';

(function ($) {
    const baseAPI = '/api';

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
            let self = this;

            $.ajax({
                method: 'POST',
                url: baseAPI + '/create',
                data: data,
                success: function (response) {
                    self.trigger('addRepo', response.data);
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
        el: "#list-projects",

        projects: [],

        events: {
            'click .remove': 'onRemove'
        },

        initialize: function () {
            this.fetchProjects();
        },

        onRemove: function (e) {
            let confirm = window.confirm('Are you really want to remove project?');
            if (!confirm) {
                return;
            }

            let self = this;
            let $project = this.$(e.currentTarget).closest('.project');
            let id = $project.data('id');

            $.ajax({
                method: 'GET',
                url: baseAPI + '/remove/' + id,
                success: function (response) {
                    self.fetchProjects();
                }
            })
        },

        onAddRepo: function (data) {
            this.fetchProjects();
        },

        fetchProjects: function () {
            let self = this;

            $.ajax({
                url: baseAPI + '/list',
                success: function (response) {
                    self.projects = response.data;
                    self.render();
                }
            })
        },

        render: function () {
            let html = this.template({
                projects: this.projects
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
            this.form.on('addRepo', this.list.onAddRepo, this.list);
        },

        render: function () {

        }
    });

    $(document).ready(function ($) {
        new App();
    });
})(jQuery);