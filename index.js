const customButtom = webix.protoUI(
    {
        name: "threestateButton",

        $init: function (config) {


            let states = config.states;
            let state = !config.state ? Object.keys(states)[0] : config.state;
            let value = states[state] || 0;
            config.value = value;
            webix.html.addCss(this.$view, "webix_state_" + state);

            const entries = Object.entries(states);

            let idx = 0;

            this.attachEvent("onItemClick", function (id, ev) {
                webix.html.removeCss(this.$view, "webix_state_" + entries[idx][0]);
                ++idx;

                if (idx > entries.length - 1) {
                    idx = 0;
                }

                const entry = entries[idx];
                const key = entry[0]
                const value = entry[1];


                this.config.value = value;
                this.config.state = state;
                webix.html.addCss(this.$view, "webix_state_" + key);
                this.refresh();

                $$(id).callEvent("onStateChange", [key]);
            });
        },

        state_setter: function (state) {

            return state;
        },

        states_setter: function (states) {
            return states;
        },
    },
    webix.ui.button
);

const customForm = webix.protoUI(
    {
        name: "customForm",
        defaults: {
            saveAction: () => {
                console.log("default save button is clicked");
                webix.message("default save button ");
            },

            cancelAction: () => {
                console.log("default cancel button is clicked");
                webix.message("default cancel button ");
            },
        },

        $init: function (config, ev) {

            config.elements = [
                {
                    rows: [],
                },
                {
                    cols: [
                        {
                            view: "button",
                            value: "Cancel",
                            click: function (id) {
                                const form = this.queryView({ view: "customForm" }, "parent")
                                form.config.cancelAction.call(form)
                            }
                        },
                        {
                            view: "button",
                            value: "Save",

                            click: function (id) {
                                const form = this.queryView({ view: "customForm" }, "parent")
                                form.config.saveAction.call(form)
                            }
                        },
                    ],
                },
            ];

            config.elements[0].rows = config.fields;
        },

        fields_setter: function (fields) {

            const length = fields.length;

            for (let i = 0; i < length; i++) {
                const field = {
                    view: "text",
                    name: fields[i],
                    label: fields[i],
                    value: ""
                };
                fields[i] = field
            }

            return fields;
        },
    },
    webix.ui.form
);


const threestateButtonInstance = {
    view: "threestateButton",
    id: "threestateButton",
    state: "off",
    width: 200,
    states: { "off": "Off", "asc": "SortAsc", "desc": "Sort Desc" },
    on: {
        onStateChange: function (state) {

            if (state == "off") {
                $$("mylist").sort("#name#", "asc");
            } else if (state == "asc") {
                $$("mylist").sort("#name#", "desc");
            } else if (state == "desc") {
                $$("mylist").sort("#id#", "asc", "int");
            }
        },
    },

}

const list = {
    view: "list",
    id: "mylist",
    height: 500,
    width: 500,
    data: [
        { id: 1, name: "Alan Smith", age: 57, country: "USA" },
        { id: 2, name: "Nina Brown", age: 32, country: "Germany" },
        { id: 3, name: "Kevin Sallivan", age: 21, country: "Canada" },
        { id: 4, name: "Sergey Petrov", age: 24, country: "Russia" },
        { id: 5, name: "Mina Leen", age: 40, country: "China" },
        { id: 6, name: "Sam White", age: 26, country: "USA" },
        { id: 7, name: "Peter Olsten", age: 40, country: "France" },
        { id: 8, name: "Lina Rein", age: 30, country: "Germany" },
        { id: 9, name: "Many Cute", age: 22, country: "Canada" },
        { id: 10, name: "Andrew Wein", age: 27, country: "Italy" },
        { id: 11, name: "Paolo Sanders", age: 40, country: "Spain" },
        { id: 12, name: "Tanya Krieg", age: 28, country: "Germany" },
    ],
    template: "#id#. #name# - #country#",
}

const formInstance = {
    id: "customFormid",
    view: "customForm",
    maxwidth: 300,
    fields: ["one", "two"],
    saveAction: function () {
        console.log('getValues', this.getValues())
        console.log("custom saveAction is  called");
        webix.message("custom saveAction is  called ");
    },
    cancelAction: function () {
        console.log('getValues', this.getValues())
        console.log("custom cancelAction is called");
        webix.message("custom cancelAction is called ");
    }
}

webix.ready(function () {
    webix.ui({
        id: "app",
        cols: [
            {
                rows: [
                    threestateButtonInstance,
                    list
                ]

            },
            formInstance
        ],
    });
});
