function Title(props) {
    return (
        <h1
            {...props}
            className="text-3xl font-bold text-sky-800"
        >
            {props.children}
        </h1>
    );
}
export default Title;

