import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Sorry <span>:(</span></h1>
            <p>That page cannot be found</p>
            <div className="not-found-link">
                <h3>Back to <Link to="/">home</Link>...</h3>
            </div> 
        </div>
    );
}
 
export default NotFound;