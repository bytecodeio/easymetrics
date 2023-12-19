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


     const measures1: Measures1  = measureLike.map((measure) => ({
       label: measure.label_short ?? measure.label,
       name: measure.name,
     }));


     const fieldOptions = [...dimensions1, ...measures1].map((dim) => ({
         [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
       }));

      const fieldOptions2 = [...dimensions1, ...measures1].map((dim) => ({
        [dim.label]: dim.label

      }));

console.log(fieldOptions2)


  // console.log(fieldOptions2, "all labels")



    const lookerVis = this;



      function preloader(){
          // lookerVis.trigger("registerOptions", configOptions);
      // lookerVis.trigger("updateConfig", [{   yAxisDropdown: fieldOptions2 }]);

      // lookerVis.trigger("updateConfig", [{ showXGridLines: true }]);
    }//preloader

    //remove/comment this one to check the website in loading state
    window.onload = preloader;


    // config
    const configOptions: ConfigOptions = {
      title: {
        type: "string",
        display: "text",
        default: "Title",
        label: "Title",
        placeholder: "Title",
        order: 1,
        section: "Title",
      },
      showXAxisLabel: {
        type: "boolean",
        label: "Show X Axis Label",
        default: true,
        order: 2,
        section: "X-Axis",
      },
      // xAxisDropdown: {
      //   type: "string",
      //   label: "Choose X Axis Label Value",
      //   display: "select",
      //   placeholder: "Please Select",
      //   values: fieldOptions2,
      //   order: 3,
      //   default:"Please Select",
      //   section: "X-Axis",
      // },
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
        section: "Y-Axis",
      },

      // yAxisDropdown: {
      //   type: "string",
      //   label: "Choose Y Axis Label Value",
      //   display: "select",
      //   placeholder: "Please Select",
      //   values: fieldOptions2,
      //   order: 6,
      //   default:"Please Select",
      //   section: "Y-Axis",
      // },
      // yAxisText: {
      //   type: "string",
      //   label: "Write Y Axis Text Instead",
      //   default: "Y Axis",
      //   order: 7,
      // },

      isYAxisCurrency: {
        type: "boolean",
        label: "Show Currency",
        default: true,
        order: 10,
        section: "Y-Axis",
      },


          //  symbol: {
          //   type: "string",
          //   label: "Select Currency Symbol",
          //   display: "select",
          //   placeholder: "Please Select",
          //   values: fieldOptions,
          //   order: 26,
          //   default:'',
          //   section: "Y-Axis",
          // },
      // showPoints: {
      //   type: "boolean",
      //   label: "Show Points Sized By",
      //   default: false,
      //   order: 12,
      //   section: "X-Axis",
      // },
      //
      // choosePoints: {
      //   type: "string",
      //   label: "Choose Label for Points Sized By",
      //   display: "select",
      //   placeholder: "Please Select",
      //   values: fieldOptions2,
      //   order: 13,
      //   default:'',
      //   section: "X-Axis",
      // },

      // showYAxis2: {
      //   type: "boolean",
      //   label: "Show Y Axis Right Side Label",
      //   default: false,
      //   order: 14,
      //   section: "Y-Axis",
      // },

      // yAxisRightDropdown: {
      //   type: "string",
      //   label: "Choose Y Axis Right Side Label",
      //   display: "select",
      //   placeholder: "Please Select",
      //   values: fieldOptions2,
      //   order: 15,
      //   default:'',
      //   section: "Y-Axis",
      // },


           //
           //  showYAxis2Value: {
           //    type: "boolean",
           //    label: "Show Y Axis Right Side Value",
           //    default: false,
           //    order: 16,
           //    section: "Y-Axis",
           //  },
           //
           //  yAxisRightValues: {
           //    type: "string",
           //    label: "Choose Y Axis Right Side Value",
           //    display: "select",
           //    placeholder: "Please Select",
           //    values: fieldOptions,
           //    order: 17,
           //    default:'',
           //    section: "Y-Axis",
           //  },
           //
           //  isYAxisCurrency2: {
           //    type: "boolean",
           //    label: "Format Y Axis Right Side as Currency",
           //    default: false,
           //    order: 18,
           //    section: "Y-Axis",
           //  },
           //
           //  symbol2: {
           //   type: "string",
           //   label: "Select Currency Symbol for Right Side",
           //   display: "select",
           //   placeholder: "Please Select",
           //   values: fieldOptions,
           //   order: 19,
           //   default:'',
           //   section: "Y-Axis",
           // },


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
        order: 20,
        section: "Style",
      },
      // showLineChartGradient: {
      //   type: "boolean",
      //   label: "Show Line Chart Gradient",
      //   default: false,
      //   order: 12,
      // },

      showXGridLines: {
        type: "boolean",
        label: "Show X Grid Lines",
        default: false,
        order: 21,
          section: "Style",
      },
      showYGridLines: {
        type: "boolean",
        label: "Show Y Grid Lines",
        default: true,
        order: 22,
          section: "Style",
      },

      showAllValuesInTooltip: {
        type: "boolean",
        label: "Show All Row Values in Tooltip",
        default: true,
        order: 23,
          section: "Style",
      },
      color_range: {
        type: 'array',
        label: 'Color Range',
        display: 'colors',
        default: ['#dd3333', '#80ce5d', '#f78131', '#369dc1', '#c572d3', '#36c1b3', '#b57052', '#ed69af'],
        order: 24,
        section: "Style",
      },
      // yAxisLeftValues: {
      //   type: "string",
      //   label: "Choose Y Axis Left Side Value",
      //   display: "select",
      //   placeholder: "Please Select",
      //   values: fieldOptions,
      //   order: 25,
      //   default:'',
      //   section: "Y-Axis",
      // },
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
      dimensionsLabel: dimension_like.map((d) => d.label_short),
      measures: measure_like.map((m) => m.name),
      measuresLabel: measure_like.map((m) => m.label_short),
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
        lookerVis={lookerVis}
      />
    );

    done();
  },
});
