const customButtom = webix.protoUI({
    name: "threestateButton",

    defaults: {
        value: "Off",
    },

    $init: function (config) {

        this.$ready.push(this.initState);
        this.attachEvent("onStateChange", function (id) {
            this.select(id);
        });
        console.log("config", config)
    },

    initState: function () {
     
    },

    onStateChange: function (state) {

    }



}, webix.ui.button);

webix.ready(function () {
    webix.ui({
        id: "app",
        rows: [{
            view: "threestateButton",
        }]
    });
});