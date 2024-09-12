


const customButtom = webix.protoUI(
    {
        name: "threestateButton",

        $init: function (config) {
            this.$ready.push(this.initState);

            this.attachEvent("onItemClick", function (id, ev) {
                ++config.state;
                let states = config.states;
                let state = config.state;
                const entries = Object.entries(states);

                for (const [key, value] of entries) {
                    if (state == key && state < entries.length) {
                        this.config.value = value;
                        this.config.state = state;
                        this.refresh();
                    } else if (state >= entries.length) {
                        state = 0;
                        config.state = state;
                        this.config.value = value;
                        this.refresh();
                    }
                }

                $$(id).callEvent("onStateChange", [state]);
            });
        },

        initState: function () {
            const state = this.config.state;
            const id = this.config.id;

            if (state == 0) {
                webix.html.addCss($$(id).getNode(), "off");
                this.config.value = "Off";
            } else if (state == 1) {
                webix.html.addCss($$(id).getNode(), "sortAsc");
                this.config.value = "sort Asc";
            } else {
                webix.html.addCss($$(id).getNode(), "sortDesc");
                this.config.value = "sort Desc";
            }
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

        $init: function (config, ev) {
            const id = config.id;
            config.elements = [
                {
                    rows: [],
                },
                {
                    cols: [
                        {
                            id: "cancel",
                            view: "button",
                            value: "Cancel",
                        },
                        {
                            id: "save",
                            view: "button",
                            value: "Save",
                        },
                    ],
                },
            ];


            this.$ready.push(this.cancel)
            this.$ready.push(this.save)

            config.elements[0].rows = config.fields;

        },

        cancel: function (ev) {
            const id = this.config.id;
            const saveaction = this.config.saveAction;
            const butt = this.queryView({ id: "cancel" })
            butt.attachEvent("onItemClick", function (id) {
                if (saveaction) {
                    saveaction(id)

                } else {
                    console.log("default cancel button is clicked", id);
                    webix.message("default cancel button " + id);
                }
            });
        },
        save: function () {
            const saveaction = this.config.saveAction;

            const butt = this.queryView({ id: "save" })
            butt.attachEvent("onItemClick", function (id) {
                if (saveaction) {
                    saveaction()
                } else {
                    console.log("default save button is clicked", id);
                    webix.message("default save button " + id);
                }
            });
        },

        fields_setter: function (fields) {

            const length = fields.length;

            for (let i = 0; i < length; i++) {
                const field = {
                    view: "text",
                    name: fields[i],
                    label: fields[i],
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
    state: 0,
    width: 200,
    states: { 0: "Off", 1: "SortAsc", 2: "Sort Desc" },
    on: {
        onStateChange: function (state) {

            if (state == 1) {
                $$("mylist").sort("#name#", "asc");
                webix.html.addCss($$("threestateButton").getNode(), "sortAsc");
                webix.html.removeCss($$("threestateButton").getNode(), "off");
            } else if (state == 2) {
                $$("mylist").sort("#name#", "desc");
                webix.html.addCss($$("threestateButton").getNode(), "sortDesc");
                webix.html.removeCss($$("threestateButton").getNode(), "sortAsc");
            } else if (state == 0) {
                $$("mylist").sort("#id#", "asc", "int");
                webix.html.addCss($$("threestateButton").getNode(), "off");
                webix.html.removeCss($$("threestateButton").getNode(), "sortDesc");
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
    template: "#id# .#name# - #country#",
    autoconfig: true,
}

const formInstance = {
    id: "customFormid",
    view: "customForm",
    maxwidth: 300,
    fields: ["one", "two"],
    saveAction: function () {
        console.log("custom saveAction is  called");
        webix.message("custom saveAction is  called ");
    },
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
