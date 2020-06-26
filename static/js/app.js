function init() {
    data = [{
        x: [1,2,3,4,5],
        y: [1,2,3,4,5],
        type: 'bar',
        orientation: 'h'
    }];
    Plotly.newPlot('bar', data)
};
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };
d3.json("/samples.json").then(function(data) {
    console.log(data);
    let test = data.samples
    console.log(test);
    let idList = new Array()
    test.forEach(function(sample) {
        let id = sample['id']
        idList.push(id)
    });
    let dropdownMenu = d3.select("#selDataset");
    for (var i=0; i < idList.length; i++) {
        dropdownMenu.append('option').text(idList[i])
    };
    // let dataset = dropdownMenu.property("value")
    d3.selectAll("#selDataset").on("change", updatePlotly);
    function updatePlotly() {
        let dataset = dropdownMenu.property("value")
        if( dataset == 940) {
            let otuIds = test[0]['otu_ids']
            slicedOtuIds = otuIds.slice(1, 10)
            let sampleValues = test[0]['sample_values']
            slicedSampleValues = sampleValues.slice(1, 10)
            var trace1 = {
                x: slicedOtuIds,
                y: slicedSampleValues
            };
            var data = [trace1]
        };
        Plotly.restyle('bar', data);
    };
    // test.forEach(function(sample) {
    //     switch(dataset) {
    //         case sample[0]
    //     };
    //     let otuIds = sample["otu_ids"]
    //     let slicedOtuIds = otuIds.slice(0, 10);
    //     // console.log(otu_ids);
    //     let sampleValues = sample["sample_values"]
    //     let slicedValues = sampleValues.slice(0, 10);
        // console.log(ids)
        // console.log(slicedValues);
        // let trace1 = {
        //     x: slicedValues,
        //     y: slicedOtuIds,
        //     type: 'bar',
        //     orientation: 'h'
        // };
        // let data = [trace1];
        // Plotly.newPlot('bar', data)
    // });
});
init();