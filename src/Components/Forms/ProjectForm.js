const ProjectForm = ({handleModal})=>{
    return (
        <div>
            <form>
                <input type="text" placeholder="Project Name"/>
                <input type="text" placeholder="Project Description"/>
                <button onClick={handleModal}>Submit</button>
            </form>
        </div>
    )
}