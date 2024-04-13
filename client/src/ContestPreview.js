export default function ContestPreview({contest,onClick}) {
    let {categoryName,contestName,id}=contest
    return (
        <div className='contestPreview' id={id} onClick={e=>{
            e.preventDefault()
            try {
                onClick(id)
            } catch (error) {
                console.log(error)
            }
        }}>
            <div className='category'>{categoryName}</div>
            <hr/>
            <div className='contest'>{contestName}</div>
        </div>
    )
}