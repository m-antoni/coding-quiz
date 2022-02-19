import React, { useState } from 'react'
import AlertMessage from './AlertMessage';
import SearchViewModal from './SearchViewModal';

function QuizB() {

    const [word, setWord] = useState({ english: '', tagalog: '' });
    const [list, setList] = useState([])
    const [isView, setIsView] = useState(false);
    const [message, setMessage] = useState({ show: false, type: null, text: "" });
    const [search, setSearch] = useState({ show: false, english: "", tagalog: "" });

    // Save Button
    const onSave = () => {
        let newList = [];
        let error = false;

        if(word.english === '' || word.tagalog === ''){
            error = true;
            setMessage({ show: true, type: 0, text: 'All fields are required' })
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

    // Search Button
    const onSearch = () => {
        let list = getListFromLocalStorage();
        
        if(list.length === 0 || list === null)
        {
            setMessage({ show: true, type: 0, text: "You do not have any vocabulary notes" })
        }
        else
        {
            list.findIndex((item, index) => {
                if(item.english == word.english.toLocaleLowerCase())
                {
                    setMessage({ show: false, type: 0,  text: `${word.english} does not exist in the list` })
                    setSearch({ show: true, english: item.english, tagalog: item.tagalog })
                }
                else
                {
                    word.english === '' ? setMessage({ show: true, type: 0, text: 'Search field is required' })
                    : setMessage({ show: true, type: 0,  text: `${word.english} does not exist in the list` })
                }
            })
        }
    }

    // View Button
    const onViewAll = () => {
        clearMessage();
        let list = getListFromLocalStorage();

        if(list){
            setList(list.reverse());
        }

        setIsView(true)
    }

    // Delete Button
    const onDelete = (index) => {
        let list = getListFromLocalStorage();

        let updatedList = list.filter((item, _index) => _index !== index);

        localStorage.setItem('list', JSON.stringify(updatedList))
        
        setList(updatedList)
    }

    // Get the list from LocalStorage
    const getListFromLocalStorage = () => {
        const list = localStorage.getItem('list');
        if (list) return JSON.parse(list);
        else return null;
    }

    // onChange Input
    const onChangeInput = (e) => {
        setWord({ ...word, [e.target.name]: e.target.value });
    }

    // Clear Message
    const clearMessage = () => setMessage({ show: false, type: null, text: ""})

    return (
        <div className="d-flex justify-content-center">
            <div>
                <SearchViewModal show={search.show} search={search} onHide={() => setSearch({ ...search, show: false})}/>
                <div>
                    { message.show && <AlertMessage type={message.type} message={message.text}/> }
                    {
                        (isView === true ) ? 
                            <>
                                {
                                    list.length > 0 ? 
                                    <div className="mb-5 vocabulary-list">
                                        <h5>Vocabulary List &nbsp;&nbsp;<button onClick={() => setIsView(false)} className="btn btn-primary btn-sm">Go Back</button></h5>
                                        
                                        <hr/>

                                        <table className='table table-striped table-hover'>
                                            <thead>
                                                <th>English</th>
                                                <th>Tagalog</th>
                                                <th className='text-center'>Action</th>
                                            </thead>
                                            <tbody>
                                                {
                                                    list.map((list, index) => (
                                                        <tr key={index}>
                                                            <td>{list.english}</td>
                                                            <td>{list.tagalog}</td>
                                                            <td onClick={() => onDelete(index)} className='text-center'><button className="btn btn-sm btn-danger">DELETE</button></td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <div>
                                        <div className="alert alert-danger">
                                            You don't have vocabulary words, create <b className='text-primary'><a href="#" onClick={() => setIsView(false)}>here.</a></b>
                                        </div>
                                    </div>
                                } 
                            </>
                        :

                        <div className="mb-3">
                            <div className="card">
                                <div className='card-header text-center'><h5>Vocabulary Note</h5></div>
                                <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="english-input" className="form-label">English:</label>
                                            <input value={word.english} onChange={onChangeInput} name="english" type="email" className="form-control" id="english-input"/>
                                            <small className='text-secondary'>type here your english word if you'd like to search</small>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tagalog-input" className="form-label">Tagalog:</label>
                                            <input value={word.tagalog} onChange={onChangeInput} name="tagalog" type="text" className="form-control" id="tagalog-input"/>
                                        </div>
                                
                                    <div className="my-4 d-flex justify-content-between">
                                        <button onClick={onSave} type="button" className="btn btn-primary">Save</button>
                                        <button onClick={onSearch} type="button" className="btn btn-info text-white">Search</button>
                                        <button onClick={onViewAll}type="button" className="btn btn-success">View All</button>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='text-muted text-center mb-2'>Localstorage for storing data</div>
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