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

            let repoUrl = $(this.$el).find("#repo").val().trim();
            let repoPath = parsePathNameFromUrl(repoUrl);
            repoPath = repoPath.substring(1, repoPath.length);

            let dir = $(this.$el).find("#dir").val();
            let host = $(this.$el).find("#host").val().toLowerCase();
            let remote = $(this.$el).find("#remote").val();
            let branch = $(this.$el).find("#branch").val();

            if (host.length == 0 || dir.length == 0 || repoPath.length == 0 || remote.length == 0 || branch.length == 0) {
                return alert('Please re-check input!');
            }

            let data = {
                repo: repoPath,
                dir: dir,
                host: host,
                remote: remote,
                branch: branch
            };

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
            'click .remove': 'onRemove',
            'click .enable': 'onEnable',
            'click .disable': 'onDisable',
        },

        initialize: function () {
            this.fetchProjects();
        },

        updateProject(id, data) {
            let self = this;

            $.ajax({
                method: 'POST',
                url: baseAPI + '/update/' + id,
                data: data,
                success: function (response) {
                    self.fetchProjects();
                },
                error: function (error) {
                    alert('Something went wrong');
                }
            });
        },

        onEnable: function (e) {
            let $project = this.$(e.currentTarget).closest('.project');
            let id = $project.data('id');

            this.updateProject(id, {enable: true});
        },

        onDisable: function (e) {
            let $project = this.$(e.currentTarget).closest('.project');
            let id = $project.data('id');

            this.updateProject(id, {enable: false});
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
            });
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

            this.$('#webhook').val(document.location.origin);
        },

        listener: function () {
            this.form.on('addRepo', this.list.onAddRepo, this.list);
        },

        render: function () {

        }
    });

    $(document).ready(function ($) {
        new App();

        let hostSupport = ['github.com', 'bitbucket.com'];

        $("#repo").on('input', function () {
            let url = $('#repo').val();
            let hostName = parseHostNameFromUrl(url).toLowerCase();

            if (hostSupport.indexOf(hostName) != -1) {
                $("#host").val(capitalizeFirstLetter(hostName.split('.')[0]));
                $("#repo-name").val(parseRepoNameFromUrl(url));
            } else {
                $("#host").val('');
                $("#repo-name").val('');
            }


        });
    });
})(jQuery);

function parseHostNameFromUrl(url) {
    let a = document.createElement('a');
    a.href = url;

    return a.hostname;
}

function parsePathNameFromUrl(url) {
    let a = document.createElement('a');
    a.href = url;

    return a.pathname;
}

function parseRepoNameFromUrl(url) {
    let pathName = parsePathNameFromUrl(url);

    let temp = pathName.split('/');
    let repoName = temp[temp.length - 1];
    if (repoName == '') {
        repoName = temp[temp.length - 2];
    }

    return repoName;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}