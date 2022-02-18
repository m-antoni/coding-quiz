import React, { useState } from 'react'
import AlertMessage from './AlertMessage';

function QuizB() {

    const [word, setWord] = useState({ english: '', tagalog: '' });
    const [list, setList] = useState([])
    const [isView, setIsView] = useState(false);
    const [message, setMessage] = useState({ show: false, type: null, text: "" })

    const onSave = () => {
        let newList = [];
        let error = false;

        if(word.english === '' || word.tagalog === ''){
            error = true;
            setMessage({ show: true, type: 0, text: 'English and Tagalog fields are required!' })
        }


        const list = localStorage.getItem('list');
        if(list){
            newList = JSON.parse(list);
            // check if  english is already in the list
            newList.findIndex((item, index) => {
                if(item.english === word.english.toLowerCase()){
                    error = true;
                    setMessage({ show: true, type: 0, text: `${word.english.toLowerCase()} is already in the list` })
                }
            })
        }

        if(!error){
            let store = newList.concat({ english: word.english.toLowerCase(), tagalog: word.tagalog.toLowerCase() });

            localStorage.setItem('list', JSON.stringify(store))
    
            setWord({ english: '', tagalog: ''});
            setMessage({ show: true, type: 1, text: "Added new vocabulary" })
        }
      
    }

    const onSearch = () => {
        let list = getListFromLocalStorage();

        if(!list){
            return alert('You do not have any vocabulary notes');
        }

        list.findIndex((item, index) => {
            if(item.english == word.english){
                setList([item]);
            }
        })
    }

    const onViewAll = () => {
        setMessage({ show: false, type: null, text: ""})
        let list = getListFromLocalStorage();

        if(list){
            setList(list);
        }

        setIsView(true)
    }


    const getListFromLocalStorage = () => {
        const list = localStorage.getItem('list');
        if (list) return JSON.parse(list);
        else return null;
    }


    const onChangeInput = (e) => {
        setWord({ ...word, [e.target.name]: e.target.value });
    }

    return (
        <div className="d-flex justify-content-center">
            <div>
                <div>
                    { message.show && <AlertMessage type={message.type} message={message.text}/> }

                    {
                        isView === true ? 
                            <>
                                {
                                    list.length > 0 ? 
                                    <div className="mb-5">
                                        <h5>Show all my word list <button onClick={() => setIsView(false)} className="btn btn-primary btn-sm">Go Back</button></h5>
                                        <hr/>
                                        <ul className="list-group">
                                            {
                                                list.map((list, index) => (
                                                    <li className="list-group-item" key={index}>
                                                        {index + 1})  <b>English:</b> {list.english}, <b>Tagalog:</b> {list.tagalog}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    :
                                    <div>
                                        <div className="alert alert-danger">
                                            You do not have any vocabulary please add. <a onClick={() => setIsView(false)} className="btn btn-primary btn-sm">Go Back</a>
                                        </div>
                                    </div>
                                } 
                            </>
                        :
                        <div className="mb-3">
                            <div className="card">
                                    <div className='card-header'>Create My Vocabulary Note</div>
                                    <div className="card-body">
                                    <div className="mb-3">
                                    <label htmlFor="english-input" className="form-label">English</label>
                                    <input value={word.english} onChange={onChangeInput} name="english" type="email" className="form-control" id="english-input"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tagalog-input" className="form-label">Tagalog</label>
                                    <input value={word.tagalog} onChange={onChangeInput} name="tagalog" type="text" className="form-control" id="tagalog-input"/>
                                </div>
                            
                                <div className="my-4">
                                    <button onClick={onSave} type="button" className="btn btn-primary">Save</button>&nbsp;
                                    <button onClick={onSearch} type="button" className="btn btn-secondary">Search</button>&nbsp;
                                    <button type="button" className="btn btn-danger">Delete</button>&nbsp;
                                    <button onClick={onViewAll}type="button" className="btn btn-success">View All</button>&nbsp;
                                </div>
                                </div>
                            </div>
                        </div>   
                    }
                </div>
            </div>
        </div>
    )
}

export default QuizB;