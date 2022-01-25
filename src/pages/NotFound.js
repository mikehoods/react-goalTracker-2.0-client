import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Sorry</h1>
            <p>That page cannot be found</p>
            <div className="not-found-link">
                <p>Back <Link to="/">home...</Link></p>
            </div> 
        </div>
    );
}
 
export default NotFound;