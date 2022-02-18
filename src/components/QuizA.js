import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';



ChartJS.register(ArcElement, Tooltip, Legend);

let pieData = {
    labels: ['Grade A', 'Grade B','Grade C', 'Grade D', 'Grade E', 'Grade F'],
    datasets: [{
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: ['#6967CE','#FF6384','#36A2EB','#FF4259'],
        hoverBackgroundColor: ['#6967CE','#FF6384','#36A2EB','#FF4259']
    }]
};


function QuizA() {

    const [pie, setPie] = useState(pieData)

    const onChangeInput = (e) => {
        
        const { name, value } = e.target;

        pie.datasets[0].data[0] = (name == 'a' ? value : pie.datasets[0].data[0]); // A
        pie.datasets[0].data[1] = (name == 'b' ? value : pie.datasets[0].data[1]); // B
        pie.datasets[0].data[2] = (name == 'c' ? value : pie.datasets[0].data[2]); // C
        pie.datasets[0].data[3] = (name == 'd' ? value : pie.datasets[0].data[3]); // D
        pie.datasets[0].data[4] = (name == 'e' ? value : pie.datasets[0].data[4]); // E
        pie.datasets[0].data[5] = (name == 'f' ? value : pie.datasets[0].data[5]); // F

        console.log(pie.datasets[0])

        let updatedPie = { ...pie };

        setPie(updatedPie);
    }

    return (
        <div className='container'>
            <div className="d-flex justify-content-evenly">
                <div className="row">
                    <div className="col-md-4 col-12 pie-form">
                        <div className="mb-2">
                            <label className="form-label">Grade A:</label>
                            <input onChange={onChangeInput} name="a" type="text" className="form-control" id="grade-a"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade B:</label>
                            <input onChange={onChangeInput} name="b" type="text" className="form-control" id="grade-b"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade C:</label>
                            <input onChange={onChangeInput} name="c" type="text" className="form-control" id="grade-c"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade D:</label>
                            <input onChange={onChangeInput} name="d" type="text" className="form-control" id="grade-d"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade E:</label>
                            <input onChange={onChangeInput} name="e" type="text" className="form-control" id="grade-e"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Grade F:</label>
                            <input onChange={onChangeInput} name="f" type="text" className="form-control" id="grade-f"/>
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