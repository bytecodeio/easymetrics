import "./style.scss";
import { createRoot } from "react-dom/client";
import React from "react";
import "bootstrap/scss/bootstrap.scss";
import { Fields, Looker, LookerChartUtils } from "./types";
import BarLineVis from "./components/BarLineVis";

// Global values provided via the Looker custom visualization API
declare var looker: Looker;
declare var LookerCharts: LookerChartUtils;

interface ConfigOptions {
  [key: string]: {
    [key: string]: any;
    default: any;
  };
}

looker.plugins.visualizations.add({
  // The create method gets called once on initial load of the visualization.
  // It's just a convenient place to do any setup that only needs to happen once.
  create: function (element, config) {},

  // The updateAsync method gets called any time the visualization rerenders due to any kind of change,
  // such as updated data, configuration options, etc.
  updateAsync: function (data, element, config, queryResponse, details, done) {



    const { dimension_like: dimensionLike } = queryResponse.fields;

    const dimensions1 = dimensionLike.map((dimension) => ({
       label: dimension.label_short ?? dimension.label,
       name: dimension.name


     }));



     const { measure_like: measureLike } = queryResponse.fields;


     const measures1 = measureLike.map((measure) => ({
       label: measure.label_short ?? measure.label,
       name: measure.name,
     }));




     const fieldOptions = [...dimensions1, ...measures1].map((dim) => ({
         [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
       }));


console.log(fieldOptions)


const fieldOptions2 = [...dimensions1, ...measures1].map((dim) => ({
    [dim.label]: dim.label


  }));

console.log(fieldOptions2)

    const lookerVis = this;

    // config
    const configOptions: ConfigOptions = {
      title: {
        type: "string",
        display: "text",
        default: "Title",
        label: "Title",
        placeholder: "Title",
        order: 1,
      },
      showXAxisLabel: {
        type: "boolean",
        label: "Show X Axis Label",
        default: true,
        order: 2,
      },
      xAxisDropdown: {
        type: "string",
        label: "Choose X Axis Value",
        display: "select",
        placeholder: "Please Select",
        values: fieldOptions2,
        order: 3,
        default:''
      },
      // xAxisText: {
      //   type: "string",
      //   label: "Write X Axis Text Instead",
      //   default: "X Axis",
      //   order: 4,
      // },

      showYAxisLabel: {
        type: "boolean",
        label: "Show Y Axis Label",
        default: true,
        order: 5,
      },

      yAxisDropdown: {
        type: "string",
        label: "Choose Y Axis Value",
        display: "select",
        placeholder: "Please Select",
        values: fieldOptions2,
        order: 6,
        default:''
      },
      // yAxisText: {
      //   type: "string",
      //   label: "Write Y Axis Text Instead",
      //   default: "Y Axis",
      //   order: 7,
      // },

      isYAxisCurrency: {
        type: "boolean",
        label: "Format Y Axis as Currency",
        default: true,
        order: 10,
      },


           symbol: {
            type: "string",
            label: "Select Currency Symbol",
            display: "select",
            placeholder: "Please Select",
            values: fieldOptions,
            order: 11,
            default:''
          },
      showPoints: {
        type: "boolean",
        label: "Show Points Sized By",
        default: false,
        order: 12,
      },

      showXGridLines: {
        type: "boolean",
        label: "Show X Grid Lines",
        default: false,
        order: 13,
      },
      showYGridLines: {
        type: "boolean",
        label: "Show Y Grid Lines",
        default: true,
        order: 14,
      },



      // kpiUnit: {
      //   type: "string",
      //   label: "KPI Unit",
      //   default: "sq ft",
      //   order: 10,
      // },
      isStacked: {
        type: "boolean",
        label: "Stacked",
        default: false,
        order: 15,
      },
      // showLineChartGradient: {
      //   type: "boolean",
      //   label: "Show Line Chart Gradient",
      //   default: false,
      //   order: 12,
      // },
      showAllValuesInTooltip: {
        type: "boolean",
        label: "Show All Row Values in Tooltip",
        default: true,
        order: 16,
      },
    };


    lookerVis.trigger("registerOptions", configOptions);

    // assign defaults to config values, which first render as undefined until configOptions is registered
    const validatedConfig = { ...config };
    const configKeys = Object.keys(validatedConfig);
    for (let i = 0; i < configKeys.length; i++) {
      if (validatedConfig[configKeys[i]] === undefined) {
        const configKey = configKeys[i] as keyof typeof configOptions;
        validatedConfig[configKey] = configOptions[configKey].default;
      }
    }

    // get dimensions and measures
    const { dimension_like, measure_like, pivots } = queryResponse.fields;
    const fields: Fields = {
      dimensions: dimension_like.map((d) => d.name),
      dimensionsLabel: dimension_like.map((d) => d.label),
      measures: measure_like.map((m) => m.name),
      measuresLabel: measure_like.map((m) => m.label),
      pivots: pivots?.map((p) => p.name),
    };





    // create react root
    element.innerHTML = '<div id="app"></div>';

    const root = createRoot(document.getElementById("app"));
    root.render(
      <BarLineVis
        data={data}
        fields={fields}
        config={validatedConfig}
        lookerCharts={LookerCharts}
      />
    );

    done();
  },
});
