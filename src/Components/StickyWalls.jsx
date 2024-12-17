const StickyWalls = (props) => {
    console.log(props);

    return (
        <div
            className="bg-gray-100 rounded-lg shadow-lg p-5 w-64 h-64"
            
        >
            <h1 className="font-bold text-xl md:text-2xl">{props.title}</h1>
            <p className="text-sm md:text-base">{props.content}</p>
        </div>
    );
};

export default StickyWalls;
