import { useEffect, useRef, useState } from "react"
import Header from "./Header"
export default function Contest({id,setPage}) {
    const [contest,setContest] = useState({}),
          input = useRef(),
          host = window.location,
          url = `${host.includes('localhost' ? 'http' : 'https')}://${host}/api/contest/${id}`
    useEffect(() => {
        fetch(url).then(res=>res.json()).then(setContest).catch(console.log)
    }, [id])
    setTimeout(()=>window.contest=contest,200)
    return (
        <>
            <Header/>
            <h2 className='header'>{contest.contestName}</h2>
            <div className='contestDetail'>
                <h2 className='title'>Contest description</h2>
                <div className='description'>{contest.description}</div>
                <h2 className='title'>Proposed Names</h2>
                <div className='names'>
                    {contest.names?.length >= 1 ? (
                        <div className='list'>
                            {contest.names.map(({name,id:nameId},index)=>(
                                <>
                                    <span className='name'>{typeof name == 'string' ? name : JSON.stringify(name)}</span>
                                    <span className='buttons'>
                                        {/* added _${index} to create unique IDs for the elements */}
                                        <button className='update' id={`update-${nameId}_${index}`} onClick={()=>{
                                            let newName = prompt('What would you like to change the name to?',name)
                                            if (newName) { //makes sure the user entered something
                                                let updatedNames = [...contest.names]
                                                updatedNames[index] = {
                                                    ...updatedNames[index],
                                                    name: newName,
                                                    id: nameId
                                                }
                                                fetch(url,{
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        source: 'frontend'
                                                    },
                                                    body: JSON.stringify({nameId,newName})
                                                }).then(res=>{
                                                    if (res.ok) setContest(prevState=>({...prevState,names: updatedNames}))
                                                    else console.error('Failed to update name')})
                                                .catch(console.error)
                                            }
                                        }}>✏️</button>
                                        <button className='delete' id={`delete-${nameId}_${index}`} onClick={()=>{
                                            /* eslint-disable no-restricted-globals */
                                            if (confirm('Are you sure?')) {
                                                let updatedNames = [...contest.names]
                                                updatedNames.splice(index,1)
                                                fetch(url,{
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        source: 'frontend'
                                                    }
                                                }).then(res=>{
                                                    if (res.ok) setContest(prevState=>({...prevState, names: updatedNames}))
                                                    else console.error('Failed to delete name')
                                                }).catch(console.error)
                                            }
                                            /* eslint-enable no-restricted-globals */
                                        }}>🗑️</button>
                                    </span>
                                </>
                            ))}
                        </div>
                    ) : 'No names proposed yet'}
                </div>
                <h2 className='title'>Propose a new name</h2>
                <form>
                    <input type='text' ref={input} id='newName' placeholder='New name here...'/>
                    <br/>
                    <button id='submit' className='submit' onClick={e=>{
                        e.preventDefault()
                        let {value} = input.current
                        fetch(url,{
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                source: 'frontend'
                            },
                            body: JSON.stringify({value})
                        }).then(async res=>{
                            if (res.ok) {
                                let text = await res.text(),
                                    names = [...contest.names],
                                    updatedContest = {...contest}
                                names.push({name:value})
                                updatedContest.names = names
                                setContest(updatedContest)
                                return text
                            } else {
                                console.error('Network request error')
                            }
                        }).catch(console.error)
                    }}>Submit</button>
                </form>
            </div>
            <a href='/' style={{
                marginTop:'20px',
                display: 'inline-block'
            }} onClick={()=>{
                window.history.pushState({},'','/')
                setPage('contestList')
            }}>Back to contest list</a>
        </>
    )
}