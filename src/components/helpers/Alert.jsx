function Alert(title, desc) {
    return (
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">{title}</h4>
            <p>{desc}</p>
        </div>
    );
}

export default Alert;