function init() {
    // adding initialization of charts with first id 940
    console.log("The Init() function ran");
    var url =
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then((data) => {
      // console.log(data.names);
      // adding dropdown menu to change the data based on id selected
      let dropdown = d3.select("#selDataset");
      let names = data.names;
  
      for (let i = 0; i < names.length; i++) {
        dropdown.append("option").text(names[i]).property("value", names[i]);
      }
      createScatter("940");
      createBar("940");
      createSummary("940");
    });
  }
  
  function optionChanged(newID) {
    // changes each function with the new id selected in the dropdown
  
    createScatter(newID);
    createBar(newID);
    createSummary(newID);
  }
  function createScatter(id) {
    var url =
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then((data) => {
      // data.filter(searchID)
      sampleData = data.samples.filter((obj) => obj.id == id)[0];
  
      let xValues = sampleData.otu_ids;
      let yValues = sampleData.sample_values;
      let color = sampleData.otu_ids;
      let text = sampleData.otu_labels;
      // console.log(xValues);
      // creates scatter plot at id='bubble'
      let scatterData = [
        {
          x: xValues,
          y: yValues,
          text: text,
          mode: "markers",
          marker: {
            size: yValues,
            color: color,
            colorscale: "Earth",
          },
        },
      ];
      let layout = {
        title: "Amount of Bacteria Found",
      };
      Plotly.newPlot("bubble", scatterData, layout);
      //     // checking to see if function is running
      console.log(`This function generates scatter plot of ${id} `);
    });
  }
  
  function createBar(id) {
    console.log(`This function generates bar chart of ${id} `);
    //     // code that makes bar chart at id='bar'
    var url =
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then((data) => {
      // data.filter(searchID)
      sampleData = data.samples.filter((obj) => obj.id == id)[0];
  
      let xValueData = sampleData.sample_values;
      let yValueData = sampleData.otu_ids;
      let labelsData = sampleData.otu_labels;
      // getting top 10 bacteria and ordering the results top to bottom
      let xValues = xValueData.slice(0, 10).reverse();
      let yValues = yValueData
        .slice(0, 10)
        .map((id) => `OTU ${id}`)
        .reverse();
      let labels = labelsData.slice(0, 10).reverse();
      // console.log(yValues);
      // creating the bar chart data at id=bar
      let barData = [
        {
          x: xValues,
          y: yValues,
          text: labels,
          orientation: "h",
          type: "bar",
        },
      ];
      let layout = {
        title: "Top 10 Bacteria Found in Navel",
      };
      Plotly.newPlot("bar", barData, layout);
    });
  }
  
  function createSummary(id) {
    var url =
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then((data) => {
      let metadata = data.metadata;
      let value = metadata.filter((data) => data.id == id);
      let valueData = value[0];
      // console.log(valueData);
  
      let summary = d3.select("#sample-metadata");
  
      // clear html in metadata
      summary.html("");
      // adding each key/value pair to the panel
      Object.entries(valueData).forEach(([key, value]) => {
        summary.append("li").text(`${key}: ${value}`);
      });
      // checking to see if function is running
      console.log(`This function generates summary info of ${id} `);
    });
  }
  
  init();