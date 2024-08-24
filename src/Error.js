function Error({ message }) {
    return (
        <p className="error">
            <span>!Opps, {message}</span>
        </p>
    );
}

export default Error;