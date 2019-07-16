import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function Page() {
    const [data, setData] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await axios.get(
                "http://localhost:8080/api/get-stuff"
            );
            setData(response.data);
        })();
    });

    return (
        <div>
            <p>
                Rendered by <em>React</em>:
            </p>
            <pre>{(data && JSON.stringify(data, null, 4)) || "Loading..."}</pre>
        </div>
    );
}

const target = document.createElement("div");
document.body.appendChild(target);
ReactDOM.render(<Page />, target);
