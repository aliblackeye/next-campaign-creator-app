interface IProgress {
    progress: "completed" | "active" | "inactive"
}

const Progress = (props: IProgress) => {

    const { progress } = props

    return <div className={`progress ${progress} rounded-2xl w-8 h-1 $ bg-secondary relative ease-in`}>
        <div className={`absolute top-0 left-0 h-1 bg-primary rounded-full ${progress === "completed" ? "w-full" : progress === "active" ? "w-2" : "w-0"}`}></div>
    </div>
}


export default Progress;