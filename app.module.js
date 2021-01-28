import {
  Scheduler,
  WidgetHelper,
  Toast,
  AbstractCrudManager,
  AjaxTransport,
  CrudManager,
  JsonEncoder,
  Config,
} from "./build/schedulerpro.module.js";
import shared from "./_shared/shared.module.js";

const cookie = "PHPSESSID=schedulerpro-crudmanager";
if (!document.cookie.includes(cookie)) {
  document.cookie = `${cookie}-${Math.random().toString(16).substring(2)}`;
}

const customCrudManager = new CrudManager({
  resourceStore: {
    // Add some custom fields
    fields: ["car", "dt"],
  },

  eventStore: {
    // Add a custom field and redefine durationUnit to default to hours
    fields: ["dt", { name: "durationUnit", defaultValue: "hour" }],
  },

  transport: {
    load: {
      url: "php/read.php",
      paramName: "data",
    },
    sync: {
      url: "php/sync.php",
    },
  },

  autoLoad: true,
  autoSync: true,
  onRequestFail: (event) => {
    const { requestType, response } = event,
      serverMessage = response && response.message,
      exceptionText = `Action "${requestType}" failed. ${
        serverMessage ? ` Server response: ${serverMessage}` : ""
      }`;

    Toast.show({
      html: exceptionText,
      color: "b-red",
      style: "color:white",
      timeout: 3000,
    });

    console.error(exceptionText);
  },
});

const scheduler = new Scheduler({
  appendTo: "container",
  minHeight: "20em",
  startDate: new Date(2018, 4, 21, 6),
  endDate: new Date(2018, 4, 21, 18),
  viewPreset: "hourAndDay",
  rowHeight: 50,
  barMargin: 5,
  eventColor: "orange",
  eventStyle: "colored",

  features: {
    // Configure event editor to display 'brand' as resource name
    eventEdit: {
      resourceFieldConfig: {
        displayField: "car",
      },
    },
  },

  columns: [
    { text: "Id", field: "id", width: 100, editor: false, hidden: true },
    { text: "Car", field: "car", width: 150 },
    {
      type: "date",
      text: "Modified",
      field: "dt",
      width: 90,
      format: "HH:mm:ss",
      editor: false,
      hidden: true,
    },
  ],

  crudManager: customCrudManager,

  tbar: [
    {
      type: "button",
      ref: "reloadButton",
      icon: "b-fa b-fa-sync",
      text: "Reload scheduler",
      onAction() {
        scheduler.crudManager
          .load()
          .then(() => WidgetHelper.toast("Data reloaded"))
          .catch(() => WidgetHelper.toast("Loading failed"));
      },
    },
    {
      type: "button",
      ref: "resetButton",
      color: "b-red",
      icon: "b-fa b-fa-recycle",
      text: "Reset database",
      onAction() {
        scheduler.crudManager
          .load({
            // Adding a query string parameter "...&reset=1" to let server know that we want to reset the database
            request: {
              params: {
                reset: 1,
              },
            },
          })
          .then(() => WidgetHelper.toast("Database was reset"))
          .catch(() => WidgetHelper.toast("Database reset failed"));
      },
    },
  ],
});
