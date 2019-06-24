var url = "http://localhost:3000/API/ihomis/get_hospital_data"

$(document).ready(function () {
    $('.radio_input').click(function () {
        $('#hospital-name').text($(this).val());

        var data = {
            hospitalCode: this.id,
            year: $('.yearselect').val()
        };

        $.post(url, data, function (res) {
            populate_graph(res.OPD.data, res.ER.data, res.ADM.data)
        });
    });

    $('.yearselect').yearselect();
    $('.yearselect').change(function(){
        var data = {
            hospitalCode: $('input[name="hospital"]:checked').attr('id'),
            year: $(this).val()
        };

        $.post(url, data, function (res) {
            populate_graph(res.OPD.data, res.ER.data, res.ADM.data)
        });
    });
});

function populate_graph(opd_data, er_data, adm_data) {
    window.myBar.destroy();

    $('#opd-total').text(opd_data.reduce(function(a, b) { return a + b; }));
    $('#er-total').text(er_data.reduce(function(a, b) { return a + b; }));
    $('#adm-total').text(adm_data.reduce(function(a, b) { return a + b; }));

    var context = document.getElementById('canvas').getContext('2d');
    var myChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'OPD',
            backgroundColor: window.chartColors.green,
            data: opd_data
        }, {
            label: 'ER',
            backgroundColor: window.chartColors.red,
            data: er_data
        }, {
            label: 'ADM',
            backgroundColor: '#0ac282',
            data: adm_data
        }]
    };

    window.myBar = new Chart(context, {
        type: 'bar',
        data: myChart,
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return label;
                    }
                }
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: false,
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}