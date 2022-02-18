import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

let pieData = {
    labels: ['Grade A', 'Grade B','Grade C', 'Grade D', 'Grade E'],
    datasets: [{
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: ['#00B4D8','#2FDD92','#FFE162','#FC28FB','#FF4259', '#524A4E'],
        hoverBackgroundColor: ['#00B4D8','#2FDD92','#FFE162','#FC28FB','#FF4259', '#524A4E']
    }]
};


function QuizA() {

    const [pie, setPie] = useState(pieData)

    const onChangeInput = (e) => {
        
        const { name, value } = e.target;
        let INT_VALUE = parseInt(value)
        
        pie.datasets[0].data[0] = (name == 'a' ? INT_VALUE : pie.datasets[0].data[0]); // A
        pie.datasets[0].data[1] = (name == 'b' ? INT_VALUE : pie.datasets[0].data[1]); // B
        pie.datasets[0].data[2] = (name == 'c' ? INT_VALUE : pie.datasets[0].data[2]); // C
        pie.datasets[0].data[3] = (name == 'd' ? INT_VALUE : pie.datasets[0].data[3]); // D
        pie.datasets[0].data[4] = (name == 'e' ? INT_VALUE : pie.datasets[0].data[4]); // E
        
        // Getting SUM
        const reducer = (accumulator, curr) => accumulator + curr;
        let sum = pie.datasets[0].data.reduce(reducer);
        // console.log(sum)
        
        // Percentage Formula: (value/sum)/100
        let PERCENT_A = (pie.datasets[0].data[0] / sum) * 100 || 0; // A
        let PERCENT_B = (pie.datasets[0].data[1] / sum) * 100 || 0; // B
        let PERCENT_C = (pie.datasets[0].data[2] / sum) * 100 || 0; // C
        let PERCENT_D = (pie.datasets[0].data[3] / sum) * 100 || 0; // D
        let PERCENT_E = (pie.datasets[0].data[4] / sum) * 100 || 0; // E
        
        // Rounding Decimals 
        let ROUNDING_DECIMALS = [
            `Grade A: ` + Number(Math.round(PERCENT_A+'e2')+'e-2') + ` %`,
            `Grade B: ` + Number(Math.round(PERCENT_B+'e2')+'e-2') + ` %`,
            `Grade C: ` + Number(Math.round(PERCENT_C+'e2')+'e-2') + ` %`,
            `Grade D: ` + Number(Math.round(PERCENT_D+'e2')+'e-2') + ` %`,
            `Grade E: ` + Number(Math.round(PERCENT_E+'e2')+'e-2') + ` %`,
        ];

        let updatePieLabels = pie.labels.map((label, key) => label = ROUNDING_DECIMALS[key]);

        pie.labels = updatePieLabels;

        let updatedPie = { ...pie };

        // Update State
        setPie(updatedPie);

        // testing values: 12,45,13,4,5,
        // console.log(PERCENT_A);
        // console.log(ROUNDING_DECIMALS);
        // console.log(pie.labels[0])
    }

    // prevent string and -1 values
    const numberOnly = (evt) => {
        evt = (evt) ? evt : window.event;
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
        } else {
          return true;
        }
    }

    return (
        <div className='container'>
            <div className="d-flex justify-content-center">
                <h4 className="mb-2">Input the number of students per grade</h4>
            </div>
            <div className="d-flex justify-content-evenly">
                <div className="row">
                    <div className="col-md-4 col-12 pie-form">
                        <div className="mb-2">
                            <label className="form-label">Grade A:</label>
                            <input onKeyPress={e => numberOnly(e)} onChange={onChangeInput} name="a" type="text" className="form-control" id="grade-a"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade B:</label>
                            <input onKeyPress={e => numberOnly(e)} onChange={onChangeInput} name="b" type="text" className="form-control" id="grade-b"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade C:</label>
                            <input onKeyPress={e => numberOnly(e)} onChange={onChangeInput} name="c" type="text" className="form-control" id="grade-c"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade D:</label>
                            <input onKeyPress={e => numberOnly(e)} onChange={onChangeInput} name="d" type="text" className="form-control" id="grade-d"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade E:</label>
                            <input onKeyPress={e => numberOnly(e)} onChange={onChangeInput} name="e" type="text" className="form-control" id="grade-e"/>
                        </div>
                    </div>
                    
                    <div className="col-md-8 col-12 pie-chart">
                        <Pie width={100} data={pie} options={{ maintainAspectRatio: true }}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizA;