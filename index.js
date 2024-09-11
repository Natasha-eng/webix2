const customButtom = webix.protoUI({
    name: "threestateButton",

    $init: function (config, ev) {
        // console.log('cnfig', config)
        this.$ready.push(this.initState);

        this.attachEvent("onItemClick", function (id, ev) {
            ++config.state;
            let states = config.states;
            let state = config.state;
            const entries = Object.entries(states)

            for (const [key, value] of entries) {

                if (state == key && state < entries.length) {

                    this.config.value = value;
                    this.config.state = state
                    this.refresh();

                } else if (state >= entries.length) {
                    state = 0;
                    config.state = state
                    this.config.value = value;
                    this.refresh();
                }
            }

            if (state == 1) {
                webix.html.addCss($$(id).getNode(), "sortAsc");
                webix.html.removeCss($$(id).getNode(), "off")
            } else if (state == 2) {
                webix.html.addCss($$(id).getNode(), "sortDesc");
                webix.html.removeCss($$(id).getNode(), "sortAsc")
            } else {
                webix.html.addCss($$(id).getNode(), "off");
                webix.html.removeCss($$(id).getNode(), "sortDesc")
            }

            $$(id).callEvent('onStateChange', [state])
        });

    },

    initState: function () {
        const state = this.config.state;
        const id = this.config.id

        if (state == 0) {
            webix.html.addCss($$(id).getNode(), "off");
            this.config.value = "Off"
        } else if (state == 1) {
            webix.html.addCss($$(id).getNode(), "sortAsc");
            this.config.value = "sort Asc"
        } else {
            webix.html.addCss($$(id).getNode(), "sortDesc");
            this.config.value = "sort Desc"
        }
    },

    state_setter: function (state) {

        return state;
    },

    states_setter: function (states) {
        return states;
    },

}, webix.ui.button);





const customForm = webix.protoUI({
    name: "customForm",

    $init: function (config, ev) {
        const id = config.id
        let fields = [];
       let elements = config.elements;
        for (let i = 0; i < config.fields.length; i++) {
            const field = webix.ui({
                view: "text",
                label: config.fields[i]
            });

            config.elements.push(field)
            // fields = fields.push(field)
            console.log("node", $$(id))

            // $$(id).addView(field, i);

        }
        console.log('fields', fields)
        // config.elements = fields
        this.$ready.push(this.createFields);

        console.log('config', config)

    },

    createFields: function () {



    },

    fields_setter: function (state) {
        console.log('fields_setter', state)
        console.log('this config', this)
        let fields = []



        for (let i = 0; i < state.length; i++) {
            const field = webix.ui({
                view: "text",
                label: config.fields[i]
            });
            fields = fields.push(field)
        }

        return state;
    },



}, webix.ui.form);

webix.ready(function () {
    webix.ui({
        id: "app",
        rows: [{
            view: "threestateButton",
            state: 0,
            width: 200,
            states: { 0: "Off", 1: "SortAsc", 2: "Sort Desc" }, on: {
                onStateChange: function (state) {
                    if (state == 1) {
                        $$("mylist").sort("#name#", "asc");
                    } else if (state == 2) {
                        $$("mylist").sort("#name#", "desc");
                    } else if (state == 0) {
                        $$("mylist").sort("#id#", "asc", "int");
                    }
                }
            }

        },
        {
            view: "list",
            id: "mylist",
            height: 500,
            data: [
                { "id": 1, "name": "Alan Smith", "age": 57, "country": "USA" },
                { "id": 2, "name": "Nina Brown", "age": 32, "country": "Germany" },
                { "id": 3, "name": "Kevin Sallivan", "age": 21, "country": "Canada" },
                { "id": 4, "name": "Sergey Petrov", "age": 24, "country": "Russia" },
                { "id": 5, "name": "Mina Leen", "age": 40, "country": "China" },
                { "id": 6, "name": "Sam White", "age": 26, "country": "USA" },
                { "id": 7, "name": "Peter Olsten", "age": 40, "country": "France" },
                { "id": 8, "name": "Lina Rein", "age": 30, "country": "Germany" },
                { "id": 9, "name": "Many Cute", "age": 22, "country": "Canada" },
                { "id": 10, "name": "Andrew Wein", "age": 27, "country": "Italy" },
                { "id": 11, "name": "Paolo Sanders", "age": 40, "country": "Spain" },
                { "id": 12, "name": "Tanya Krieg", "age": 28, "country": "Germany" }
            ],
            template: "#id# .#name# - #country#",
            autoconfig: true,
        },

        {
            view: "customForm",
            fields: ["one", "two"],
            elements: [
                { view: "text", type: "password", label: "Password" }

            ],
            saveAction: function () {
                console.log('custom form is  rendered')
            }
        }
        ]
    });
});