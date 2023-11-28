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
      xAxisText: {
        type: "string",
        label: "X Axis Text",
        default: "X Axis",
        order: 3,
      },
      showYAxisLabel: {
        type: "boolean",
        label: "Show Y Axis Label",
        default: true,
        order: 4,
      },
      yAxisText: {
        type: "string",
        label: "Y Axis Text",
        default: "Y Axis",
        order: 5,
      },
      showXGridLines: {
        type: "boolean",
        label: "Show X Grid Lines",
        default: false,
        order: 6,
      },
      showYGridLines: {
        type: "boolean",
        label: "Show Y Grid Lines",
        default: true,
        order: 7,
      },
      isYAxisCurrency: {
        type: "boolean",
        label: "Format Y Axis as Currency",
        default: true,
        order: 8,
      },
      showPoints: {
        type: "boolean",
        label: "Show Points Sized By",
        default: false,
        order: 9,
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
        order: 11,
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
        order: 13,
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




    // const { dimension_like: dimensionLike } = queryResponse.fields;
    //
    // const dimensionLabel = dimensionLike.map((dimension) => (
    //    dimension.label_short ?? dimension.label,
    //
    //  ));




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
