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

        events: {},

        initialize: function () {

        },

        onAddRepo: function (data) {
            console.log(data);
        },

        render: function () {

        }
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