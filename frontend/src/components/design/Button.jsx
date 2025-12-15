function Button (props) {
    return (
        <button
            {...props}
            className="bg-sky-500 hover:bg-sky-700 rounded-md p-2 text-white">
            {props.children}
        </button>
    );
}

export default Button;
